import React, {useEffect, useState} from 'react';
import useAgent from '../hooks/useAgent';
import useAuth from '../hooks/useAuth';
import axios from '../services/api';
import ReactTimeAgo from 'react-time-ago';
import { Tooltip } from 'react-tooltip'
import LiveAgentCard from '../components/DashboardComponents/LiveAgentCard/LiveAgentCard';
import Modal from '../components/DashboardComponents/Modal/Modal';


const Dashboard = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [isChanged, setIsChanged] = useState(false);
    const {liveAgentMessage, agents, setAgents} = useAgent();
    const [pageData, setPageData] = useState({
        payloadId: "N/A",
        currentAttackingAgents: "0",
        agentsRatio: `N/A`,
        updatedAt: "-",
    });
    const {auth} = useAuth();

    const fetchAgents = async () => {
        const agentResponse = await axios.get('/api/v1/user/agent', {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`
            }
        });
        return agentResponse.data.data;
    };

    useEffect(() => {
        fetchAgents()
            .then((data) => setAgents(data))
            .catch((err) => console.error(err));     
    } , []);

    useEffect(() => {
        if (liveAgentMessage.payload) {
            setPageData({
                payloadId: (
                    <>
                        <a id="payload-id-tooltip">{liveAgentMessage.payload.payload_id.substring(1,15)}...</a>
                        <Tooltip anchorSelect="#payload-id-tooltip" place="top" effect="solid">
                            {liveAgentMessage.payload.payload_id}
                        </Tooltip>
                    </>
                ),
                currentAttackingAgents: liveAgentMessage?.payload?.agent_session_information.filter(agent => agent.executing_attack).length,
                agentsRatio: `${liveAgentMessage.payload.agent_session_information.length}/${agents.length}`,
                updatedAt: liveAgentMessage.payload ? <ReactTimeAgo date={Date.parse(liveAgentMessage.payload.last_update_date)} locale="en-US"/> : "-"
            });
        }
    }, [liveAgentMessage]);

    return (
        
        <div className='text-text h-[90%]'>
            <div className='mx-12 py-3 h-[100%] max-w'>
                
                <div className='mx-5 p-2 rounded bg-secondary/20 flex justify-between'>

                    <div className='p-3 mx-1 bg-background2 rounded'>
                        <div className='text-sm flex row gap-2'>
                            <p>Payload ID: </p>
                            <span>{pageData.payloadId}</span>
                        </div>
                        <div className='text-sm flex row gap-2'>
                            <p>Attacking Agents:</p>
                            <span>{pageData.currentAttackingAgents}</span>
                        </div>
                    </div>

                    <div className='p-3 mx-1 bg-background2 rounded'>
                        <div className='text-sm flex row gap-2'>
                            <p>Agents: </p>
                            <span>{pageData.agentsRatio}</span>
                        </div>
                        <div className='text-sm flex row gap-2'>
                            <p className=''>Update:</p>
                            <span>{pageData.updatedAt}</span>
                        </div>
                    </div>

                </div>

                <div className='text-left pl-7 my-6'>
                    <h1 className='text-lg font-bold uppercase p-2 inline-block relative'>
                        connected agents
                        <div className='absolute w-[95%] h-[2px] bg-primary/25 rounded top-0 left-2'></div>
                    </h1>
                    <button onClick={() => setIsOpen(true)} className='font-bold bg-primary/25 text-text p-3 ml-5 tranformation translate-y-[-5px] rounded hover:text-white hover:bg-primary/40 transition-all'>
                        Create Attack 
                    </button>
                </div>

                <div className='mx-5 text-text bg-background p-2 rounded'>
                    
                    {liveAgentMessage?.payload?.agent_session_information.length > 0 
                    ? liveAgentMessage.payload.agent_session_information.map((agent) => <LiveAgentCard key={agent.agent_id} agent={agent} />)
                    : <h1 className='text-lg text-center font-bold p-5 m-3 mt-32 shadow-sm shadow-accent bg-background2'>NO AGENT FOUND</h1>}

                </div>

            </div>

            <Modal 
                isOpen={isOpen}
                setIsChanged={setIsChanged}
                onClose={() => setIsOpen(false)}
            ></Modal>

        </div>

    );

}

export default Dashboard;