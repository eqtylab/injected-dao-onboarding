import { FunctionComponent } from "preact";
import { useNetwork } from "../hooks/useNetwork";
import { StepContainer } from "./StepContainer";
import { ConnectWithEmailButton } from "./ConnectWithEmailButton";
import { ConnectWithOauthButton } from "./ConnectWithOauthButton";
import { ConnectWithWeb3Button } from "./ConnectWithWeb3Button";

export const PreConnectStep: FunctionComponent = () => {
  const { oauthRedirects } = useNetwork();

  return (
    <StepContainer
      header={{
        title:'Connect your account',
        description: 'How do you wish to connect to the DAO?'
      }}
    >
      <div className="step-ctas-container">
        <ConnectWithEmailButton />
        {oauthRedirects.map((props) => (
          <ConnectWithOauthButton key={props.provider} {...props} />
        ))}
        <ConnectWithWeb3Button />
      </div>
    </StepContainer>
  );
};
