import { FunctionComponent } from "preact";
import { StepContainer } from "./StepContainer";
import { useNetwork } from "../hooks/useNetwork";
import { useAccount } from "../hooks/useAccount";
import { useWizardStep } from "../hooks/useWizardStep";
import { StepHeaderCta } from "./StepHeaderCta";
import { useCallback } from "preact/hooks";
import { Spinner } from "./Spinner";

export const ViewAccountStep: FunctionComponent = () => {
  const { network } = useNetwork();
  const { setStep } = useWizardStep();
  const { account, loading, setAccount } = useAccount();

  const handleDisconnect = useCallback(async () => {
    await setAccount(null);
    await network.disconnect();
    setStep("pre-connect");
  }, [setStep, setAccount, network]);

  console.log({ account })

  return (
    <StepContainer
      header={{
        title: "View account",
        description: "These are your account details",
        cta: (
          <StepHeaderCta onClick={handleDisconnect}>Disconnect</StepHeaderCta>
        ),
      }}
    >
      {loading && <Spinner />}
      {account?.email && (
        <div className="form-control">
          <label className="form-label">Email</label>
          <p>{account.email}</p>
        </div>
      )}
      {account?.publicAddress && (
        <div className="form-control">
          <label className="form-label">Address</label>
          <a
            href={`https://${
              network.networkName === "goerli" ? "goerli." : ""
            }etherscan.io/address/${account.publicAddress}`}
            target="_blank"
          >
            <code>
              {account.publicAddress.slice(0, 8)}...
              {account.publicAddress.slice(account.publicAddress.length - 5)}
            </code>
          </a>
        </div>
      )}
    </StepContainer>
  );
};
