import React, { Suspense, lazy, useEffect } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

// components
// import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'
import Loader from '../components/Loader'

const WorkoutDetails = lazy(() => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(import('../components/WorkoutDetails'));
        }, 3000)
    })
})

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
                    {workouts && workouts.map((workout) => (
                <Suspense fallback={<Loader />}>
                        <WorkoutDetails key={workout._id} workout={workout} />
                </Suspense>
                    ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home