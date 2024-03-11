import styles from "./Card.module.css";
import { Avatar } from "@nextui-org/react";

function Card() {
    return (
        <div className={`${styles.card} flex flex-row justify-start items-center align-top mt-5`}>
            <Avatar
                isBordered
                radius="sm"
                src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
                className="ml-6 w-16 h-16 text-large"
            />
            <div className="ml-6">
                <div className="flex flex-col justify-start items-start">
                    <h1 className="text-xl font-bold">Closer</h1>
                    <h2 className="text-lg font-medium">The Chainsmokers</h2>
                </div>
                <div className="flex flex-row justify-start items-center">
                    <div className="flex flex-row justify-start items-center">
                        <span className="text-gray-400">Album:</span>
                        <span className="text-gray-600 ml-1">2016-07-29</span>
                    </div>
                    <div className="flex flex-row justify-start items-center ml-4">
                        <span className="text-gray-400">Duration:</span>
                        <span className="text-gray-600 ml-1">3 min 5 sec</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
