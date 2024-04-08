import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext/AuthContext";

function WelcomePage() {
  const { isLoggedIn, getEmail } = useContext(AuthContext);
  return (
    <main className="w-full min-h-screen bg-gray-200 flex justify-center items-center">
      {isLoggedIn ? (
        <h1 className="text-5xl mb-16 text-gray-800">
          Welcome <span className="font-bold">{getEmail()}</span>.
        </h1>
      ) : (
        <h1 className="text-6xl mb-16 text-gray-900">You should Log In.</h1>
      )}
    </main>
  );
}

export default WelcomePage;
