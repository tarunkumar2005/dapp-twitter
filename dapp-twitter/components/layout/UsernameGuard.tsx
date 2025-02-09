"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/hooks/use-store";
import { useWeb3 } from "@/hooks/use-web3";
import { getUserName } from "@/lib/features/TwitterSlice";

export default function UsernameGuard() {
  const { account, contract } = useWeb3();
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Read the username and loading state from Redux.
  const username = useAppSelector((state) => state.twitter.username);
  const loading = useAppSelector((state) => state.twitter.loading);

  // On mount (or when account/contract change), dispatch getUserName.
  useEffect(() => {
    if (account && contract) {
      dispatch(getUserName({ account, contract }));
    }
  }, [account, contract, dispatch]);

  // When loading is complete and account exists but username is empty, redirect.
  useEffect(() => {
    if (!loading && account && (!username || username.trim() === "")) {
      router.push("/set-username");
    }
  }, [account, loading, username, router]);

  return null;
}