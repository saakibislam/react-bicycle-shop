import { initializeAuthentication } from "../firebase/firebase.init";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged, GoogleAuthProvider, updateProfile, signOut } from "firebase/auth";
import { useEffect, useState } from "react";


const useFirebase = () => {
    initializeAuthentication();
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const [authError, setAuthError] = useState('');
    const [admin, setAdmin] = useState(false);

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    // register user
    const registerUser = (email, password, name) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setAuthError('');
                setUser(userCredential.user)
                // save user to database
                saveUser(email, name, 'POST');
                // send name to firebase after register
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {
                }).catch((error) => {
                    console.log(error.message)
                })
            })
            .catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    // normal login
    const loginUser = (email, password, location, history) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user)
                setAuthError('')
                const destination = location?.state?.from || '/'
                history.push(destination)
            })
            .catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            })

    }

    // login using google
    const loginWithGoogle = (location, history) => {
        setIsLoading(true);
        signInWithPopup(auth, googleProvider)
            .then(result => {
                setUser(result.user)
                setAuthError('')
                const destination = location?.state?.from || '/'
                history.push(destination)
                // save user to database
                saveUser(result.user.email, result.user.displayName, 'PUT')
            })
            .catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    //observer user state change
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            }
            else {
                setUser({})
            }
            setIsLoading(false);
        });
        return () => unsubscribe;
    }, [auth])

    // checking if user is admin
    useEffect(() => {
        fetch(`/users/${user.email}`)
            .then(res => res.json())
            .then(data => {
                if (data.admin) {
                    setAdmin(true);
                }
                else {
                    setAdmin(false);
                }
            })
    }, [user.email])

    //logout user
    const logOut = () => {
        setIsLoading(true);
        signOut(auth)
            .then(setAuthError(''))
            .catch(error => setAuthError(error.message))
            .finally(() => {
                setIsLoading(false);
            })
    }

    // saving register/google login user to database
    const saveUser = (email, displayName, method) => {
        const user = { email, displayName };
        fetch('/users', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then()
    }


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
        logOut
    }
}
export default useFirebase;