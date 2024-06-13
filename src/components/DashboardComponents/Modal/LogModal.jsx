import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { createPortal } from "react-dom";
import axios from "../../../services/api";
import { toast } from "react-toastify";
import { Button, IconButton, Typography, Tooltip } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

import { IoCloseCircleOutline } from "react-icons/io5";
import { FaCheckCircle, FaBan } from 'react-icons/fa';
import { FaCircle } from "react-icons/fa";
import { FaExclamationCircle } from "react-icons/fa";
import ReactTimeAgo from "react-time-ago";


export default function LogModal({attack, isOpen, onClose, setIsChanged }) {

    const [logBlock, setLogBlock] = useState({});
    const [logs, setLogs] = useState([]);
    const [pageIndex, setPageIndex] = useState(1);
    const [maxPageSize, setMaxPageSize] = useState(0);
    const pageSize = 14;
    const { auth } = useAuth();

    const LogLevel = {
        DEBUG: <span className="bg-gray-400 p-1 rounded">Debug</span>, // Light gray
        INFO: <span className="bg-green-500 p-1 rounded">Info</span>, // Black
        WARN: <span className="bg-orange-500 p-1 rounded">Warning</span>, // Orange
        ERROR: <span className="bg-red-500 p-1 rounded">Error</span>, // Red
        CRITICAL: <span className="bg-red-800 p-1 rounded">Critical</span>, // Dark red
      };

    const next = () => {
        if (pageIndex === maxPageSize) return;
        setPageIndex(pageIndex + 1);
        updateLogsByBlockId();
    }
    const prev = () => {
        if (pageIndex === 0) return;
        setPageIndex(pageIndex - 1);
        updateLogsByBlockId();
    }

    const fetchLogBlock = async(log_block_id) => {
        const response = await axios.get(`/api/v1/log/block/${log_block_id}`, {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            },
        });
        return response.data.data;
    }

    const fetchLogsByBlockId = async(log_block_id) => {
        const response = await axios.get(`/api/v1/log/block/${log_block_id}/log?page=${pageIndex-1}&size=${pageSize}`, {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            },
        });
        return response.data.data;
    }

    function formatTime(dateString) {
        // Parse the date string into a Date object
        const date = new Date(dateString);
    
        // Extract hour, minute, and second from the Date object
        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');
        const second = String(date.getSeconds()).padStart(2, '0');
    
        // Format the time string
        const formattedTime = `${hour}:${minute}:${second}`;
    
        return formattedTime;
    }

    const updateLogBlock = async () => {
        fetchLogBlock(attack.log_block_id)
            .then((data) => {
                setLogBlock(data);
                setMaxPageSize(Math.ceil(data.log_amount / pageSize));
            })
            .catch((err) => console.error(err));
    }

    const updateLogsByBlockId = async () => {
        fetchLogsByBlockId(attack.log_block_id, pageIndex, pageSize)
            .then((data) => setLogs(data))
            .catch((err) => console.error(err));
    }

    useEffect(() => {
        updateLogBlock();
        updateLogsByBlockId();
    }, []);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard");
    }

    return createPortal(
        <div className="fixed z-[10] top-0 left-0 w-full h-full bg-[rgba(0,0,0,.1)] overflow-hidden">
            <div className="modal-container relative bg-black text-text rounded mx-auto my-[6%] p-[30px] py-5 w-[800px] h-[600px] flex flex-col gap-8">
                
                <div className="flex items-center justify-between">
                    <div className="">
                        <div className="flex gap-3 items-end">
                            <h2 className="font-bold text-2xl">Log Block</h2>
                            <span className="flex gap-1 items-center">
                                <span className="text-sm text-white/60">acpt:</span>
                                {attack.accepting_log ? <FaCheckCircle size={10} className="text-green-500" /> : <FaBan size={10} className="text-red-500" />}
                                <span className="text-light-pink/80 text-[10px]">[{logBlock.log_amount}]</span>
                            </span>
                        </div>
                        <span className="text-sm text-gray-300/70 flex gap-1 items-center">
                            <span>#{attack.log_block_id}</span>
                        </span>
                        {/* <hr className= ""/> */}
                    </div>
                <IoCloseCircleOutline
                    onClick={onClose}
                    className="w-[1.7em] h-[1.7em] cursor-pointer"
                />
                </div>

                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-[10px] text-gray-900 uppercase dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-1 py-1">
                                    ID
                                </th>
                                <th scope="col" className="px-1 py-1">
                                    Level
                                </th>
                                <th scope="col" className="px-1 py-1">
                                    Type
                                </th>
                                <th scope="col" className="px-1 py-1">
                                    Text
                                </th>
                                <th scope="col" className="px-1 py-1">
                                    Created
                                </th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {logs &&
                                logs.map((log, index) => {
                                    return (
                                        <tr key={index} className= "bg-black">
                                            <th scope="row" className="px-1 py-1 font-medium whitespace-nowrap text-white/35">
                                                <Tooltip content={log.log_id} className=" z-50">
                                                    {log.log_id.substring(0, 6) + "..."}
                                                </Tooltip>
                                            </th>
                                            <td className="text-black text-[10px] font-bold">
                                                {LogLevel[log.log_level]}
                                            </td>
                                            <td className="px-1 py-1">
                                                {log.log_type === "INFO" 
                                                ? <FaCircle size={20} className="text-blue-500" /> 
                                                : <FaExclamationCircle size={20} className="text-red-500" />
                                                }
                                            </td>
                                            <td className="px-1 py-1">
                                                <Tooltip 
                                                content={log.log_text}
                                                className="px-3 py-2 z-50 font-bold bg-light-pink max-w-[50%] text-wrap">
                                                    <span
                                                    onClick={() => copyToClipboard(log.log_text)}
                                                    >
                                                        {log.log_text.length > 60 ? log.log_text.substring(0, 60) + "..." : log.log_text}
                                                    </span>
                                                </Tooltip>
                                            </td>
                                            <td className="px-1 py-1 text-white">
                                                {/* date parse created at and show hours */}
                                                {formatTime(log.created_at)}
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>

                <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2">
                    <div className="flex items-center gap-8 text-white">
                        
                        <Button
                            className="disabled:opacity-50"
                            onClick={prev}
                            disabled={pageIndex === 1}
                            color="pink"
                            size="sm"
                        >
                            <ArrowLeftIcon strokeWidth={2} className="h-5 w-5 bg-pink text-black p-1 rounded-full" />
                        </Button>
                        <span>
                            Page <strong className="text-pink">{pageIndex}</strong> of{" "}
                            <strong className="text-pink">{maxPageSize}</strong>
                        </span>
                        <Button
                            className="disabled:opacity-50"
                            onClick={next}
                            disabled={pageIndex === maxPageSize}
                            color="pink"
                            size="sm"
                        >
                            <ArrowRightIcon strokeWidth={2} className="h-5 w-5 bg-pink text-black p-1 rounded-full" />
                        </Button>

                        {/* <IconButton
                            className="text-pink"
                            size="sm"
                            onClick={prev}
                            disabled={pageIndex === 1}
                        >
                            
                        </IconButton>
                        <Typography color="gray" className="font-normal">
                            
                        </Typography>
                        <IconButton
                            className="text-pink"
                            size="sm"
                            onClick={next}
                            disabled={pageIndex === maxPageSize}
                        >
                            <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                        </IconButton> */}
                    </div>
                </div>
        </div>
        </div>,
        document.getElementById("log-modal")
    );

}