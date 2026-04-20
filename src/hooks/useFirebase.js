import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";
import { initializeAuthentication } from "../firebase/firebase.init";
import { postApi } from "./api";

const useFirebase = () => {
  initializeAuthentication();
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : {};
  });
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  // Register user with email and password
  const registerUser = async (email, password, name, history) => {
    setIsLoading(true);
    try {
      const data = await postApi("/users/register", { email, password, name });
      if (data.message !== "User registered successfully") {
        setAuthError(data.message);
        throw new Error(data.message);
      }
      setAuthError("");
      return data;
    } catch (error) {
      setAuthError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // email, password login
  const loginUser = async (email, password, location, history) => {
    setIsLoading(true);
    try {
      const data = await postApi("/users/login", { email, password });

      if (data.message) {
        setAuthError(data.message);
        throw new Error(data.message);
      } else if (data.user) {
        setUser(data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        setAuthError("");
        const destination = location?.state?.from || "/";
        history.push(destination);
        // Generating Token
        // getToken(email);
        return data.user;
      }
    } catch (error) {
      setAuthError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // login using google
  const loginWithGoogle = (location, history) => {
    setIsLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log(result);
        setUser(result.user);
        localStorage.setItem("user", JSON.stringify(result.user));
        setAuthError("");
        const destination = location?.state?.from || "/";
        history.push(destination);
      })
      .catch((error) => {
        setAuthError(error.message);
        setTimeout(() => {
          setAuthError("");
        }, 3000);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  //logout user
  const logOut = () => {
    setIsLoading(true);
    setUser({});
    setAuthError("");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    signOut(auth);
    setIsLoading(false);
  };

  return {
    user,
    setUser,
    authError,
    setAuthError,
    isLoading,
    setIsLoading,
    registerUser,
    loginUser,
    loginWithGoogle,
    logOut,
  };
};
export default useFirebase;
