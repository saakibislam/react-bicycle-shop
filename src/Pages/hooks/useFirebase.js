import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { useState } from "react";
import { initializeAuthentication } from "../firebase/firebase.init";

const useFirebase = () => {
  initializeAuthentication();
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : {};
  });
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [admin, setAdmin] = useState(false);

  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  // Register user with email and password
  const registerUser = (email, password, name, history) => {
    setIsLoading(true);
    fetch("http://localhost:5000/api/v2/users/register", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message !== "User registered successfully") {
          return setAuthError(data.message);
        }
        setAuthError("");
      })
      .catch((error) => {
        setAuthError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // email, password login
  const loginUser = (email, password, location, history) => {
    setIsLoading(true);
    fetch("http://localhost:5000/api/v2/users/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setAuthError(data.message);
        } else if (data.user) {
          setUser(data.user);
          localStorage.setItem("user", JSON.stringify(data.user));
          setAuthError("");
          const destination = location?.state?.from || "/";
          history.push(destination);
          // Generating Token
          // getToken(email);
        }
      })
      .catch((error) => {
        setAuthError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // login using google
  /* const loginWithGoogle = (location, history) => {
    setIsLoading(true);
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setUser(result.user);
        setAuthError("");
        const destination = location?.state?.from || "/";
        history.push(destination);
        // save user to database
        saveUser(result.user.email, result.user.displayName, "PUT", "Google");
        // Generating accessToken
        getToken(result.user.email);
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
  }; */

  // saving register/google login user to database
  /* const saveUser = (email, displayName, method, provider) => {
    const user = { email, displayName, provider };
    fetch("http://localhost:5000/api/v2/users", {
      method: method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    }).then();
  }; */

  //logout user
  const logOut = () => {
    setIsLoading(true);
    setUser({});
    setAuthError("");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    // signOut(auth);
    setIsLoading(false);
  };

  return {
    user,
    setUser,
    admin,
    authError,
    setAuthError,
    isLoading,
    setIsLoading,
    registerUser,
    loginUser,
    // loginWithGoogle,
    logOut,
  };
};
export default useFirebase;
