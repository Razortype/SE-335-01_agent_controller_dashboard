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
        
    }, [liveAgentMessage, agentDetail]);
    
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
        <div className="text-text">
            <h1 className = "text-xxl font-bold">Agent Details</h1>
            {/*Content*/}
            <div className = "p-8">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold">Agent 1 information</h2>
                    <p className="text-gray-400">This agent is curruntlry active</p>
                    <div className="flex flex-col gap-2 p-2 m-2">
                        <div className="bg-background2 p-2 round">
                            {agentDetail ? JSON.stringify(agentDetail) : "No Agent Details"}
                        </div>
                        <div className="bg-background2 p-2 round">
                            {connectedAgentInfo ? JSON.stringify(connectedAgentInfo) : "No Connected Agent Info"}
                        </div>
                    </div>
                </div>
            </div>
            {/*Attack table*/}
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                                <thead>
                                    <tr>
                                        <th scope="col" className="p-4">
                                            {/*<div className="flex items-center">
                                                <input id="checkbox-all" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />*
                                                <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                                            </div>*/}
                                        </th>
                                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                            First name
                                        </th>
                                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                            Last name
                                        </th>
                                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                            Email address
                                        </th>
                                        <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                            Agent
                                        </th>
                                        <th scope="col" className="p-4">
                                            <span className="sr-only">More detail</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <td className="p-4 w-4">
                                            <div className="flex items-center">
                                                {/*<input id="checkbox-table-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />*/}
                                                <label htmlFor="checkbox-table-1" className="sr-only">checkbox</label>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">Apple Imac 27"</td>
                                        <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">Desktop PC</td>
                                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">$1999</td>
                                        <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                                            <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">More detail</a>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <td className="p-4 w-4">
                                            <div className="flex items-center">
                                                {/*<input id="checkbox-table-2" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />*/}
                                                <label htmlFor="checkbox-table-2" className="sr-only">checkbox</label>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">Apple MacBook Pro 17"</td>
                                        <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">Laptop</td>
                                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">$2999</td>
                                        <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                                            <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">More detail</a>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <td className="p-4 w-4">
                                            <div className="flex items-center">
                                                {/*<input id="checkbox-table-3" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />*/}
                                                <label htmlFor="checkbox-table-3" className="sr-only">checkbox</label>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">iPhone 13 Pro</td>
                                        <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">Phone</td>
                                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">$999</td>
                                        <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                                            <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">More detail</a>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <td className="p-4 w-4">
                                            <div className="flex items-center">
                                                {/*<input id="checkbox-table-4" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" >*/}
                                                <label htmlFor="checkbox-table-4" className="sr-only">checkbox</label>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">Apple Magic Mouse 2</td>
                                        <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">Accessories</td>
                                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">$99</td>
                                        <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                                            <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">More detail</a>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <td className="p-4 w-4">
                                            <div className="flex items-center">
                                                {/*<input id="checkbox-table-5" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />*/}
                                                <label htmlFor="checkbox-table-5" className="sr-only">checkbox</label>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">Apple Watch Series 7</td>
                                        <td className="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">Accessories</td>
                                        <td className="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">$599</td>
                                        <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                                            <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">More detail</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AgentDetails;