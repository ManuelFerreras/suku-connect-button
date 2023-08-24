import Provider from "@walletconnect/ethereum-provider";
import { sukuChromeStoreUrl } from "./constants";

export const checkIfSukuWalletIsInstalled = async () => {
  return new Promise<boolean>((resolve) => {
    window.addEventListener('message', (event) => {
      if (event?.data === 'installed') {
        // If we get a message from the extension, then it is installed.
        resolve(true);
      }
    })

    // Check if Suku Wallet is installed.
    window.postMessage('sukuWalletInstalled', "*");

    // If we don't get a message from the extension, then it is not installed.
    setTimeout(() => {
      resolve(false);
    }, 1000);
  })
}

export const connectWithSukuWallet = async (provider: Provider) => {
  // We First Check if Suku Wallet is Installed.
  const installed = await checkIfSukuWalletIsInstalled();

  // Check if Suku Wallet is Installed. If not, redirect to the Chrome Web Store.
  if (!installed) {
    window.open(sukuChromeStoreUrl, '_blank')
    return
  }

  provider.on('display_uri', (uri: string) => {
    // When the URI is requested, we forward it to the extension.
    window.postMessage({ type: 'createWalletConnectConnection', uri }, "*");
  })

  await provider.connect()

  return provider
}