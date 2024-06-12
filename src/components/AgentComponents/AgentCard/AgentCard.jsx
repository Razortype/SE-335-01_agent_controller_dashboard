import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import { FaPlug, FaUnlink, FaCrosshairs, FaPauseCircle, FaClock, FaCog, FaExclamationTriangle } from 'react-icons/fa';

const statusIcon = {
  "IDLE": <FaClock color="gray" title="Idle" />,
  "WORKING": <FaCog color="green" title="Working" />,
  "CRASHED": <FaExclamationTriangle color="red" title="Crashed" />
};


const AgentCard = ({ agent, matched }) => {
    
    const navigate = useNavigate();

    return (
        <>
            <Card className="mt-6 w-96 bg-gray-500/40 text-white p-5 rounded shadow-md shadow-secondary/70">
                <CardHeader className="bg-transparent">
                    <Typography variant="h5" className="mb-5 text-light-pink">
                        {/* agent id active attacking */}
                        
                        <span className="flex text-[18px] justify-between items-center">
                            <span className="underline">
                                Agent (#{agent.user_id})
                            </span>

                            <span className="flex text-pink/50 flex-row text-[16px] gap-2">
                                <span className="">
                                    <span>{matched !== null ? <FaPlug className="text-pink" /> : <FaUnlink />}</span>
                                </span>
                                <span className="">
                                    <span>{matched?.executing_attack !== null ? <FaCrosshairs className="text-pink" /> : <FaPauseCircle />}</span>
                                </span>
                            </span>

                        </span>

                    </Typography>
                </CardHeader>
                <CardBody className="text-text/80">
                    <Typography>
                        {/* agent general information + history */}
                        
                        <span className="flex flex-col text-light-clue gap-1">
                            <span>
                                <span className="font-bold">Email:</span> {agent.email}
                            </span>
                            <span>
                                <span className="font-bold">Full Name*:</span> {agent.firstname} {agent.lastname}
                            </span>

                            {matched !== null && 
                                <>
                                    <span className="flex gap-1 items-center">
                                        <span className="font-bold">Status:</span> {matched.agent_status} {statusIcon[matched.agent_status]} <span className="text-[8px]">{matched?.executing_attack ? <>[{matched?.executing_attack?.attack_type}]</> : ""}</span>
                                    </span>
                                    <span>
                                        <span className="font-bold">Address (IP):</span> {matched.address}
                                    </span>
                                    <span className="mt-1">
                                        {matched?.execution_history?.length <= 0  ?
                                            <span className="text-sm bg-pink p-2 text-black font-bold rounded">No History</span>
                                            : 
                                            <span className="mt-2">
                                                <span className="font-bold text-light-pink/80">Connection History:</span>
                                                <span className="text-[12px]">
                                                    {matched?.execution_history?.map((history, index) => (
                                                        <li key={index}>
                                                            {history.attack_job_id.substring(0,10)+"..."}
                                                            ||{history.attack_type}
                                                            ||<ReactTimeAgo date={Date.parse(history.executed_at)} locale="en-US" className="text-gray-300" />
                                                        </li>
                                                    ))}
                                                </span>
                                            </span>
                                        }
                                    </span>
                                </>
                            }
                        </span>
                        
                    </Typography>
                </CardBody>
                <CardFooter className="mt-5 bg-transparent runded flex row justify-between px-1">
                    {/* connected at and agent detail */}
                    <span className="flex flex-row justify-between items-center w-[100%]">
                        
                        {
                            matched?.connected_at &&

                            <span className="text-sm  flex gap-1">
                                <span className="text-gray-400">Connected At:</span>
                                <ReactTimeAgo date={Date.parse(matched.connected_at)} locale="en-US" className="text-gray-300" />
                            </span>
                        }

                        <Button
                            className="text-light-pink bg-pink/50"
                            size="md"
                            ripple={true}
                            onClick={() => navigate(`/agent/${agent.user_id}`)}
                        >
                            View Details
                        </Button>
                    </span>
                    
                </CardFooter>
            </Card>
        </>
    );

}

export default AgentCard;