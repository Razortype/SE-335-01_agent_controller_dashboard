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

const LiveAgentCard = ({agent}) => {

    const toAgentBase = location.state?.from?.pathname || "/agent/";
    const navigate = useNavigate();

    const statusEmoji = {
        "IDLE": "💤",
        "WORKING": "🛠️",
        "CRASHED": "❌"
    };

    const navigateToUser = (agentId) => {
        navigate(`${toAgentBase}${agentId}`, {replace: true})
    }

    return (
        <Card className="mt-6 w-96 bg-background2 p-5 rounded shadow-md shadow-secondary/70">
            <CardHeader className="bg-background2">
                <Typography variant="h5" color="blue-gray" className="mb-5">
                    <span className="flex row justify-between">
                        <span className="text-md text-text">
                            Agent ({agent.agent_id}): <span className="text-[18px]">{agent.agent_email}</span>
                        </span>
                        <span>
                            <span className="text-sm px-1 rounded flex gap-2">
                                <span className="text-text/80">
                                    Attacking: 
                                </span>
                                <span>
                                    {agent.executing_attack ? "🟢" : "🔴"}
                                </span>
                            </span>
                            <span className="text-[12px]">{agent.executing_attack && agent.executing_attack.attack_job_id.substring(0, 10) + "..."}</span>
                        </span>
                    </span>
                </Typography>
            </CardHeader>
            <CardBody className="text-text/80">
                <Typography>
                    <span>
                        <li><span className="font-bold text-sm">Address</span>: {agent.address}</li>
                        <li>
                            <span className="font-bold text-sm">
                                Status:
                            </span>
                            <span className="px-1 lowercase italic">
                                {agent.agent_status}
                            </span>
                            {statusEmoji[agent.agent_status]}   
                        </li>
                        <li><span className="font-bold text-sm">Connected at</span>: {agent.connected_at ? <ReactTimeAgo date={Date.parse(agent.connected_at)} locale="en-US" /> : "-" } </li>
                        <li>
                            <span className="font-bold text-sm">Session id</span>: {agent.session_id ? agent.session_id.substring(0, 25): "" + "..."}
                        </li>
                        <li>
                            <span className="font-bold text-sm">Token</span>: {agent.using_token ? agent.using_token.substring(0, 32) : "" + "..."}
                        </li>
                        {
                        agent.execution_history?.length ?
                            <>
                                <span>Execution History</span>
                                <span>
                                    {agent.execution_history.map((history) => 
                                    <li key={history.payload_id} className="text-[12px] text-text/75">
                                        {history.attack_job_id.substring(0, 10) + "..."}
                                        || {history.attack_type}
                                        || {<ReactTimeAgo date={Date.parse(history.executed_at)} locale="en-US" />}
                                    </li>)}
                                </span>
                            </>
                        : <span className="mt-2 text-[12px] text-black bg-primary px-1 inline-block font-bold rounded">NO HISTORY</span>
                        }
                        
                    
                    </span>
                </Typography>
            </CardBody>
            <CardFooter className="mt-5 bg-transparent runded flex row justify-between px-1">
                <Button onClick={() => navigateToUser(agent.agent_id)} className="text-text font-bold rounded bg-background uppercase w-[100%] hover:bg-secondary/20 hover:text-white">Agent Detail</Button>
            </CardFooter>
        </Card>
    );

};

export default LiveAgentCard;