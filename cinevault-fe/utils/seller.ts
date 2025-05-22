import {
    useWallet,
} from "@suiet/wallet-kit";

import {
    SuiTransactionBlock,
} from '@mysten/sui.js';

import { getAllowlistedKeyServers, SealClient, SessionKey, EncryptedObject, SealCompatibleClient } from '@mysten/seal';
import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';
import { fromHEX, toHEX } from '@mysten/sui.js/utils';
import { WalrusClient } from '@mysten/walrus';

const ALLOWLIST_PACKAGE_ID = "0x5da29b11379d14ab73a3994436ec46cd26b545756adb01ab4aa0c24ed8be38e2"
const ALLOWLIST_MODULE_NAME = "allowlist_policy"

const SUBSCRIPTION_PACKAGE_ID = ""


const { signAndExecuteTransaction, address, connected } = useWallet();





// declaring create allowlist function
const createAllowlist = async (name: string) => {
    const { signAndExecuteTransactionBlock, address } = useWallet();
    const tx = new SuiTransactionBlock();
    tx.moveCall({
        target: `${ALLOWLIST_PACKAGE_ID}::${ALLOWLIST_MODULE_NAME}::create_allowlist_entry`,
        arguments: [tx.pure.string(name)],
    });
    const result = await signAndExecuteTransactionBlock({
        transactionBlock: tx,
        options: {
            showEffects: true,
            showObjectChanges: true,
        },
    });

    const txResult = result as any;

    const allowlistId = txResult.objectChanges?.find(
        (obj: any) =>
            obj.type === 'created' &&
            obj.objectType.includes(`${ALLOWLIST_MODULE_NAME}::Allowlist`)
    )?.objectId;

    return allowlistId;
};


const encryptAndUpload = async (
    allowlistId: string,
    creds: string,
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
        if (!connected || !address) throw new Error("Wallet not connected");


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
    name: string,
    plan: string,
    pricePerMonth: number,
    duration: number,
    concurrentUsers: number
) => {

}

const createListing = async (
    name: string,
    plan: string,
    pricePerMonth: number,
    duration: number,
    concurrentUsers: number,
    creds: string
) => {
    // Creating allowlist
    let allowlistId = await createAllowlist(name);
    console.log(allowlistId);


    // seal the creds and get encryptedObject
    let encryptedObject = await encryptAndUpload(allowlistId, creds)

    // store the encryptedObject

    // create platformnft
    let platformNFTID = await createPlatform(name, plan, pricePerMonth, duration, concurrentUsers)


}