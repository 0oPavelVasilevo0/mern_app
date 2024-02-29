import React, { Suspense, useState } from "react"
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useAuthContext } from "../hooks/useAuthContext"

const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()
    const [showOption, setShowOption] = useState(false);

    const handleOption = () => {
        setShowOption(true)
    }

    const handleCancel = () => {
        setShowOption(false);
    };

    const handleClick = async () => {
        if (!user) {
            return
        }
        // const response = await fetch('/api/workouts/' + workout._id, {
        //     method: 'DELETE',
        //     headers: {
        //         'Authorization': `Bearer ${user.token}`
        //     }
        // })
        const response = await fetch(`https://backend-mern-server.vercel.app/api/workouts/${workout._id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_WORKOUT', payload: json })
        }
    }

    return (
        <Suspense fallback={<h1 style={{color: 'red', fontSize: '20px'}}>Loading...</h1>}>
        <div className="workout-details">
            <h4>{workout.title}</h4>
            <p><strong>Load (kg): </strong>{workout.load}</p>
            <p><strong>Reps: </strong>{workout.reps}</p>
            <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
            {/* <span onClick={handleClick}>delete</span> */}
            <button className="delete-btn" onClick={handleOption}>delete</button>
            {showOption && (
                <>
            <button className="yes-btn" onClick={handleClick}>yes</button>
            <button className="no-btn" onClick={handleCancel}>no</button>
            </>
            )}
        </div>
        </Suspense>
    )
}

export default WorkoutDetails