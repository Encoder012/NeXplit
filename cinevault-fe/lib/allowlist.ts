import { TransactionBlock } from '@mysten/sui.js/transactions';

const PACKAGE_ID = '0x...';         // Your deployed package ID
const MODULE_NAME = 'allowlist_policy';
const STRUCT_NAME = 'Allowlist';


export async function createAllowlistEntry(wallet, name: string) {
    const tx = new TransactionBlock();
    tx.moveCall({
        target: `${PACKAGE_ID}::${MODULE_NAME}::create_allowlist_entry`,
        arguments: [tx.pure(name)],
    });
    const result = await wallet.signAndExecuteTransactionBlock({ transactionBlock: tx });
    return result;
}

export async function addAddress(wallet, allowlistId: string, newAddress: string) {
    const tx = new TransactionBlock();
    tx.moveCall({
        target: `${PACKAGE_ID}::${MODULE_NAME}::add_address`,
        arguments: [
            tx.object(allowlistId),
            tx.pure(newAddress),
        ],
    });
    const result = await wallet.signAndExecuteTransactionBlock({ transactionBlock: tx });
    return result;
}

export async function removeAddress(wallet, allowlistId: string, address: string) {
    const tx = new TransactionBlock();
    tx.moveCall({
        target: `${PACKAGE_ID}::${MODULE_NAME}::remove_address`,
        arguments: [
            tx.object(allowlistId),
            tx.pure(address),
        ],
    });
    const result = await wallet.signAndExecuteTransactionBlock({ transactionBlock: tx });
    return result;
}

export async function transferOwnership(wallet, allowlistId: string, newOwner: string) {
    const tx = new TransactionBlock();
    tx.moveCall({
        target: `${PACKAGE_ID}::${MODULE_NAME}::transfer_ownership`,
        arguments: [
            tx.object(allowlistId),
            tx.pure(newOwner),
        ],
    });
    const result = await wallet.signAndExecuteTransactionBlock({ transactionBlock: tx });
    return result;
}

export async function sealApprove(wallet, allowlistId: string, id: number[]) {
    const tx = new TransactionBlock();
    tx.moveCall({
        target: `${PACKAGE_ID}::${MODULE_NAME}::seal_approve`,
        arguments: [
            tx.pure(id),
            tx.object(allowlistId),
        ],
    });
    const result = await wallet.signAndExecuteTransactionBlock({ transactionBlock: tx });
    return result;
}
