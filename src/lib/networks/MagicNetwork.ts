import { ethers } from "ethers";
import { EthNetworkName, MagicUserMetadata } from "magic-sdk";
import { MagicType } from "../magic";
import { Network } from "../network";
import { OAuthRedirectConfiguration } from "@magic-ext/oauth";

// Abstract class to handle magic network-specific operations
export class MagicNetwork extends Network {
  public magic: MagicType;
  public provider: ethers.providers.Web3Provider;
  public oauthRedirects: OAuthRedirectConfiguration[];

  constructor(networkName: EthNetworkName, magic: MagicType, oauthRedirects: OAuthRedirectConfiguration[]) {
    super(networkName);
    this.magic = magic;
    this.provider = this.magic.rpcProvider as any;
    this.oauthRedirects = oauthRedirects;
    console.info("Network:", "Magic EVM", networkName);
  }

  // Static method to create MagicNetwork instance based on network type
  public static create(
    networkName: EthNetworkName,
    magic: MagicType,
    oauthRedirects: OAuthRedirectConfiguration[]
  ): MagicNetwork {
    return new MagicNetwork(networkName, magic, oauthRedirects);
  }

  private async loginWithOauth(
    oauthRedirect: OAuthRedirectConfiguration
  ) {
    const oauthRedirectIndex = this.oauthRedirects.findIndex(({ provider }) => {
      return provider === oauthRedirect.provider; 
    })
    if (oauthRedirectIndex === -1) {
      throw Error(`No OAuth redirect config specified for provider: ${oauthRedirect.provider}`);
    }
    await this.magic.oauth.loginWithRedirect(oauthRedirect);
  }

  private async loginWithEmail(
    email: string,
    afterLoginSuccess?: (userMetadata: MagicUserMetadata) => void
  ) {

    // Trigger Magic link to be sent to user
    await this.magic.auth.loginWithMagicLink({
      email,
    });

    // Handle login; e.g. update the SessionContext, redirect the user
    if (afterLoginSuccess) {
      const authenticated = await this.magic.user.isLoggedIn();
      if (authenticated) {
        const userMetadata = await this.magic.user.getInfo();
        afterLoginSuccess(userMetadata);
      }
    }
  }

  // Method to logout using Magic SDK
  private async logout() {
    return await this.magic.user.logout();
  }

  // Method to check if user is logged in using Magic SDK
  private async isLoggedIn() {
    return await this.magic.user.isLoggedIn();
  }

  public async getAccount() {
    return await this.magic.user.getInfo();
  }

  public async connect(args: {
    email?: string;
    oauthRedirect?: OAuthRedirectConfiguration;
    // Only used when logging in with email
    afterLoginSuccess?: (userMetadata: MagicUserMetadata) => void;
  }) {
    const { email, oauthRedirect, afterLoginSuccess } = args;
    if (email) {
      await this.loginWithEmail(email, afterLoginSuccess);
    } else if (oauthRedirect && !afterLoginSuccess) {
      await this.loginWithOauth(oauthRedirect);
    } else if (oauthRedirect && afterLoginSuccess) {
      const redirectResult = await this.magic.oauth.getRedirectResult();
      const userMetaData = redirectResult.magic.userMetadata;
      afterLoginSuccess(userMetaData);
    } else {
      /* no-op */
    }
  }

  public async isConnected(): Promise<boolean> {
    return await this.isLoggedIn();
  }

  public async disconnect(): Promise<void> {
    await this.logout();
  }
}
