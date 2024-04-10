import React, { useState ,useEffect} from "react";

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => { },
    onLogIn: (email, password) => { }
})

export const AuthContextProvider = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const logInfo = localStorage.getItem('userLoged');
        if (logInfo) {
            setIsLoggedIn(true);
        }
    }, [])


    const loginHandler = (email, password) => {
        // We should of course check email and password
        // But it's just a dummy/ demo anyways
        localStorage.setItem('userLoged', '1');
        setIsLoggedIn(true);
    };

    const logoutHandler = () => {
        localStorage.removeItem('userLoged')
        setIsLoggedIn(false);
    };

    return < AuthContext.Provider
        value={{
            isLoggedIn: isLoggedIn,
            onLogout: logoutHandler,
            onLogIn: loginHandler
        }}
    >
        {props.children}
    </AuthContext.Provider>

}

export default AuthContext;