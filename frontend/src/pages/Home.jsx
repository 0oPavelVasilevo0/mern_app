import React, { Suspense, lazy, useEffect } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'

// components
// import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

const WorkoutDetails = lazy(() => import('../components/WorkoutDetails'));

const Home = () => {
    const { workouts, dispatch } = useWorkoutsContext()
    const { user } = useAuthContext()

    useEffect(() => {
        const fetchWorkouts = async () => {
            // const response = await fetch('/api/workouts', {
            const response = await fetch('https://backend-mern-server.vercel.app/api/workouts', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if (response.ok) {
                dispatch({ type: 'SET_WORKOUTS', payload: json })
            }
        }

        if (user) {
            fetchWorkouts()
        }

    }, [dispatch, user])

    return (
        <div className="home">
            <div className="workouts">
                <Suspense fallback={<h1 style={{ color: 'white', fontSize: '40px' }}>Loading...</h1>}>
                    {workouts && workouts.map((workout) => (
                        <WorkoutDetails key={workout._id} workout={workout} />
                    ))}
                </Suspense>
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home