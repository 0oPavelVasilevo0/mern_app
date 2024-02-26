import React, { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"
import { LuPanelLeftOpen } from "react-icons/lu"
import { LuPanelRightOpen } from "react-icons/lu"

const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()

    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const [isOpen, setOpen] = useState();

    const toggleMenu = () => {
        setOpen(!isOpen);
    };

    const closeMenu = () => {
        setOpen(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError('You must be logget in')
            return
        }

        const workout = { title, load, reps }

        // const response = await fetch('/api/workouts', {
        //     method: 'POST',
        //     body: JSON.stringify(workout),
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${user.token}`
        //     }
        // })
        const response = await fetch('https://backend-mern-server.vercel.app/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            setEmptyFields([])
            console.log('new workout added', json)
            dispatch({ type: 'CREATE_WORKOUT', payload: json })
        }
    }

    return (
        <>
        <form className={`create ${isOpen ? "active" : ""}`} onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Excersize Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Load (in kg):</label>
            <input
                type="number"
                onChange={(e) => setLoad(e.target.value)}
                value={load}
                className={emptyFields.includes('load') ? 'error' : ''}
            />

            <label>Reps:</label>
            <input
                type="number"
                onChange={(e) => setReps(e.target.value)}
                value={reps}
                className={emptyFields.includes('reps') ? 'error' : ''}
            />

                <button onClick={closeMenu}>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
        <button className='navbar__menu-button' onClick={toggleMenu}>
                {isOpen ? (
                    < LuPanelLeftOpen className='button-icon' />
                ) : (
                        <LuPanelRightOpen className='button-icon' />
                )}
            </button>
            </>
    )
}

export default WorkoutForm