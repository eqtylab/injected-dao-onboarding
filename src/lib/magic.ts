import { EthNetworkName } from "magic-sdk";
import { InstanceWithExtensions, SDKBase } from "@magic-sdk/provider";
import { OAuthExtension, OAuthRedirectConfiguration } from "@magic-ext/oauth";

type SupportedExtension = OAuthExtension;
export type MagicType = InstanceWithExtensions<SDKBase, SupportedExtension[]>;
export type MagicConfig = {
  apiKey: string;
  network: EthNetworkName;
  oauthRedirects: OAuthRedirectConfiguration[];
};
