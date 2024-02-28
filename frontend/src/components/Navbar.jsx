import React, { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"
import { CiSquareChevDown } from "react-icons/ci"
import { CiSquareChevUp } from "react-icons/ci"

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownVisible(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);

    const handleClick = () => {
        logout()
    }

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    }

    const handleIconClick = (event) => {
        event.stopPropagation();
        toggleDropdown();
    }

    const getUserName = () => {
        if (user && user.email) {
            return user.email.split('@')[0]; // установка первой части почты до знака @
        }
        return '';
    }

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>My workouts</h1>
                </ Link >
                <nav>
                    <div className="userlog">
                    </div>
                    {user && (
                        <div className="userlog">
                            <div className="dropdown" ref={dropdownRef}>
                                <button className="dropbtn" onClick={toggleDropdown} >
                                    {/* {user.email} */}
                                    {getUserName()}
                                    {dropdownVisible ?
                                        <CiSquareChevUp className="down" onClick={handleIconClick} /> :
                                        <CiSquareChevDown className="down" onClick={handleIconClick} />
                                    }
                                </button>
                                {dropdownVisible && (
                                    <div className="dropdown-content">
                                        <ul>
                                            <li>
                                                {user.email}
                                            </li>
                                            <li>
                                                <button onClick={handleClick}>Logout</button>
                                            </li>
                                        </ul>
                                    </div>
                                )}
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