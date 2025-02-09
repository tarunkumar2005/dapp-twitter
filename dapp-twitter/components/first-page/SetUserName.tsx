"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/use-store";
import { getUserName, setUserName } from "@/lib/features/TwitterSlice";
import { generateRandomUserName } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, RefreshCw } from "lucide-react";
import { useWeb3 } from "@/hooks/use-web3";

export function SetUsername() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { account, contract } = useWeb3();

  // Read the stored username and loading state from Redux.
  const storedUsername = useAppSelector((state) => state.twitter.username);
  const loadingRedux = useAppSelector((state) => state.twitter.loading);

  // Local state for the username input.
  const [usernameInput, setUsernameInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // On mount, fetch the username from on-chain.
  useEffect(() => {
    if (account && contract) {
      dispatch(getUserName({ account, contract }));
    }
  }, [account, contract, dispatch]);

  // If a username is already set, redirect to home.
  useEffect(() => {
    if (account && storedUsername && storedUsername.trim().length > 0) {
      router.push("/");
    }
  }, [account, storedUsername, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput.trim() === "" || !contract) return;
    setIsSubmitting(true);
    try {
      const resultAction = await dispatch(
        setUserName({ username: usernameInput, contract })
      );
      if (setUserName.fulfilled.match(resultAction)) {
        router.push("/");
      }
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGenerateRandomName = () => {
    const randomName = generateRandomUserName();
    setUsernameInput(randomName);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Set Your Username
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Enter your username"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              className="flex-grow"
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleGenerateRandomName}
              className="flex-shrink-0"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Random
            </Button>
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={
              isSubmitting || usernameInput.trim() === "" || loadingRedux
            }
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Setting...
              </>
            ) : (
              "Set Username"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="text-center text-sm text-muted-foreground">
        Choose a unique username for your profile.
      </CardFooter>
    </Card>
  );
}