import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";
import { initializeAuthentication } from "../firebase/firebase.init";
import { apiUrl, postApi } from "./api";

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

  const getErrorMessage = (error) =>
    error instanceof TypeError && error.message === "Failed to fetch"
      ? "Internal Server Error"
      : error.message;

  // Register user with email and password
  const registerUser = async (email, password, name, history) => {
    setIsLoading(true);
    try {
      const data = await postApi("/users/register", { email, password, name });
      setAuthError("");
      return data;
    } catch (error) {
      const message = getErrorMessage(error);
      setAuthError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  // email, password login
  const loginUser = async (email, password, location, history) => {
    setIsLoading(true);
    try {
      const result = await postApi("/users/login", { email, password });
      const user = result.data;
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      setAuthError("");
      const destination = location?.state?.from || "/";
      history.push(destination);
      return user;
    } catch (error) {
      setAuthError(getErrorMessage(error));
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
  const logOut = async () => {
    setIsLoading(true);
    try {
      await fetch(`${apiUrl}/users/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // Server unreachable — client-side cleanup still runs
    } finally {
      setUser({});
      setAuthError("");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      await signOut(auth).catch(() => {});
      setIsLoading(false);
    }
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
