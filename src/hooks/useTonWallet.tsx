import { useTonWallet } from '@tonconnect/ui-react';

export const Wallet = () => {
    const wallet = useTonWallet();

    return (
        wallet && (
            <div>
                <span>Connected wallet: {wallet.connectItems?.tonProof?.name}</span>
                <span>Device: {wallet.device.appName}</span>
                <span>{wallet.account.address}</span>
            </div>
        )
    );
};