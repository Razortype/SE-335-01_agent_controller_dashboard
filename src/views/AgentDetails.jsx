import React, { useEffect, useState } from "react";
import useAgent from "../hooks/useAgent";
import axios from "../services/api";
import useAuth from "../hooks/useAuth";
import { useParams } from "react-router-dom";

const AgentDetails = () => {
    
    const {id} = useParams();
    const [agentDetail, setAgentDetail] = useState({});
    const [connectedAgentInfo, setConnectedAgentInfo] = useState({});
    const {liveAgentMessage} = useAgent();
    const {auth} = useAuth();

    useEffect(() => {
        
        if (liveAgentMessage.payload) {
            const connectedAgent = liveAgentMessage
                .payload
                .agent_session_information
                .find((agent) => agent.agent_id === parseInt(id));
            setConnectedAgentInfo(connectedAgent);
        }
        
    }, [liveAgentMessage]);
    
    const fetchAgentById = async (id) => {
        const response = await axios.get(`/api/v1/user/agent/${id}`, {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            },
        });
        return response.data.data;
    };
    
    useEffect(() => {
        fetchAgentById(id)
            .then((data) => setAgentDetail(data))
            .catch((err) => console.error(err));
    }, []);

    return ( 
        <>
        
        <div className='text-light-pink h-[90%]'>
            <div className='mx-12 py-3 h-[100%] max-w'>

                <div className='section w-[100%] '>
                    
                    <div className="grid grid-cols-12">

                        <div className="col-span-5 overflow-auto">
                            
                            <div className="p-3 w-[100%]">

                                <div className="flex flex-col gap-4">

                                    <div className="flex flex-col">
                                        <h1>Agent Info</h1>

                                        <div>
                                            <span>Agent Id</span>
                                            <span>{agentDetail.user_id}</span>
                                        </div>
                                        <div>
                                            <span>Firstname</span>
                                            <span>{agentDetail.firstname}</span>
                                        </div>
                                        <div>
                                            <span>Lastname</span>
                                            <span>{agentDetail.lastname}</span>
                                        </div>
                                        <div>
                                            <span>Email</span>
                                            <span>{agentDetail.email}</span>
                                        </div>
                                        <div>
                                            <span>Created At</span>
                                            <span>{agentDetail.created_at}</span>
                                        </div>

                                    </div>


                                    {connectedAgentInfo &&
                                    
                                    <div className="flex flex-col gap-4 mt-5">
                                        <h1>Socket Info</h1>

                                        <div>
                                            <span>Address</span>
                                            <span>{connectedAgentInfo.address}</span>
                                        </div>
                                        <div>
                                            <span>Session ID</span>
                                            <span>{connectedAgentInfo.session_id}</span>
                                        </div>
                                        <div>
                                            <span>Agent Status</span>
                                            <span>{connectedAgentInfo.agent_status}</span>
                                        </div>
                                        <div>
                                            <span>Using Token</span>
                                            <span>{connectedAgentInfo.using_token}</span>
                                        </div>

                                    </div>

                                    } 

                                </div>

                            </div>
                            
                        </div>
                        
                        
                        <div className="col-span-7">test</div>

                    </div>
                    
                </div>


            </div>
        </div>
        
        </>
    );
}

export default AgentDetails;