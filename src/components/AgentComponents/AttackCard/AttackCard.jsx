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

const AttackCard = (attack) => {

    return (
        <>
            <Card className="mt-6 w-96 bg-gray-500/40 text-white p-5 rounded shadow-md shadow-secondary/70">
                <CardHeader className="bg-transparent">
                    <Typography variant="h5" className="mb-5 text-light-pink">
                        {/* agent id active attacking */}
                        {attack.attack_name}
                    </Typography>
                </CardHeader>
                <CardBody className="text-text/80">
                    <Typography>
                        {/* agent general information + history */}
                        {attack.attack_type}
                        {attack.agent_id}
                        {attack.created_at}
                        {attack.executed_at}
                    </Typography>
                </CardBody>
                <CardFooter className="mt-5 bg-transparent runded flex row justify-between px-1">
                    Show Logs
                </CardFooter>
            </Card>
        </>
    );
}

export default AttackCard;