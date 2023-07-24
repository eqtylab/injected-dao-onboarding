# 💉🎩🔓 Injected Magic + Unlock Onboarding
This script allows you to inject a Web2 friendly onboarding flow into your DAO's website

White-label wallets are supported by [Magic Auth](https://magic.link/docs/auth/overview#magic-auth)  
Membership NFT's are supported by [Unlock protocol](https://unlock-protocol.com/)

Try the example live at [https://injected-dao-onboarding.vercel.app/](https://injected-dao-onboarding.vercel.app/)

## Usage
You can inject the bundled `onboarding.js` script directly into your website.
See the [example](example/index.html) for how to setup the onboarding UI and render on your webpage.

```html
<html>
  <head>
    <title>Your DAO's Landing Page</title>
    <link rel="stylesheet" href="css/styles.css">
    <script src="js/onboarding.js"></script>
  </head>
  <body>
    <button id="onboarding-cta-btn">Join DAO</button>
    <div id="onboarding-frame"></div>

    <!-- Setup onboarding UI -->
    <script defer>
      if (typeof window?.Onboarding === "undefined") {
        throw new Error("No Onboarding object found!");
      }

      const onboarding = new Onboarding({
        network: 'mainnet',
        magicConfig: {
          apiKey: "pk_live_..."
        },
        unlockConfig: {
          name: "DAO Membership",
          lockAddress: "0x..."
        },
      });

      // Mount onboarding UI to the page
      onboarding.render(document.getElementById('onboarding-frame'));

      // Setup click handler to show onboarding UI
      const ctaElement = document.getElementById('onboarding-cta-btn');
      ctaElement.onclick = e => {
        e.preventDefault();
        onboarding.show();
      };      
    </script>
  </body>
</html>
```

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
