import { useState, useCallback } from "react";


export type useVisibilityProps = boolean

const useDialog = (initial: useVisibilityProps = false) => {
  const [isOpened, setVisibility] = useState(initial);
  return {
    isOpened,
    show: useCallback(() => setVisibility(true), []),
    hide: useCallback(() => setVisibility(false), []),
    toggleOpened: useCallback(
      () => setVisibility((current) => !current),
      [],
    ),
  };
};

export default useDialog;
