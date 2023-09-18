import Provider from "@walletconnect/ethereum-provider";
import { createSessionMessage, sukuChromeStoreUrl, sukuWalletInstalledEvent, sukuWalletInstalledMessage, uriEvent } from "./constants";

export const checkIfSukuWalletIsInstalled = async () => {
  return new Promise<boolean>((resolve) => {
    window.addEventListener('message', (event) => {
      if (event?.data === sukuWalletInstalledEvent) {
        // If we get a message from the extension, then it is installed.
        resolve(true);
      }
    })

    // Check if Suku Wallet is installed.
    window.postMessage(sukuWalletInstalledMessage, "*");

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
    openInstallationPage()
    return false
  }

  provider.on(uriEvent, (uri: string) => {
    // When the URI is requested, we forward it to the extension.
    window.postMessage({ type: createSessionMessage, uri }, "*");
  })

  await provider.connect()
  return true
}

export const openInstallationPage = () => {
  window.open(sukuChromeStoreUrl, '_blank')
}