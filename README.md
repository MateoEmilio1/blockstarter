# Blockstarter

Blockstarter is a Web3 application designed to simplify token interactions on the Sepolia testnet. It features wallet connectivity via RainbowKit, network detection, token balance display, approvals, transfers, and a minting function. The app provides a seamless user experience with clear error handling, a structured state management system using Zustand, event tracking, and a polished UI with dark mode and responsive design. Additionally, it includes unit tests for key functionalities, ensuring reliability.

## Features

### Connect Wallet

Integrated RainbowKit to enable wallet connection with full support for detecting if the wallet is connected showing it in the principal button ("Please connect a wallet").

### Network Detection:
The app detects if the user isn't connected to Sepolia and displays a clear message on the main button ('Wrong network, please switch to Sepolia').

### Token Balances:
The app fetches and displays human-readable balances for both DAI (18 decimals) and USDC (6 decimals) using custom hooks and proper formatting (TokenSelector.tsx & TokenBalance.tsx).

### Approve & Transfer
Users can approve token allowances and perform transfers. The UI includes:

- Inputs for specifying the amount.
- Buttons with loading states, warnings ("you are transferring to your own address") and error validations (e.g, "Not enough funds" , "Invalid Ethereum address" , "Address is required").
- A dedicated flow for approval and transfer actions, with appropriate state management via Zustand.

### Mint Tokens
A mint button allows users to get test tokens, with visual feedback:

When minting is in progress, the button shows "Processing...".
On success, a success message along with a confetti animation is displayed.
Error states are handled with clear messaging and with corresponding buttons so that the user can go back and interact again.

### Event Table:
An event table displays transfer and approval events with details such as token, amount, sender, recipient, and transaction hash.
Includes a filtering option to sort events by token.

### State Architecture
The project leverages a structured Zustand store for state management, making the code modular and maintainable.

### Testing
Comprehensive unit tests have been implemented for key hooks (useMint, useApprove, useTokenBalance, useContractEvents, etc.), ensuring robust functionality.

### UI/UX Enhancements

Dark mode styling and responsive design.
Animations and loading states for buttons.
A modern, Uniswap-inspired interface for key interactions.
Utilizes open-source components from Shadcn/ui for a polished and consistent UI.
