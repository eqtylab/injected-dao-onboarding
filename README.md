# 💉🎩🔓 Injected Magic + Unlock Onboarding
This script allows you to inject a Web2 friendly onboarding flow into your DAO's website

White-label wallets are supported by [Magic Auth](https://magic.link/docs/auth/overview#magic-auth)  
Membership NFT's are supported by [Unlock protocol](https://unlock-protocol.com/)

Try the example live at [https://injected-dao-onboarding.vercel.app/](https://injected-dao-onboarding.vercel.app/)

## Usage
You can inject the bundled `onboarding.js` script directly into your website.
See the [example](example/index.html) for how to setup the onboarding UI and render on your webpage.

## Setup
Clone this repo and create an empty `.env` file.
```
$ git clone git@github.com:eqty/injected-dao-onboarding.git
$ cp ./.env.example .env
```

### Base Url
Set your website base url in the `.env` file.
If you are developing locally, just leave it set as `http://localhost:3000`.
```
BASE_URL="https://website.com"
```

### Magic Auth
Create a Magic account and follow [Magic's Quick-Start guide](https://magic.link/docs/auth/overview#magic-auth) to create a Magic Auth App instance via the dashboard.  
In the App dashboard, grab the **Publishable API Key** and set it in your `.env` file.
```
MAGIC_PUBLISHABLE_KEY="pk_live_..."
```

### Unlock Protocol
Create a lock from the [Unlock dashboard](https://magic.link/docs/auth/overview#magic-auth).  
Once the lock contract is deployed, copy it's address into your `.env` file.
```
PAYWALL_LOCK_ADDRESS="0x..."
```

## Development
You will need to first install dependencies using npm.
```
$ npm install
```

After dependencies are installed, run the dev npm script and visit `localhost:3000`.
```
$ npm run dev
```

## Running the example
```
$ npm run start
```

## Building for production
To bundle the `onboarding.js` for production simply run the dist script.
```
$ npm run dist
```
