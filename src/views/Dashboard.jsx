import React, {useEffect, useState} from 'react';
import useAgent from '../hooks/useAgent';
import useAuth from '../hooks/useAuth';
import axios from '../services/api';
import ReactTimeAgo from 'react-time-ago';
import { Tooltip } from 'react-tooltip'
import Modal from '../components/DashboardComponents/Modal/Modal';
import AgentCard from '../components/AgentComponents/AgentCard/AgentCard';


const Dashboard = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [isChanged, setIsChanged] = useState(false);
    const {liveAgentMessage, agents, setAgents} = useAgent();
    const [pageData, setPageData] = useState({
        payloadId: "N/A",
        currentAttackingAgents: "0",
        agentsRatio: `N/A`,
        updatedAt: "-",
        connectedAgentAmount: "0",
        failPercentage: "%N/A"
    });
    const [matchedAgents, setMatchedAgents] = useState([]);
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
            const connectedAgentAmount = liveAgentMessage.payload.agent_session_information.length;
            const failPercentage = agents.reduce((acc, agent) => {
                const successAttacks = agent.attacks.filter(attack => !attack.crashed).length;
                const totalAttacks = agent.attacks.length;
                return acc + (successAttacks / totalAttacks);
            }, 0) / agents.length;

            setPageData({
                payloadId: (
                    <>
                        <a id="payload-id-tooltip">{liveAgentMessage.payload.payload_id.substring(1,15)}...</a>
                        <Tooltip anchorSelect="#payload-id-tooltip" place="top" effect="solid">
                            {liveAgentMessage.payload.payload_id}
                        </Tooltip>
                    </>
                ),
                connectedAgentAmount: connectedAgentAmount,
                currentAttackingAgents: liveAgentMessage?.payload?.agent_session_information.filter(agent => agent.executing_attack).length,
                agentsRatio: `${connectedAgentAmount}/${agents.length}`,
                updatedAt: liveAgentMessage.payload ? <ReactTimeAgo date={Date.parse(liveAgentMessage.payload.last_update_date)} locale="en-US"/> : "-",
                failPercentage: `${failPercentage * 100}%`
            });

        }
    }, [liveAgentMessage]);

    function getConnectedAgentById(id) { 
      
        var connectedAgent = null;
        liveAgentMessage.payload.agent_session_information.forEach((agent) => {
            if (agent.agent_id === id) {
                connectedAgent = agent;
            }
        });
        return connectedAgent;
  
      }
  
      useEffect(() => {
  
          const matchedArray = []
          agents.forEach(item => {
              matchedArray.push({
                  agent: item,
                  matched: getConnectedAgentById(item.user_id)
              });
          });
          setMatchedAgents(matchedArray);
  
      }, [agents, liveAgentMessage]);

    return (
        
        <div className='text-black h-[90%]'>
            <div className='mx-12 py-3 h-[100%] max-w'>
                
                <div className='section w-[100%] '>
                    <div className="grid grid-cols-4 gap-4">

                        <div className='bg-light-pink/70 border-[2px] border-light-pink rounded-lg font-bold p-4 text-center text-[22px]'>
                            
                            <div className='flex flex-col justify-between px-5 gap-4'>
                                <span className=''>Active Agents</span>
                                <span className='bg-pink px-1 rounded text-light-pink'>{pageData.connectedAgentAmount} socket</span>
                            </div>
                            
                        </div>
                        <div className='bg-light-green/80 border-[2px] border-light-green rounded-lg font-bold p-4 text-center text-[22px]'>
                            <div className='flex flex-col justify-between px-5 gap-4'>
                                <span className=''>Success Rate</span>
                                <span className='text-light-blue bg-black rounded'>{pageData.failPercentage}</span>
                            </div>
                        </div>
                        <div className='bg-light-blue/80 border-[2px] border-light-blue rounded-lg font-bold p-4 text-center text-[22px]'>
                            <div className='flex flex-col justify-between px-5'>
                                <span className=''>Announcement</span>
                                <p className='text-[10px] text-gray-600'>The System Virus Builder has been successfully completed and upgraded to a customized, agent-based version!</p>
                            </div>
                        </div>
                        <div className='bg-pink/80 font-bold border-[2px] border-pink rounded-lg p-4 text-center text-[22px]'>
                            <div className='flex flex-col justify-between px-5 items-center'>
                                <h1>Available Attacks</h1>
                                <div className='flex w-[200px] justify-between'>
                                    <div className='bg-light-blue/70 text-light-pink p-2 rounded-lg'>
                                        <p className='text-[9px]'>Cookie Fetching</p>
                                    </div>
                                    <div className='bg-light-blue/70 text-light-pink p-2 rounded-lg'>
                                        <p className='text-[9px]'>File/Folder Discovery</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className='section w-[100%] text-white mt-5'>

                    <div className="grid grid-cols-12 gap-4">
                        
                        <div className='col-span-8'>
                            <h1 className='ml-1 text-[1.3em]'>
                                <span className='text-gray-500/85'>Dis</span>
                                <span className='font-extrabold'>Connected</span>
                                <span className='font-ligth'>Agents</span>
                            </h1>
                            {/* connected and disconnected agent information */}

                            <div className='grid-cols-2'>

                                {/* map through data */}
                                { matchedAgents.map((pair, index) => {
                                    return (
                                        <AgentCard key={index} agent={pair.agent} matched={pair.matched} />
                                    );
                                })}
                                
                            </div>

                        </div>

                        <div className='bg-red-yellow col-span-4'>
                            <h1 className='ml-1 text-[1.3em] text-black font-semibold inline-block bg-light-pink px-2 rounded'>Attack History</h1>
                            {/* previos attack executed today and yesterday */}

                        </div>
                        
                    </div>

                </div>

            </div>

        </div>

    );

}

export default Dashboard;