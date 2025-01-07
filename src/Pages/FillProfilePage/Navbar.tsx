import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/joy/Button";
import { useAuth } from "../../utils/AuthContext";
import { db } from "../../utils/firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore";

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSkipButton = async () => {
    if (user) {
      const randomUsername = `user_${Math.random()
        .toString(36)
        .substring(2, 10)}`;
      try {
        await updateDoc(doc(db, "users", user.uid), {
          username: randomUsername,
        });
        console.log("Username set to:", randomUsername);
        navigate("/");
      } catch (error: any) {
        if (error.code === "not-found") {
          await setDoc(
            doc(db, "users", user.uid),
            {
              username: randomUsername,
            },
            { merge: true }
          );
          navigate("/");
        } else {
          console.error("Error setting username:", error);
        }
      }
    }
  };

  return (
    <nav className="w-full bg-white h-[56px] py-4 px-6 flex items-center justify-between border-b border-neutral border-opacity-25">
      <div className="text-2xl font-bold">
        <Link to="/">Redd.it</Link>
      </div>
      <div className="w-[33rem] flex"></div>
      <div className="flex space-x-4 text-base">
        <Button variant="outlined" onClick={handleSkipButton}>
          Skip this step
        </Button>
      </div>
    </nav>
  );
};
