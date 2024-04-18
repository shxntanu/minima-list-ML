import { Button } from "@/components/ui/button";
import Card from "@/components/card/Card";
import PromptBox from "@/components/prompt-box/prompt-box";
import axios from "axios";

export default function Home() {
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
                <PromptBox />
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
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
            </main>
        </>
    );
}
