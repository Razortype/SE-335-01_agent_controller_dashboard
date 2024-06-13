import React, { useEffect, useState } from "react";
import useAgent from "../hooks/useAgent";
import axios from "../services/api";
import useAuth from "../hooks/useAuth";
import { useParams } from "react-router-dom";
import { FaCircleInfo } from "react-icons/fa6";
import ReactTimeAgo from "react-time-ago";
import { Button } from "@material-tailwind/react";
import LogModal from "../components/DashboardComponents/Modal/LogModal";

const AgentDetails = () => {
    
    const {id} = useParams();
    const [agentDetail, setAgentDetail] = useState({});
    const [connectedAgentInfo, setConnectedAgentInfo] = useState({});
    const {liveAgentMessage} = useAgent();
    const [isOpen, setIsOpen] = useState(false);
    const [isChanged, setIsChanged] = useState(false);
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
        response.data.data.attacks = response.data.data.attacks.reverse();
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
                    
                    <div className="flex gap-2 items-center">
                        <div className="">
                            <FaCircleInfo className="text-white" />
                        </div>
                        <div>
                            {agentDetail.firstname} {agentDetail.lastname}
                        </div>
                        <div className="flex items-center gap-1 text-light-pink/50">
                            <div className="text-sm">
                                conn:
                            </div>
                            {connectedAgentInfo 
                            ? <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            : <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            }
                        </div>

                    </div>
                    
                </div>

                <div className='section w-[100%] mt-5'>
                    
                    <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-light-pink">
                        <thead className="text-xs text-black/50 uppercase bg-light-pink dark:bg-light-pink">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Attack name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Attack Description
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Attack type
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Create at
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Execute at
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>   
                        </thead>
                        <tbody className="text-light-blue">
                            {agentDetail.attacks && 
                                agentDetail.attacks.map((attack, index) => {

                                    return (
                                        <tr key={index} className="bg-gray-700/50">
                                            <th scope="row" className="px-6 py-4 font-medium text-pink whitespace-nowrap">
                                                {attack.attack_name}
                                            </th>
                                            <td className="px-6 py-4">
                                                {attack.attack_description}
                                            </td>
                                            <td className="px-6 py-4 text-[11px] ">
                                                <span className="bg-light-green text-black p-1 rounded font-bold">
                                                    {attack.attack_type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <ReactTimeAgo date={Date.parse(attack.created_at)} />
                                            </td>
                                            <td className="px-6 py-4">
                                                <ReactTimeAgo date={Date.parse(attack.execute_at)} />
                                            </td>
                                            <td className="px-6 py-4">
                                                <Button onClick={() => setIsOpen(true)} className=" text-black bg-pink uppercase px-2" size="sm" ripple={true} >
                                                    <span className="font-bold">
                                                        LOGS
                                                    </span>
                                                </Button>
                                            </td>
                                            {
                                                isOpen &&
                                                <LogModal
                                                    attack = {attack}
                                                    isOpen={isOpen}
                                                    setIsChanged={setIsChanged}
                                                    onClose={() => setIsOpen(false)}
                                                />
                                            }
         
                                        </tr>
                                    )

                                })
                            }
                            
                        </tbody>
                    </table>
                </div>

                </div>


            </div>
        </div>
        
        </>
    );
}

export default AgentDetails;