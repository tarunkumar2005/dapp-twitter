"use client";

import { Button } from "@/components/ui/button";
import { useWeb3 } from "@/hooks/use-web3";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserCircle } from "lucide-react";
import { useAppSelector } from "@/hooks/use-store";

export function WalletButton() {
  const username = useAppSelector((state) => state.twitter.username);
  const { account, availableAccounts, connectWallet, disconnectWallet, selectAccount, loading } = useWeb3();

  if (loading) {
    return (
      <Button disabled className="w-full rounded-full">
        Connecting...
      </Button>
    );
  }

  if (!account) {
    return (
      <Button onClick={connectWallet} variant="outline" className="w-full rounded-full">
        Connect Wallet
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full rounded-full flex justify-between items-center">
          <UserCircle className="h-5 w-5 mr-2" />
          <span>
            {username || "Loading..."}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {availableAccounts.map((acc) => (
          <DropdownMenuItem key={acc} onClick={() => selectAccount(acc)}>
            {acc === account ? `✔ ${acc}` : acc}
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem onClick={disconnectWallet}>Disconnect</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}