import { createContext, useState } from "react";
import PropTypes from "prop-types";


const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [auth, setAuthh] = useState({});

    return (
        <AuthContext.Provider value={{auth, setAuthh}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;

AuthProvider.propTypes = {
    children: PropTypes.node
}