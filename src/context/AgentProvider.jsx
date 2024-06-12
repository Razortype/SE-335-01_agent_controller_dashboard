import { createContext, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";

const AgentContext = createContext({});

export const AgentProvider = ({ children }) => {
    const [agents, setAgents] = useState([]);
    const [liveAgentMessage, setLiveAgentMessage] = useState({});
    const [matchedAgents, setMatchedAgents] = useState([]);
    const { auth } = useAuth();

    useEffect(() => {
        // Ensure the access token is available before attempting to connect
        if (!auth.accessToken) return;
      
        const url = `ws://localhost:8080/live-agent?token=${auth.accessToken}`;
        const ws = new WebSocket(url);
      
        // Connection opened
        ws.onopen = () => {
          console.log('WebSocket connection established');
        };
      
        // Listen for messages
        ws.onmessage = (event) => {
          const message = event.data
          
          try {
            let parsedData = JSON.parse(message); 
            setLiveAgentMessage(parsedData);
          } catch (error) {
            console.error('Error parsing message', error);
          }
          
        };
      
        // Listen for possible errors
        ws.onerror = (error) => {
          console.error('WebSocket error: ', error);
        };
      
        // Connection closed
        ws.onclose = () => {
          console.log('WebSocket connection closed');
        };
      
        // Cleanup function to close the WebSocket connection when the component unmounts
        return () => {
          ws.close();
        };
      }, [auth.accessToken]);

    return (
        <AgentContext.Provider value={{ agents, setAgents, liveAgentMessage, setLiveAgentMessage, matchedAgents, setMatchedAgents }}>
            {children}
        </AgentContext.Provider>
    );
};

export default AgentContext;
