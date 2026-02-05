import {react} from 'react'
import {useAuth} from '../auth/AuthContext'

const Home = () => {
    const {isAuthed, isAdmin, user} = useAuth()
    return (
        <div className="card">
            <h2>Home</h2>
            <p className="muted">Register/Login to access the courses</p>

            {isAuthed && (
                <p className="muted">
                    Logged in as <b>{user?.email}</b> (role: <b>{user?.role}</b>)
                    {isAdmin ? " -- Admin dashboard available at /admin": ""}
                </p>
            )}



            <ul>
                <li>Users can manage only their own courses</li>
                <li>Admins can manage all users and all courses from the dashboard</li>
            </ul>
        </div>
    )
}

export default Home