import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SubmitBtn from "@/components/submit-btn/submitBtn";


const Component: React.FC = () => {
    return (
        <div className="grid grid-cols-5 justify-center items-center w-full max-w-xl mx-auto space-x-3 p-5">
            <div className="col-span-4 shadow-lg rounded-full bg-black">
                <Input
                    className=" text-white bg-black rounded-full py-2 px-4 h-12"
                    id="prompt"
                    placeholder="Enter your prompt here..."
                    type="text"
                />
            </div>
            {/* <Button className="col-span-1  rounded-full py-2 px-4 hover:bg-black hover:text-white" variant="ghost">
                Generate
            </Button> */}
            <SubmitBtn />
        </div>
    );
};

export default Component;
