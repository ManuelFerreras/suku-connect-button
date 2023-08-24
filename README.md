<a href='https://www.suku.world/'><img src="https://uploads-ssl.webflow.com/645eee67f84b330beef86b9f/64b6d399a1bb722dbd3f7d86_Suku%20Logo%20Black.svg" width="200"></a>

<br>

## Description

Fast, light, straightforward library for adding a suku connect button to any DApp supporting Wallet Connect.

<br>

## Installation

```console
$ npm install suku-connect-button
```

<br>

## Quick Start Example

Start by installing the library with:
```console
$ npm install suku-connect-button
```
<br>

Then, you will be able to create your custom EthereumProvider like:
```
import Provider from '@walletconnect/ethereum-provider'

// Create your custom provider with your DApp's metadata.
const sukuProvider = await Provider.init({
  projectId: 'xxx', // REQUIRED your projectId
  chains: [x, x, x], // REQUIRED chain ids
  showQrModal: false,
  methods: [xxx], // REQUIRED ethereum methods
  events: ['display_uri', xxx], // REQUIRED ethereum events
})

// Set your necessary events.
sukuProvider.on('connect', (payload) => {
  console.log(payload)
  setConnected(true)
  setUserAddress(sukuProvider.accounts[0])
  setChain(sukuProvider.chainId)
})

// Connect your provider with Suku Wallet.
await connectWithSukuWallet(sukuProvider)
```

<br>

You will also may want to check wether the Suku Wallet is installed or not. Here is a simple example:
```
useEffect(() => {
  const checkInstalled = async () => {
    const installed = await checkIfSukuWalletIsInstalled()
    setInstalled(installed)
  }

  checkInstalled()
}, [])
```

<br>

## Expected Behaviours:
1) By default, if the Suku Wallet is not installed, but a connection is attempted, the Chrome Store website of the Wallet Extension will be opened so that the user is able to install the CE.

<br>

2) In the case of a successful connection, you will be able to keep using your provider as any conventional Wallet Connect provider.

<br>

## Recomendations:

We highly recommend that the given provider that is passed in to the connectWithSukuWallet function has the following property set to false:

```
  showQrModal: false,
```

This will not create a visible Wallet Connect QR modal, and so the user won't get confused when having to accept the Session Request.

<br>

We also suggest that the provider supports the event ```'display_uri'```

This is so that we can detect when the connection uri is created, and pass it to the Wallet directly.