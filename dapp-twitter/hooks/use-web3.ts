import { useState, useEffect, useCallback, useMemo } from "react";
import { ethers, BrowserProvider } from "ethers";
import { Twitter } from "@/types/TwitterContract";
import TwitterAbi from "@/lib/abi.json";
import { toast } from "./use-toast";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export interface Web3Return {
  provider: BrowserProvider | null;
  signer: ethers.Signer | null;
  account: string | null;
  availableAccounts: string[];
  contract: Twitter | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
  selectAccount: (account: string) => void;
  loading: boolean;
}

export const useWeb3 = (): Web3Return => {
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [availableAccounts, setAvailableAccounts] = useState<string[]>([]);
  const [contract, setContract] = useState<Twitter | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const handleAccountsChanged = useCallback((accounts: string[]) => {
    setAvailableAccounts(accounts);
    // If the current account is not in the updated list, or if you want to let the user decide,
    // you can either automatically select the first account or leave the current one unchanged.
    if (accounts.length > 0) {
      setAccount(accounts[0]);
    } else {
      setAccount(null);
    }
  }, []); 

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      return () => {
        window.ethereum.off("accountsChanged", handleAccountsChanged);
      };
    }
  }, [handleAccountsChanged]);

  const connectWallet = useCallback(async () => {
    try {
      if (typeof window === "undefined" || !window.ethereum) {
        throw new Error("Metamask not installed. Please install Metamask to continue");
      }
      const accounts: string[] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts.length === 0) {
        throw new Error("No accounts found");
      }
      // Save all available accounts and choose the first one by default.
      setAvailableAccounts(accounts);
      setAccount(accounts[0]);

      const web3Provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(web3Provider);

      const signer = await web3Provider.getSigner();
      setSigner(signer);

      toast({
        title: "Wallet Connected",
        description: `Connected with ${accounts[0].slice(0, 6)}...`,
      });

      const contractInstance = new ethers.Contract(
        process.env.NEXT_PUBLIC_BUILDBEAR_SMART_CONTRACT_ADDRESS!,
        TwitterAbi.abi,
        signer
      ) as unknown as Twitter;
      setContract(contractInstance);
    } catch (error) {
      toast({
        title: "Connection Error",
        description: error instanceof Error ? error.message : "Failed to connect wallet",
        variant: "destructive",
      });
    }
  }, []);

  const disconnectWallet = useCallback(async () => {
    setAccount(null);
    setAvailableAccounts([]);
    setProvider(null);
    setSigner(null);
    setContract(null);
    toast({
      title: "Wallet Disconnected",
      description: "You have been disconnected from your wallet.",
    });
  }, []);

  const selectAccount = useCallback((selectedAccount: string) => {
    setAccount(selectedAccount);
    toast({
      title: "Account Changed",
      description: `Switched to ${selectedAccount.slice(0, 6)}...${selectedAccount.slice(-4)}`,
    });
  }, []);

  // On mount, check if wallet is already connected.
  useEffect(() => {
    const checkWallet = async () => {
      if (window.ethereum?.isMetaMask) {
        try {
          const accounts = await window.ethereum.request({ method: "eth_accounts" });
          if (accounts.length > 0) {
            setAvailableAccounts(accounts);
            setAccount(accounts[0]);
            const web3Provider = new ethers.BrowserProvider(window.ethereum);
            setProvider(web3Provider);
            const signer = await web3Provider.getSigner();
            setSigner(signer);
            const contractInstance = new ethers.Contract(
              process.env.NEXT_PUBLIC_BUILDBEAR_SMART_CONTRACT_ADDRESS!,
              TwitterAbi.abi,
              signer
            ) as unknown as Twitter;
            setContract(contractInstance);
          }
        } catch (error) {
          console.error("Error checking wallet:", error);
        }
      }
      setLoading(false);
    };
    checkWallet();
  }, []);

  const web3Memo = useMemo(
    () => ({ provider, signer, account, availableAccounts, contract }),
    [provider, signer, account, availableAccounts, contract]
  );

  return { ...web3Memo, connectWallet, disconnectWallet, selectAccount, loading };
};