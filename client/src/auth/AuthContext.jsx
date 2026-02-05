import {createContext, useContext, useEffect, useMemo, useState} from 'react'
/**
 * createContext:
 * 
 * Creates a shared global storage that any component can access without passing props
 * through every level of the component tree
 * 
 * Think of it like a secure backpack that follows the app around as the user navigates
 */

const AuthContext = createContext(null)

/**
 * AuthProvide
 * 
 * Wraps the app and provides authentication data
 * (user, token, login/out helpers) to all the child components
 */

export function AuthProvider({children}){
    /**
     * Stores the JWT token in the state
     * Intitalizes it from the localstorage so it refreshes and stays logged in
     */
    const [token, setToken] = useState(() => localStorage.getItem("jwt") || "")
    /**
     * Stores the user object/token in the usestate and it is parsed from the local storage if it exists
     */
    const [user, setUser] = useState(() =>{
        const raw = localStorage.getItem('user')
        return raw ? json.parse(raw) : null
    })

    useEffect(() =>{
        if(token) localStorage.setItem('jwt', token)
        else localStorage.removeItem('jwt')
    }, [token])

    /**
     * Session sets both token and user at the same time
     * normally its called right after a successful login
     */
    function setSession({token: newToken, user: newUser}){
        setToken(newToken)
        setUser(newUser)
    }

    /**
     * For logging out, clearing the authentication state is also needed
     * 
     */
    function logout(){
        setToken("")
        setUser("")
    }

    /**
     * Now that they have been authorized, we set isAuthed
     * and is Admin based on the role
     */
    const isAuthed = Boolean(token)
    const isAdmin = Boolean(user && user.role === "admin")

    /**
     * useMemo
     * 
     * caches/stores the context value object so it is NOT recreated on every render
     * unless its dependencies change
     * 
     * This is to prevent unneccessary re-renderes in components that consume the context
     */
    const value = useMemo(
        () => ({token, user, isAuthed, isAdmin, setSession, logout}),
        [token, user, isAuthed, isAdmin]
        // This makes the auth data available to all children
    )

    return(
        <AuthContext.Provider value = {value}>
            {children}
        </AuthContext.Provider>
    )
}

/**
 * useAuth
 * 
 * useContext allows any component to access the AuthContext without passing props manually
 * 
 * this is a custom hook and keeps the usage clean
 * const {user, logout} = useAuth()
 */
export function useAuth(){
    const ctx = useContext(AuthContext)

    if(!ctx){
        throw new Error("useAuth must be used within AuthProvider")
    }
    
    return ctx
}
