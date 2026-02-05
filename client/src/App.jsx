/**
 * React Router DOM Imports
 * 
 * Routes --> This is a container that holds all of the route dfeinitions
 * Route --> Map to a URL path to react component
 * Navigate --> Used for redirects for routes/resources user does not have access to
 */

import {Routes, Route, Navigate} from 'react-router-dom'
import Home from './pages/Home'
import Courses from './pages/Courses'
import NotFound from './pages/NotFound'
import Navbar from './components/Navbar'

export default function App(){

    return(
        <div className="app">
            <Navbar/>
            
            <main>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/courses" element={<Courses/>}/>
                    {/* create more routes to add more navigable pathways */}
                    <Route path="*" element={<NotFound/>}/>
                    {/* The above path to have app other route requests not list here to go to a 404 not found page */}
                </Routes>
            </main>
        </div>
    )
}