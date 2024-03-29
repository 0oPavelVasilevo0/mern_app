import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = async (email, password) => {
        setIsLoading(true)
        setError(null)

    //     const response = await fetch('/api/user/signup', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ email, password })
    //     })
    //     const json = await response.json()

    //     if (!response.ok) {
    //         setIsLoading(false)
    //         setError(json.error)
    //     }
    //     if (response.ok) {
    //         // save the user to local storage
    //         localStorage.setItem('user', JSON.stringify(json))

    //         // update the auth context
    //         dispatch({ type: 'LOGIN', payload: json })

    //         // update loading state
    //         setIsLoading(false)
    //     }
    // }

        try {
            const response = await fetch('https://backend-mern-server.vercel.app/api/user/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                setError('Login failed');
            } else {
                const user = await response.json();

                // Save the user to local storage
                localStorage.setItem('user', JSON.stringify(user));

                // Update the auth context
                dispatch({ type: 'LOGIN', payload: user });
            }
        } catch (error) {
            setError('An error occurred during signup');
        } finally {
            setIsLoading(false);
        }
    };

    return { signup, isLoading, error }
}