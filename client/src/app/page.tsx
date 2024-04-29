"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import Card from "@/components/card/Card";
import axios from "axios";

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface Track {
    name: string;
    artist: string;
    album: string;
    image: string;
    externalURL: string;
}

export default function Home() {
    const [inputText, setInputText] = useState("");
    const [year, setYear] = useState(new Date().getFullYear());
    const [recommendations, setRecommendations] = useState<Track[]>([]);

    //Request spotify Access token
    useEffect(() => {
        const requestToken = async () => {
            try {
                const response = await axios.post(
                    "https://accounts.spotify.com/api/token",
                    {
                        grant_type: "client_credentials",
                        client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
                        client_secret:
                            process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET,
                    },
                    {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                    }
                );

                process.env.NEXT_PUBLIC_SPOTIFY_AUTHTOKEN =
                    response.data.access_token;
            } catch (error) {
                console.error(error);
            }
        };

        requestToken();
    }, []);

    const handleSuggest = async () => {
        setRecommendations([]);

        const data = [
            {
                name: inputText,
                year: year,
            },
        ];

        try {
            const response = await axios.post(`${backendURL}/recommend`, data);

            console.log("RESPONSE: ", response);

            const modelRecs: {
                name: string;
                year: number;
                artists: string[];
            }[] = JSON.parse(response.data);

            console.log("MODEL RECOMMENDATIONS: ", modelRecs);

            modelRecs.forEach(async (recommendation) => {
                console.log("RECOMMENDATION: ", recommendation);
                const queryText = `${
                    recommendation.name
                } artist:${recommendation.artists.join(" ")}`;

                console.log("Query Text: ", queryText);
                const response = await axios.get(
                    `https://api.spotify.com/v1/search?q=${encodeURIComponent(
                        queryText
                    )}&type=track&limit=1`,
                    {
                        headers: {
                            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SPOTIFY_AUTHTOKEN}`,
                        },
                    }
                );

                const track = response.data.tracks.items[0];

                const trackData = {
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    image: track.album.images[0].url,
                    externalURL: track.external_urls.spotify,
                };

                setRecommendations((prev) => [...prev, trackData]);
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="w-full h-full bg-white text-black">
                <header className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold">minima-List</span>
                    </div>
                </header>
            </div>

            <main className="flex min-h-screen flex-col items-center p-24">
                <div className="grid grid-cols-7 justify-center items-center w-full max-w-xl mx-auto space-x-3 px-5 pt-5">
                    <div className="col-span-5 shadow-lg rounded-full">
                        <Input
                            className="  py-2 px-4 h-12"
                            placeholder="Name the song that's stuck in your head..."
                            value={inputText}
                            type="text"
                            onChange={(e) => setInputText(e.target.value)}
                        />
                    </div>
                    <div className="col-span-2 shadow-lg rounded-full">
                        <Input
                            className="  py-2 px-4 h-12"
                            placeholder="Year"
                            type="number"
                            value={year}
                            defaultValue={year}
                            onChange={(e) => setYear(parseInt(e.target.value))}
                            onKeyPress={(e) => e.preventDefault()}
                            onKeyDown={(e) =>
                                e.key === "Backspace" && e.preventDefault()
                            }
                        />
                    </div>
                </div>
                <div className="pt-3 pb-10">
                    <button
                        className="border text-gray-50  duration-300 relative group cursor-pointer   overflow-hidden h-12 w-48 rounded-lg bg-neutral-800 p-2  font-extrabold hover:bg-sky-700 col-span-2"
                        onClick={handleSuggest}
                    >
                        <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-16 h-16 rounded-full group-hover:scale-150  duration-700 right-12 top-12 bg-yellow-500"></div>
                        <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-12 h-12 rounded-full group-hover:scale-150  duration-700 right-20 -top-6 bg-orange-500"></div>
                        <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-8 h-8   rounded-full group-hover:scale-150  duration-700 right-32 top-6 bg-pink-500"></div>
                        <div className="absolute group-hover:-top-1 group-hover:-right-2 z-10 w-4 h-4   rounded-full group-hover:scale-150  duration-700 right-2 top-12 bg-red-600"></div>
                        <p className="z-10 absolute bottom-2 left-2">
                            Suggest?!
                        </p>
                    </button>
                </div>
                <div className="grid grid-cols-5 space-x-2">
                    <button className="relative border hover:border-green-600 duration-500 group cursor-pointer text-sky-50  overflow-hidden h-14 w-56 rounded-md bg-green-800 p-2 flex justify-center items-center font-extrabold">
                        <div className="absolute z-10 w-48 h-48 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-green-900 delay-150 group-hover:delay-75"></div>
                        <div className="absolute z-10 w-40 h-40 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-green-800 delay-150 group-hover:delay-100"></div>
                        <div className="absolute z-10 w-32 h-32 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-green-700 delay-150 group-hover:delay-150"></div>
                        <div className="absolute z-10 w-24 h-24 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-green-600 delay-150 group-hover:delay-200"></div>
                        <div className="absolute z-10 w-16 h-16 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-green-500 delay-150 group-hover:delay-300"></div>
                        <p className="z-10">Happy</p>
                    </button>

                    <button className="relative border hover:border-gray-600 duration-500 group cursor-pointer text-sky-50  overflow-hidden h-14 w-56 rounded-md bg-gray-800 p-2 flex justify-center items-center font-extrabold">
                        <div className="absolute z-10 w-48 h-48 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-gray-900 delay-150 group-hover:delay-75"></div>
                        <div className="absolute z-10 w-40 h-40 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-gray-800 delay-150 group-hover:delay-100"></div>
                        <div className="absolute z-10 w-32 h-32 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-gray-700 delay-150 group-hover:delay-150"></div>
                        <div className="absolute z-10 w-24 h-24 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-gray-600 delay-150 group-hover:delay-200"></div>
                        <div className="absolute z-10 w-16 h-16 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-gray-500 delay-150 group-hover:delay-300"></div>
                        <p className="z-10">Sad</p>
                    </button>

                    <button className="relative border hover:border-red-600 duration-500 group cursor-pointer text-sky-50  overflow-hidden h-14 w-56 rounded-md bg-red-800 p-2 flex justify-center items-center font-extrabold">
                        <div className="absolute z-10 w-48 h-48 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-red-900 delay-150 group-hover:delay-75"></div>
                        <div className="absolute z-10 w-40 h-40 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-red-800 delay-150 group-hover:delay-100"></div>
                        <div className="absolute z-10 w-32 h-32 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-red-700 delay-150 group-hover:delay-150"></div>
                        <div className="absolute z-10 w-24 h-24 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-red-600 delay-150 group-hover:delay-200"></div>
                        <div className="absolute z-10 w-16 h-16 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-red-500 delay-150 group-hover:delay-300"></div>
                        <p className="z-10">Angry</p>
                    </button>

                    <button className="relative border hover:border-pink-600 duration-500 group cursor-pointer text-sky-50  overflow-hidden h-14 w-56 rounded-md bg-pink-800 p-2 flex justify-center items-center font-extrabold">
                        <div className="absolute z-10 w-48 h-48 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-pink-900 delay-150 group-hover:delay-75"></div>
                        <div className="absolute z-10 w-40 h-40 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-pink-800 delay-150 group-hover:delay-100"></div>
                        <div className="absolute z-10 w-32 h-32 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-pink-700 delay-150 group-hover:delay-150"></div>
                        <div className="absolute z-10 w-24 h-24 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-pink-600 delay-150 group-hover:delay-200"></div>
                        <div className="absolute z-10 w-16 h-16 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-pink-500 delay-150 group-hover:delay-300"></div>
                        <p className="z-10">Love</p>
                    </button>

                    <button className="relative border hover:border-sky-600 duration-500 group cursor-pointer text-sky-50  overflow-hidden h-14 w-56 rounded-md bg-sky-800 p-2 flex justify-center items-center font-extrabold">
                        <div className="absolute z-10 w-48 h-48 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-sky-900 delay-150 group-hover:delay-75"></div>
                        <div className="absolute z-10 w-40 h-40 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-sky-800 delay-150 group-hover:delay-100"></div>
                        <div className="absolute z-10 w-32 h-32 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-sky-700 delay-150 group-hover:delay-150"></div>
                        <div className="absolute z-10 w-24 h-24 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-sky-600 delay-150 group-hover:delay-200"></div>
                        <div className="absolute z-10 w-16 h-16 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-sky-500 delay-150 group-hover:delay-300"></div>
                        <p className="z-10">Focused</p>
                    </button>
                </div>
                {recommendations.length > 0 &&
                    recommendations.map((recommendation, index) => (
                        <Card
                            key={index}
                            name={recommendation.name}
                            artist={recommendation.artist}
                            album={recommendation.album}
                            image={recommendation.image}
                            externalURL={recommendation.externalURL}
                        />
                    ))}
            </main>
        </>
    );
}
