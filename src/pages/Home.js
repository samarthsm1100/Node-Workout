import React, { useEffect } from 'react'
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import { useWorkoutsContext } from '../hooks/useWorkoutsContext';

const Home = () => {

    const {workouts, dispatch} = useWorkoutsContext()

    useEffect(() => {
        const fetchWorkouts = async() =>{
            const response = await fetch('/api/workouts')
            const json = await response.json()

            if(response.ok){
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        } 

        fetchWorkouts();
    },[dispatch])

  return (
    <div className='home'>
        <div className='workouts'>
            {
                workouts && workouts.map((item) => (
                    <WorkoutDetails key={item._id} workout={item}/>
                ))
            }
        </div>
        <WorkoutForm />
    </div>
  )
}

export default Home