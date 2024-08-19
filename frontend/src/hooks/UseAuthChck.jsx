import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import axios from "axios";

const UseAuthChck = () => {
  const { isAuthenticated, isLoading, loginWithRedirect, logout, user, error } =
    useAuth0();
  const saveUserDetails = async (user) => {
    try {
      console.log("Sending user details to backend:", user);
      const response = await axios.post(
        "https://dealx-olive.vercel.app/user/register",
        {
          email: user.email,
          name: user.name,
          picture: user.picture,
        }
      );
    } catch (err) {
      console.error("Error saving user details:", err);
      toast.error(
        `Error saving user details. Please try again. ${
          err.response?.data?.message || err.message
        }`,
        {
          position: "bottom-right",
        }
      );
    }
  };

  const validateLogin = () => {
    if (isLoading) {
      toast.info("Checking authentication status...", {
        position: "bottom-right",
      });
      return false;
    }
    if (error) {
      toast.error(`Authentication error: ${error.message}`, {
        position: "bottom-right",
      });
      return false;
    }
    if (!isAuthenticated) {
      toast.error("You must log in to continue", { position: "bottom-right" });
      loginWithRedirect();
      return false;
    } else {
      saveUserDetails(user)
        .then(() => {
          console.log("User authenticated and details saved.");
        })
        .catch((err) => {
          console.error("Error in saving user details:", err);
        });
    }
    return true;
  };

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
    toast.success("Successfully logged out", { position: "bottom-right" });
  };

  return { validateLogin, handleLogout, user, isAuthenticated, isLoading };
};

export default UseAuthChck;
