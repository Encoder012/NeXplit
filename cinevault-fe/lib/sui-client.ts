// Simple client for interacting with Sui blockchain
import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519"
import { SuiClient, getFullnodeUrl } from "@mysten/sui.js/client"
import { TransactionBlock } from "@mysten/sui.js/transactions"

// Initialize Sui client
const client = new SuiClient({ url: getFullnodeUrl("testnet") })

// Package ID where the subscription module is deployed
const PACKAGE_ID = "0x28d003d5c59ee6226956b4755df68a249e47703fda334129736b5cd1f1f754b7" // Replace with actual package ID after deployment

export async function createPlatform(
  name: string,
  description: string,
  url: string,
  pricePerMonth: number,
  totalDuration: number,
  maxUsers: number,
  privateKey: string,
) {
  try {
    const keypair = Ed25519Keypair.fromSecretKey(Buffer.from(privateKey, "hex"))
    const tx = new TransactionBlock()

    // Convert price from dollars to smallest unit (assuming SUI with 9 decimals)
    const priceInSui = Math.floor(pricePerMonth * 1_000_000_000)

    tx.moveCall({
      target: `${PACKAGE_ID}::subscription::create_platform`,
      arguments: [
        tx.pure(Array.from(new TextEncoder().encode(name))),
        tx.pure(Array.from(new TextEncoder().encode(description))),
        tx.pure(Array.from(new TextEncoder().encode(url))),
        tx.pure(priceInSui),
        tx.pure(totalDuration),
        tx.pure(maxUsers),
      ],
    })

    const result = await client.signAndExecuteTransactionBlock({
      signer: keypair,
      transactionBlock: tx,
    })

    return {
      success: true,
      txId: result.digest,
      platformId: extractPlatformId(result),
    }
  } catch (error) {
    console.error("Error creating platform:", error)
    return {
      success: false,
      error: error.message,
    }
  }
}

export async function createSubscription(platformId: string, privateKey: string) {
  try {
    const keypair = Ed25519Keypair.fromSecretKey(Buffer.from(privateKey, "hex"))
    const tx = new TransactionBlock()

    // Get platform object
    tx.moveCall({
      target: `${PACKAGE_ID}::subscription::create_subscription`,
      arguments: [tx.object(platformId)],
      typeArguments: ["0x2::sui::SUI"], // Using SUI as the payment token
    })

    const result = await client.signAndExecuteTransactionBlock({
      signer: keypair,
      transactionBlock: tx,
    })

    return {
      success: true,
      txId: result.digest,
      subscriptionId: extractSubscriptionId(result),
    }
  } catch (error) {
    console.error("Error creating subscription:", error)
    return {
      success: false,
      error: error.message,
    }
  }
}

export async function joinSubscription(
  subscriptionId: string,
  platformId: string,
  months: number,
  amount: number,
  privateKey: string,
) {
  try {
    const keypair = Ed25519Keypair.fromSecretKey(Buffer.from(privateKey, "hex"))
    const tx = new TransactionBlock()

    // Convert amount from dollars to smallest unit (assuming SUI with 9 decimals)
    const amountInSui = Math.floor(amount * 1_000_000_000)

    // Create a coin for payment
    const [coin] = tx.splitCoins(tx.gas, [tx.pure(amountInSui)])

    tx.moveCall({
      target: `${PACKAGE_ID}::subscription::join_subscription`,
      arguments: [
        tx.object(subscriptionId),
        tx.object(platformId),
        tx.pure(months),
        coin,
        tx.object("0x6"), // Clock object ID on Sui
      ],
      typeArguments: ["0x2::sui::SUI"], // Using SUI as the payment token
    })

    const result = await client.signAndExecuteTransactionBlock({
      signer: keypair,
      transactionBlock: tx,
    })

    return {
      success: true,
      txId: result.digest,
    }
  } catch (error) {
    console.error("Error joining subscription:", error)
    return {
      success: false,
      error: error.message,
    }
  }
}

export async function claimPayment(subscriptionId: string, platformId: string, privateKey: string) {
  try {
    const keypair = Ed25519Keypair.fromSecretKey(Buffer.from(privateKey, "hex"))
    const tx = new TransactionBlock()

    tx.moveCall({
      target: `${PACKAGE_ID}::subscription::claim_payment`,
      arguments: [
        tx.object(subscriptionId),
        tx.object(platformId),
        tx.object("0x6"), // Clock object ID on Sui
      ],
      typeArguments: ["0x2::sui::SUI"], // Using SUI as the payment token
    })

    const result = await client.signAndExecuteTransactionBlock({
      signer: keypair,
      transactionBlock: tx,
    })

    return {
      success: true,
      txId: result.digest,
    }
  } catch (error) {
    console.error("Error claiming payment:", error)
    return {
      success: false,
      error: error.message,
    }
  }
}

// Helper function to extract platform ID from transaction result
function extractPlatformId(result: any): string {
  // This is a simplified implementation
  // In a real app, you would parse the transaction effects to find the created object ID
  try {
    const createdObjects = result.effects?.created || []
    return createdObjects[0]?.reference?.objectId || ""
  } catch (error) {
    console.error("Error extracting platform ID:", error)
    return ""
  }
}

// Helper function to extract subscription ID from transaction result
function extractSubscriptionId(result: any): string {
  // This is a simplified implementation
  // In a real app, you would parse the transaction effects to find the created object ID
  try {
    const createdObjects = result.effects?.created || []
    return createdObjects[0]?.reference?.objectId || ""
  } catch (error) {
    console.error("Error extracting subscription ID:", error)
    return ""
  }
}
