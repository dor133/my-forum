import { Navigate, useLocation } from 'react-router-dom'
import useAuthStore from '../../store/auth/auth.store'

type Props = {
    children: JSX.Element
}

export function ProtectedRoute({ children }: Props) {
    const { payload } = useAuthStore()
    let location = useLocation()

    if (!payload) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return children
}
