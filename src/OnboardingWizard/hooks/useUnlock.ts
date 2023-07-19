import { useContext } from "preact/hooks";
import { UnlockContext } from "../context/UnlockContext";

export const useUnlock = () => useContext(UnlockContext);
