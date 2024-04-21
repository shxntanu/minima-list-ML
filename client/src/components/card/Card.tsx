import styles from "./Card.module.css";
import { Avatar } from "@nextui-org/react";
import { Link } from "@nextui-org/react";

interface CardProps {
    name: string;
    artist: string;
    album: string;
    image: string;
    externalURL: string;
}

const Card: React.FC<CardProps> = ({
    name,
    artist,
    album,
    image,
    externalURL,
}) => {
    return (
        <Link href={externalURL}>
            <div
                className={`${styles.card} flex flex-row justify-start items-center align-top mt-5`}
            >
                <Avatar
                    isBordered
                    radius="sm"
                    src={image}
                    className="ml-6 w-16 h-16 text-large"
                />
                <div className="ml-6">
                    <div className="flex flex-col justify-start items-start">
                        <h1 className="text-xl font-bold">{name}</h1>
                        <h2 className="text-lg font-medium">{artist}</h2>
                    </div>
                    <div className="flex flex-row justify-start items-center">
                        <div className="flex flex-row justify-start items-center">
                            <span className="text-gray-400">Album:</span>
                            <span className="text-gray-600 ml-1">{album}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Card;
