import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { initializeAuthentication } from "../firebase/firebase.init";

const useFirebase = () => {
  initializeAuthentication();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState("");
  const [admin, setAdmin] = useState(false);

  const auth = getAuth();
  const googleProvider = new GoogleAuthProvider();

  // register user
  const registerUser = (email, password, name, history) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setAuthError("");
        setUser(userCredential.user);
        history.push("/");
        // save user to database
        saveUser(email, name, "POST", "Usual");
        // Generating Token
        getToken(email);
        // send name to firebase after register
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {})
          .catch((error) => {
            console.log(error.message);
          });
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
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        setAuthError("");
        const destination = location?.state?.from || "/";
        history.push(destination);
        // Generating Token
        getToken(email);
      })
      .catch((error) => {
        setAuthError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // login using google
  const loginWithGoogle = (location, history) => {
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
  };

  //observer user state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
      setIsLoading(false);
    });
    return () => unsubscribe;
  }, [auth]);

  // checking if user is admin
  useEffect(() => {
    fetch(`https://bike-mania.onrender.com/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.admin) {
          setAdmin(true);
        } else {
          setAdmin(false);
        }
      });
  }, [user.email]);

  // saving register/google login user to database
  const saveUser = (email, displayName, method, provider) => {
    const user = { email, displayName, provider };
    fetch("https://bike-mania.onrender.com/users", {
      method: method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    }).then();
  };

  // Generating JWT Token
  const getToken = (email) => {
    fetch("https://bike-mania.onrender.com/token", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("accessToken", data.token);
      })
      .catch((error) => console.dir(error));
  };

  //logout user
  const logOut = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        setAuthError("");
        localStorage.removeItem("accessToken");
      })
      .catch((error) => setAuthError(error.message))
      .finally(() => {
        setIsLoading(false);
      });
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
    loginWithGoogle,
    logOut,
  };
};
export default useFirebase;
