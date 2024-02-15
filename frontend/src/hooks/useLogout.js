import { useAuthContext } from "./useAuthContext"
import { useExercisesContext } from "./useExercisesContext"

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const { dispatch:exercisesDispatch } = useExercisesContext()

    const logout = () => {
        // Remove user from storage
        localStorage.removeItem('user')

        // Dispatch logout action
        dispatch({type: 'LOGOUT'})
        exercisesDispatch({type: 'SET_EXERCISES', payload: null})
    }

    return {logout}
}