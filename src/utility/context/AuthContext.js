import { createContext, useContext, useEffect, useState } from "react";
import { authenticateUser, registerUser, validateUser } from "../../services/auth";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [userAccessToken, setUserAccessToken] = useState(null);
    const [isAuthPending, setIsAuthPending] = useState(false)

    useEffect(() => {
        const accessToken = JSON.parse(localStorage.getItem('accessToken'))
        if (accessToken) {
            setIsAuthPending(true)
            validateUser(accessToken).then(({ status, hasAccess, message, user }) => {
                if (status && hasAccess && user) {
                    setUserAccessToken(accessToken)
                    setCurrentUser(user);
                } else {
                    console.log(status, message)
                }
                setIsAuthPending(false);
            });
        }
    }, [])

    async function login(username, password) {
        try {
            const { status, token, expiresIn, message, user } = await authenticateUser(username, password);
            if (status) {
                setUserAccessToken(token);
                setCurrentUser(user);
                localStorage.setItem('accessToken', JSON.stringify(token))
                return { status }
            } else {
                return { status, message }
            }
        } catch (err) {
            console.log(err);
            return { status: false, message: 'something went wrong!' }
        }

    }

    async function register(creds) {
        try {
            const { status, token, expiresIn, message, email, username, access } = await registerUser(creds.username, creds.email, creds.password,creds.accessToken);
            if (status) {
                setUserAccessToken(token);
                setCurrentUser({ email, username, access });
                localStorage.setItem('accessToken', JSON.stringify(token))
                return { status }
            } else {
                return { status, message }
            }
        } catch (err) {
            console.log(err);
            return { status: false, message: 'something went wrong!' }
        }

    }

    function getUserRole() {
        return currentUser?.access || 'NO_ACCESS';
    }

    function logout() {
        setUserAccessToken(null);
        localStorage.removeItem('accessToken');
    }

    const value = {
        currentUser,
        userAccessToken,
        isLoggedIn: Boolean(userAccessToken),
        login,
        logout,
        register,
        getUserRole,
    }

    return <AuthContext.Provider value={value}>
        {!isAuthPending && children}
    </AuthContext.Provider>
}

export default AuthProvider