import { ComponentChildren, FunctionComponent } from "preact";
import { useCallback } from "preact/hooks";

interface StepHeaderCtaProps {
  onClick: () => void;
  children: ComponentChildren;
}

export const StepHeaderCta: FunctionComponent<StepHeaderCtaProps> = ({
  onClick,
  children
}) => {
  const handleClick = useCallback(
    (e: any) => {
      e.preventDefault()
      onClick();
    },
    [onClick],
  )
  

  return (
    <button
      onClick={handleClick}
      className='step-header-cta'
    >
      {children}
    </button>
  )
}