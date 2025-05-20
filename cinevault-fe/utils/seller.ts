import {
    ConnectButton,
    useAccountBalance,
    useWallet,
    SuiChainId,
    ErrorCode,
    formatSUI,
    useSuiClient,
} from "@suiet/wallet-kit";

import {
    SuiTransactionBlock,
    JsonRpcProvider,
    Connection,
} from '@mysten/sui.js';

const ALLOWLIST_PACKAGE_ID = "0x5da29b11379d14ab73a3994436ec46cd26b545756adb01ab4aa0c24ed8be38e2"
const ALLOWLIST_MODULE_NAME = "allowlist_policy"

const SUBSCRIPTION_PACKAGE_ID = ""


// declaring create allowlist function
const createAllowlist = async (name: string) => {
    const { signAndExecuteTransaction, address } = useWallet();
    const tx = new SuiTransactionBlock();
    tx.moveCall({
        target: `${ALLOWLIST_PACKAGE_ID}::${ALLOWLIST_MODULE_NAME}::create_allowlist_entry`,
        arguments: [tx.pure.string(name)],
    });
    return await signAndExecuteTransaction({ transaction: tx });
};


async function createListing(
    name: string,
    plan: string,
    pricePerMonth: string,
    duration: number,
    concurrentUsers: number,
    creds: string
) {
    // Creating allowlist
    let allowlistId = await createAllowlist(name);
    console.log(allowlistId);

    // seal


}