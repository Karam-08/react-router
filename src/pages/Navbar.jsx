import React from 'react'
import {NavLink} from 'react-router-dom'

export default function Navbar(){  
    return (
        <header className="nav">
            <nav className="nav-inner">
                <div className="brand">Student Hub</div>

                <NavLink className={({isActive}) => "link" + (isActive ? " active" : "")} to="/" end>
                    Home
                </NavLink>

                <NavLink className={({isActive}) => "link" + (isActive ? " active" : "")} to="/courses">
                    Courses
                </NavLink>

                <NavLink className={({isActive}) => "link" + (isActive ? " active" : "")} to="/dashboard">
                    Dashboard
                </NavLink>

                <NavLink className={({isActive}) => "link" + (isActive ? " active" : "")} to="/login">
                    Login
                </NavLink>
            </nav>
        </header>
    )
}