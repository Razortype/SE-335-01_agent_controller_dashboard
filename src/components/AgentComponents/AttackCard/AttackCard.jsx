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

const AttackCard = ({attack}) => {

    return (
        <>
            <Card className="mt-2 w-96 bg-gray-500/40 text-white p-5 rounded shadow-md shadow-secondary/70">
                <CardHeader className="bg-transparent">
                    <Typography variant="h5" className=" text-light-pink mb-3">
                        {/* agent id active attacking */}
                        <span className="text-lg">{attack.attack_name}</span>
                    </Typography>
                </CardHeader>
                <CardBody className="text-text/80">
                    <Typography>
                        <span className="text-[13px] flex flex-col flex-wrap">
                            <span className="flex gap-1 text-pink text-sm">
                                <span className="text-pink/70">Attack Type:</span>
                                <span>{attack.attack_type}</span>
                            </span>
                            <span className="flex gap-1 text-pink">
                                <span className="text-pink/70">Agent ID:</span>
                                <span>#{attack.agent_id}</span>
                            </span>
                            <span className="flex gap-5">
                                <span className="flex gap-1 text-pink">
                                    <span className="text-pink/70">Created At:</span>
                                    <span>{<ReactTimeAgo date={Date.parse(attack.created_at)} locale="en-US" />}</span>
                                </span>
                                <span className="flex gap-1 text-pink">
                                    <span className="text-pink/70">Execute At:</span>
                                    <span>{<ReactTimeAgo date={Date.parse(attack.execute_at)} locale="en-US" />}</span>
                                </span>
                            </span>
                        </span>
                    </Typography>
                </CardBody>
            </Card>
        </>
    );
}

export default AttackCard;