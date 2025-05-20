

const PACKAGE_ID = "0x5da29b11379d14ab73a3994436ec46cd26b545756adb01ab4aa0c24ed8be38e2"
const MODULE_NAME = "allowlist_policy"

import { TransactionBlock } from '@mysten/sui.js/transactions';
import { SuiSignAndExecuteTransactionBlockInput, SuiTransactionBlockResponse } from '@mysten/sui.js';

export async function createSubscription<T>(
    wallet: {
        signAndExecuteTransactionBlock: (input: SuiSignAndExecuteTransactionBlockInput) => Promise<SuiTransactionBlockResponse>;
    },
    platformId: string
): Promise<SuiTransactionBlockResponse> {
    const tx = new TransactionBlock();

    tx.moveCall({
        target: `${PACKAGE_ID}::${MODULE_NAME}::create_subscription`,
        arguments: [tx.object(platformId)],
    });

    return await wallet.signAndExecuteTransactionBlock({ transactionBlock: tx });
}

export async function joinSubscription<T>(
    wallet: {
        signAndExecuteTransactionBlock: (input: SuiSignAndExecuteTransactionBlockInput) => Promise<SuiTransactionBlockResponse>;
    },
    subscriptionId: string,
    platformId: string,
    months: number,
    paymentCoin: string, // Object ID of the Coin<T> you want to pay with
    clockId: string
): Promise<SuiTransactionBlockResponse> {
    const tx = new TransactionBlock();

    tx.moveCall({
        target: `${PACKAGE_ID}::${MODULE_NAME}::join_subscription`,
        arguments: [
            tx.object(subscriptionId),
            tx.object(platformId),
            tx.pure(months, 'u64'),
            tx.object(paymentCoin),
            tx.object(clockId),
        ],
    });

    return await wallet.signAndExecuteTransactionBlock({ transactionBlock: tx });
}
