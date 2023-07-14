import { useContext } from "preact/hooks";
import { AccountContext } from "../context/AccountContext";

export const useAccount = () => useContext(AccountContext);
