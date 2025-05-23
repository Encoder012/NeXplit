import {
    useWallet,
} from "@suiet/wallet-kit";


import { getAllowlistedKeyServers, SealClient, SessionKey, EncryptedObject, SealCompatibleClient } from '@mysten/seal';
import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';
import { fromHEX, toHEX } from '@mysten/sui.js/utils';
import { WalrusClient } from '@mysten/walrus';
import { Transaction } from "@mysten/sui/transactions";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { SuiSignAndExecuteTransactionBlockInput, SuiTransactionBlockResponse } from '@mysten/sui.js';


const ALLOWLIST_PACKAGE_ID = "0x5da29b11379d14ab73a3994436ec46cd26b545756adb01ab4aa0c24ed8be38e2"
const ALLOWLIST_MODULE_NAME = "allowlist_policy"

const SUBSCRIPTION_PACKAGE_ID = "0x28d003d5c59ee6226956b4755df68a249e47703fda334129736b5cd1f1f754b7"
const SUBSCRIPTION_MODULE_NAME = "subscription"





// declaring create allowlist function
const createAllowlist = async (
    wallet: {
        signAndExecuteTransactionBlock: (input: SuiSignAndExecuteTransactionBlockInput) => Promise<SuiTransactionBlockResponse>;
    },
    name: string,
) => {
    const tx = new Transaction();
    tx.moveCall({
        target: `${ALLOWLIST_PACKAGE_ID}::${ALLOWLIST_MODULE_NAME}::create_allowlist_entry`,
        arguments: [tx.pure.string(name)],
    });
    const result = await wallet.signAndExecuteTransactionBlock({
        transactionBlock: tx,
        options: {
            showEffects: true,
            showObjectChanges: true,
        },
    });
    console.log(result)
    return "0x9dc4cd93f9c3cad14bd8978de21e11c11f89ede40aade3845aedae92c76adf87"

    // const txResult = result as any;

    const createdObjects = result.objectChanges || [];
    if (createdObjects.length === 0) {
        throw new Error("No object created in transaction");
    }
    else {
        createdObjects.forEach((element: any) => {
            if (element.type == "created" && element.objectType == `${ALLOWLIST_PACKAGE_ID}::allowlist_policy::Allowlist`) {
                const AllowlistObjectId = element.objectId;
                return AllowlistObjectId
            }
            else {
                throw new Error("No object created in transaction");

            }
        });
    }

    // const allowlistId = txResult.objectChanges?.find(
    //     (obj: any) =>
    //         obj.type === 'created' &&
    //         obj.objectType.includes(`${ALLOWLIST_MODULE_NAME}::Allowlist`)
    // )?.objectId;

    // return allowlistId;
};


const encryptAndUpload = async (
    wallet,
    allowlistId: string,
    creds: { email: string, password: string },
) => {
    const rawClient = new SuiClient({
        url: getFullnodeUrl('testnet'),
    });

    const suiClient = rawClient as unknown as SealCompatibleClient

    const sealClient = new SealClient({
        suiClient,
        serverObjectIds: getAllowlistedKeyServers('testnet'),
        verifyKeyServers: false,
    });

    try {
        if (!wallet.connected || !wallet.address) throw new Error("Wallet not connected");


        const nonce = new Uint8Array(5);
        window.crypto.getRandomValues(nonce);

        const policyObjectBytes = fromHEX(allowlistId);
        const id = toHEX(new Uint8Array([...policyObjectBytes, ...nonce]));

        const dataToEncrypt = JSON.stringify(creds);

        const { encryptedObject, key } = await sealClient.encrypt({
            data: new TextEncoder().encode(dataToEncrypt),
            id,
            packageId: ALLOWLIST_PACKAGE_ID,
            threshold: 1,
        });
        return encryptedObject;

    } catch (error) {
        console.error("[ERROR] Failed to create listing:", error);
        throw error;
    }

}

const createPlatform = async (
    wallet: {
        signAndExecuteTransactionBlock: (input: SuiSignAndExecuteTransactionBlockInput) => Promise<SuiTransactionBlockResponse>;
    },
    name: string,
    plan: string,
    pricePerMonth: BigInt,
    duration: number,
    concurrentUsers: number,
) => {
    name = "Netflix Premium";
    const descriptionText = ``.trim();
    const description = new TextEncoder().encode(descriptionText);
    const url = new TextEncoder().encode("/placeholder.svg?height=400&width=600");
    pricePerMonth = BigInt(Math.floor(17.99 * 1_000_000)); // mock price in MIST units
    const totalDuration = BigInt(6);
    const maxUsers = BigInt(1000);

    // Create a new transaction block
    const tx = new TransactionBlock();

    tx.moveCall({
        target: `${SUBSCRIPTION_PACKAGE_ID}::${SUBSCRIPTION_MODULE_NAME}::create_platform`,
        arguments: [
            tx.pure(name),
            tx.pure(description),
            tx.pure(url),
            tx.pure(pricePerMonth),
            tx.pure(totalDuration),
            tx.pure(maxUsers),
        ],
    });

    try {
        // Sign and execute the transaction
        const response = await wallet.signAndExecuteTransactionBlock({
            transactionBlock: tx,
            options: {
                showEffects: true,
                showObjectChanges: true,
            },
        });

        // Find the created object ID from transaction effects
        // Usually the created objects are in 'created' field of effects
        const createdObjects = response.effects?.created || [];
        if (createdObjects.length === 0) {
            throw new Error("No object created in transaction");
        }

        // Assuming the first created object is your PlatformNFT
        const platformObjectId = createdObjects[0].reference.objectId;

        console.log("Platform created with Object ID:", platformObjectId);

        return platformObjectId;
    } catch (error) {
        console.error("Failed to create platform:", error);
        throw error;
    }

}


export const createListing = async (
    wallet: {
        signAndExecuteTransactionBlock: (input: SuiSignAndExecuteTransactionBlockInput) => Promise<SuiTransactionBlockResponse>;
    },
    name: string,
    plan: string,
    pricePerMonth: BigInt,
    duration: number,
    concurrentUsers: number,
    creds: { email: string, password: string },
) => {


    // Creating allowlist
    let allowlistId = await createAllowlist(wallet, name);
    console.log(allowlistId);


    // seal the creds and get encryptedObject
    let encryptedObject = await encryptAndUpload(wallet, allowlistId, creds)

    // store the encryptedObject

    // create platformnft
    // let platformId = await createPlatform(wallet, name, plan, pricePerMonth, duration, concurrentUsers)

    return {
        allowlistId,
        platformId: "0x9dc4cd93f9c3cad14bd8978de21e11c11f89ede40aade3845aedae92c76adf87"
    }
}

