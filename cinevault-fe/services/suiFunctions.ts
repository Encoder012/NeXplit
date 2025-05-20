import {
    ConnectButton,
    useAccountBalance,
    useWallet,
    SuiChainId,
    ErrorCode,
} from "@suiet/wallet-kit";
import { Transaction } from "@mysten/sui/transactions";
import { useMemo } from "react";
import { Ed25519PublicKey } from "@mysten/sui/keypairs/ed25519";
import { Buffer } from "buffer";


const sampleNft = new Map([
    [
        "sui:devnet",
        "0xe146dbd6d33d7227700328a9421c58ed34546f998acdc42a1d05b4818b49faa2::nft::mint",
    ],
    [
        "sui:testnet",
        "0x5ea6aafe995ce6506f07335a40942024106a57f6311cb341239abf2c3ac7b82f::nft::mint",
    ],
    [
        "sui:mainnet",
        "0x5b45da03d42b064f5e051741b6fed3b29eb817c7923b83b92f37a1d2abf4fbab::nft::mint",
    ],
]);

const wallet = useWallet();
const { balance } = useAccountBalance();

const nftContractAddr = useMemo(() => {
    if (!wallet.chain) return "";
    return sampleNft.get(wallet.chain.id) ?? "";
}, [wallet]);

function uint8arrayToHex(value: Uint8Array | undefined) {
    if (!value) return "";
    // @ts-ignore
    return value.toString("hex");
}


async function handleExecuteMoveCall(target: string | undefined) {
    if (!target) return;

    try {
        const tx = new Transaction();
        tx.moveCall({
            target: target as any,
            arguments: [
                tx.pure.string("Suiet NFT"),
                tx.pure.string("Suiet Sample NFT"),
                tx.pure.string(
                    "https://xc6fbqjny4wfkgukliockypoutzhcqwjmlw2gigombpp2ynufaxa.arweave.net/uLxQwS3HLFUailocJWHupPJxQsli7aMgzmBe_WG0KC4"
                ),
            ],
        });
        const resData = await wallet.signAndExecuteTransaction({
            transaction: tx,
        });
        console.log("executeMoveCall success", resData);
        alert("executeMoveCall succeeded (see response in the console)");
    } catch (e) {
        console.error("executeMoveCall failed", e);
        alert("executeMoveCall failed (see response in the console)");
    }
}
