import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Loading = () => {
  return (
    <div className="h-screen w-full flex justify-center content-center items-center">
      <AiOutlineLoading3Quarters className="animate-spin text-6xl" />
    </div>
  );
};

export default Loading;
