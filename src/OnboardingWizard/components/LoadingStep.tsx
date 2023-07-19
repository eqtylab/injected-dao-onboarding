import { FunctionComponent } from "preact";
import { StepContainer } from "./StepContainer";
import { useNetwork } from "../hooks/useNetwork";
import { Spinner } from "./Spinner";

export const LoadingStep: FunctionComponent = () => {
  return (
    <StepContainer
      header={{
        title: "Checking connection",
        description: "One moment while we look for your account..."
      }}
    >
      <Spinner />
    </StepContainer>
  );
};
