import { useContext } from "preact/hooks";
import { NetworkContext } from "../context/NetworkContex";

export const useNetwork = () => useContext(NetworkContext);
