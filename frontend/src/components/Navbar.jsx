import React from "react"
import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"
import { CiSquareChevDown } from "react-icons/ci"

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()

    }

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>My workouts</h1>
                </ Link >
                <nav>
                    {user && (
                        <div className="userlog">
                            {/* <span>{user.email}</span>
                            
                                <button onClick={handleClick}>
                                Logout
                            </button> */}
                            
                            <div className="dropdown">
                                <button class="dropbtn">{user.email}
                              
                                    <CiSquareChevDown className="down" /> 
                                </button>
                             
                                <div class="dropdown-content">
                                    <ul>
                                        <li><button onClick={handleClick}>
                                            Logout
                                        </button></li>
                                    </ul>
                                </div>
                            </div> 
                            
                        </div>
                    )}
                    {!user && (
                        <div>
                            <Link to='/login'>Login</Link>
                            <Link to='/signup'>Signup</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar