import { useContext } from "react";
import AgentContext from "../context/AgentProvider";

const useAgent = () => {
    return useContext(AgentContext);
}

export default useAgent;