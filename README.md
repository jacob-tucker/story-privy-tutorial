This is a working code example for implementing email login & sponsored transactions using Privy on Story.

## Setup

1. Clone the project locally

2. `cp .env.example .env` and fill in your `NEXT_PUBLIC_PRIVY_APP_ID` in the `.env` file by creating an app at https://dashboard.privy.io

3. Make sure to enable Smart Wallets on your Privy dashboard

<img width="1512" alt="Screenshot 2025-03-10 at 11 26 20 PM" src="https://github.com/user-attachments/assets/1e12e09b-501b-4a74-97e2-efeff354a503" />

4. Once you enable Smart Wallets, right underneath make sure to put a "Custom chain" with the following values:

- Name: "Story Aeneid Testnet"
- ID number: 1315
- RPC URL: https://aeneid.storyrpc.io

For the Bundler URL and Paymaster URL, go to https://dashboard.pimlico.io and create a new app. Then click on "API Keys", create a new API Key, and click "RPC URLs":

<img width="1512" alt="Screenshot 2025-03-10 at 11 29 14 PM" src="https://github.com/user-attachments/assets/0e6d9e9c-dc60-44bf-9afe-b17c52ba07f2" />

5. `npm install`

6. `npm run dev`
