import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { createPortal } from "react-dom";
import axios from "../../../services/api";
import { toast } from "react-toastify";

import { IoCloseCircleOutline } from "react-icons/io5";
import useAgent from "../../../hooks/useAgent";

export default function Modal({ isOpen, onClose, setIsChanged }) {

    const [formData, setFormData] = useState({
            "attack_name": "Attack #" + Math.floor(Math.random() * 1000),
            "attack_description": "Attack Description",
            "attack_type": "COOKIE_DISCOVERY",
            "execute_at": new Date().toISOString().slice(0, 16),
            "agent_id": 0
        });
    const [ attackType, setAttackType ] = useState([]);
    const [loading, setLoading] = useState(false);
    const { auth } = useAuth();
    const { agents, liveAgentMessage } = useAgent();

    const fetchEnum = async (typeName) => {
        const response = await axios.get(`/api/v1/enum/${typeName}`, {
            headers: {
                Authorization: `Bearer ${auth.accessToken}`,
            },
        });
        return response.data.data;
    }

    useEffect(() => {
        setIsChanged(false);
        fetchEnum("attack-type")
            .then((data) => setAttackType(data))
            .catch((err) => console.error(err));
    }, []);

    if (!isOpen) return null;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value,
        });
    };

    const handleAttackSave = async () => {

        setLoading(true);
        if (!formData.agent_id === 0) {
            setLoading(false);
            return toast.error("Please select an agent");
        }
        if (!formData.agent_id && formData.agent_id === "Select An Agent") {
            setLoading(false)
            return toast.error("Please select an agent")
        }

        if (!formData.attack_type && formData.attack_type === "Select Attack Type") {
            setLoading(false);
            return toast.error("Please select an attack type");
        }

        try {
            const response = await axios.post(
                "/api/v1/attack-job",
                {
                    attack_name: formData.attack_name,
                    attack_description: formData.attack_description,
                    attack_type: formData.attack_type,
                    execute_at: formData.execute_at,
                    agent_id: formData.agent_id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${auth.accessToken}`,
                    },
                }
            );
            if (response.status === 200) {
                toast.success("Attack created successfully");
                setIsChanged(true);
                onClose();
            }
        } catch (error) {
            toast.error("Failed to create attack");
            setLoading(false);
        }
        
    }

    function convertToTitleCase(str) {
      let lowerCaseStr = str.toLowerCase();
      let words = lowerCaseStr.split('_');
      let capitalizedWords = words.map(word => {
          return word.charAt(0).toUpperCase() + word.slice(1);
      });
      let titleCaseStr = capitalizedWords.join(' ');
      return titleCaseStr;
    }
  

    return createPortal(
        <div className="fixed z-[10] top-0 left-0 w-full h-full bg-[rgba(0,0,0,.5)] overflow-hidden">
          <div className="modal-container bg-black text-text rounded mx-auto my-[6%] p-[30px] py-5 w-[400px] relative flex flex-col gap-8">
            
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-2xl">Create Attack</h2>
              <IoCloseCircleOutline
                onClick={onClose}
                className="w-[1.7em] h-[1.7em] cursor-pointer"
              />
          </div>
          <div className="inputs flex flex-col gap-6">

            <input 
              placeholder="Attack Name"
              className="bg-transparent border border-text/60 rounded px-3 py-2 focus:outline-none"
              name="attack_name"
              value={formData.attack_name}
              onChange={handleInputChange}
            />
            <textarea 
              placeholder="Attack Description"
              className="bg-transparent border border-text/60 rounded px-3 py-2 focus:outline-none" 
              name="attack_description"
              value={formData.attack_description}
              onChange={handleInputChange}
            />

            <div className="relative">
              <select
                name = "agent_id"
                id = "agent_id"
                className="!bg-transparent cursor-pointer !border !border-text/60 rounded px-3 py-2 pr-12 focus:outline-none appearance-none -webkit-appearance-none w-full h-full"
                value={formData.agent_id}
                onChange={handleInputChange}
              >
                <option defaultValue>Select An Agent</option>
                {liveAgentMessage?.payload?.agent_session_information.map((agent, index) => (
                  <option key={index} value={agent.agent_id}>{agent.agent_email}</option>
                ))}
              </select>
            </div>
            
            <div className="relative">

              <select
                name = "attack_type"
                id = "attack_type"
                className="!bg-transparent cursor-pointer !border !border-text/60 rounded px-3 py-2 pr-12 focus:outline-none appearance-none -webkit-appearance-none w-full h-full"
                value={formData.attack_type}
                onChange={handleInputChange}
              >
                <option defaultValue>Select Attack Type</option>
                {attackType.map((attack) => (
                    <option key={attack} value={attack}>{convertToTitleCase(attack)}</option>
                ))}
              </select>

            </div>

            <input 
              type="datetime-local"
              placeholder="Executed At"
              className="bg-transparent border border-text/60 rounded px-3 py-2 focus:outline-none"
              name="execute_at"
              value={formData.execute_at}
              onChange={handleInputChange}
            />

            <button
              onClick={handleAttackSave}
              className="w-full font-bold border rounded hover:text-pink hover:bg-light-pink transition-all py-2 hover:"
            >
              Create
            </button>

          </div>

          </div>
        </div>,
        document.getElementById("modal")
      );

}