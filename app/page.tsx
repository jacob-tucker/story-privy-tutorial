"use client";
import { usePrivy } from "@privy-io/react-auth";
import { useSmartWallets } from "@privy-io/react-auth/smart-wallets";
import { encodeFunctionData, http } from "viem";
import { defaultNftContractAbi } from "@/lib/constants/defaultNftContractAbi";
import {
  EncodedTxData,
  StoryClient,
  StoryConfig,
} from "@story-protocol/core-sdk";
import { useState } from "react";
import ActionCard from "@/lib/components/ActionCard";
import Navbar from "@/lib/components/Navbar";
import Footer from "@/lib/components/Footer";

const NFT_CONTRACT_ADDRESS = "0x937bef10ba6fb941ed84b8d249abc76031429a9a";
const SPG_NFT_CONTRACT_ADDRESS = "0xc32A8a0FF3beDDDa58393d022aF433e78739FAbc";

export default function Home() {
  const { login, user } = usePrivy();
  const { client: smartWalletClient } = useSmartWallets();
  const [transactionStatus, setTransactionStatus] =
    useState<React.ReactNode>("");

  async function setupStoryClient() {
    const config: StoryConfig = {
      account: smartWalletClient!.account,
      transport: http("https://aeneid.storyrpc.io"),
      chainId: "aeneid",
    };
    const client = StoryClient.newClient(config);
    return client;
  }

  async function signMessage() {
    setTransactionStatus("Signing message...");
    try {
      const uiOptions = {
        title: "Example Sign",
        description: "This is an example for a user to sign.",
        buttonText: "Sign",
      };
      const request = {
        message: "IP is cool",
      };
      const signature = await smartWalletClient?.signMessage(request, {
        uiOptions,
      });
      console.log("Signature:", signature);
      setTransactionStatus(
        `Message signed successfully! Signature: ${signature?.slice(
          0,
          20
        )}...${signature?.slice(-20)}`
      );
    } catch (error) {
      console.error(error);
      setTransactionStatus("Error signing message");
    }
  }

  async function mintNFT() {
    setTransactionStatus("Minting NFT...");
    try {
      const uiOptions = {
        title: "Mint NFT",
        description: "This is an example transaction that mints an NFT.",
        buttonText: "Mint",
      };

      const transactionRequest = {
        to: NFT_CONTRACT_ADDRESS,
        data: encodeFunctionData({
          abi: defaultNftContractAbi,
          functionName: "mintNFT",
          args: ["0x6B86B39F03558A8a4E9252d73F2bDeBfBedf5b68", "test-uri"],
        }),
      } as const;

      const txHash = await smartWalletClient?.sendTransaction(
        transactionRequest,
        {
          uiOptions,
        }
      );
      console.log("Transaction Hash:", txHash);

      // Create explorer link and show in status
      const explorerLink = `https://aeneid.storyscan.xyz/tx/${txHash}`;
      setTransactionStatus(
        <span>
          NFT minted successfully!{" "}
          <a
            href={explorerLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-medium"
          >
            View on Explorer
          </a>
        </span>
      );
    } catch (error) {
      console.error(error);
      setTransactionStatus("Error minting NFT");
    }
  }

  async function registerIp() {
    setTransactionStatus("Registering IP...");
    try {
      const storyClient = await setupStoryClient();

      const response = await storyClient.ipAsset.mintAndRegisterIp({
        spgNftContract: SPG_NFT_CONTRACT_ADDRESS,
        ipMetadata: {
          ipMetadataURI:
            "https://ipfs.io/ipfs/QmReVXv6nAFqw3o2gkWk6Ag51MyfFJV3XxAF9puyga2j8s",
          ipMetadataHash:
            "0x018a895030842946f4bd1911f1658dc6c811f53fae70c1609cc1727047315fa4",
          nftMetadataURI:
            "https://ipfs.io/ipfs/QmWQmJYqshh3SVQ6Yv8PnN4paN6QEDq2tmW17PQ6NybnZR",
          nftMetadataHash:
            "0x41a4d1aded5525a12fd2c1ee353712e9e980535651eb20c6b6ff151c5eecd590",
        },
        txOptions: { encodedTxDataOnly: true },
      });

      const uiOptions = {
        title: "Register IP",
        description: "This is an example transaction that registers an IP.",
        buttonText: "Register",
      };

      const txHash = await smartWalletClient?.sendTransaction(
        response.encodedTxData as EncodedTxData,
        {
          uiOptions,
        }
      );
      console.log("Transaction Hash:", txHash);

      // Create explorer link and show in status
      const explorerLink = `https://aeneid.storyscan.xyz/tx/${txHash}`;
      setTransactionStatus(
        <span>
          IP registered successfully!{" "}
          <a
            href={explorerLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-medium"
          >
            View on Explorer
          </a>
        </span>
      );
    } catch (error) {
      console.error(error);
      setTransactionStatus("Error registering IP");
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-gray-50 text-black">
      {/* Navbar component */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1 py-16 px-6">
        <div className="max-w-5xl mx-auto">
          {user ? (
            <div className="space-y-10">
              {/* Header */}
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-3">Examples</h1>
                <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                  Here are some example interactions on{" "}
                  <a
                    href="https://www.storyprotocol.xyz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black font-medium hover:underline"
                  >
                    Story
                  </a>{" "}
                  using{" "}
                  <a
                    href="https://privy.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black font-medium hover:underline"
                  >
                    Privy
                  </a>{" "}
                  for Smart Wallets and{" "}
                  <a
                    href="https://pimlico.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black font-medium hover:underline"
                  >
                    Pimlico
                  </a>{" "}
                  as the paymaster. Featuring login with email and sponsored
                  transactions.
                </p>
              </div>

              {/* Status message */}
              {transactionStatus && (
                <div className="max-w-2xl mx-auto p-4 border rounded-lg bg-white shadow-sm text-sm">
                  <div className="flex items-center justify-center">
                    {transactionStatus}
                  </div>
                </div>
              )}

              {/* Action cards */}
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    title: "Sign Message",
                    description:
                      "Sign an example message with your Smart Wallet.",
                    action: signMessage,
                    icon: (
                      <path
                        fillRule="evenodd"
                        d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v-1l1-1 1-1-.257-.257A6 6 0 1118 8zm-6-4a1 1 0 100 2h2a1 1 0 100-2h-2z"
                        clipRule="evenodd"
                      />
                    ),
                  },
                  {
                    title: "Mint NFT",
                    description:
                      "This example shows calling an arbitrary contract on Story with your Smart Wallet.",
                    action: mintNFT,
                    icon: (
                      <>
                        <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                        <path
                          fillRule="evenodd"
                          d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                          clipRule="evenodd"
                        />
                      </>
                    ),
                  },
                  {
                    title: "Register IP",
                    description:
                      "This example shows calling a function in the Story SDK with your Smart Wallet.",
                    action: registerIp,
                    icon: (
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                        clipRule="evenodd"
                      />
                    ),
                  },
                ].map((card, i) => (
                  <ActionCard key={i} card={card} />
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 space-y-8 text-center">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-4xl" role="img" aria-label="Tools">
                  🛠️
                </span>
              </div>
              <h1 className="text-5xl font-bold">Story &lt;&gt; Privy Demo</h1>
              <p className="text-xl text-gray-500 max-w-md">
                Connect your wallet to start interacting with Story
              </p>
              <button
                onClick={login}
                className="rounded-md text-sm font-medium h-12 px-8 py-3 bg-black text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-all shadow-sm hover:shadow"
              >
                Login with Privy
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer component */}
      <Footer />
    </div>
  );
}
