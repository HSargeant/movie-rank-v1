import { useNavigate, useOutletContext } from 'react-router-dom';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate()
    const { user } = useOutletContext()
    useEffect(()=>{
        return
    },[])
    return children
};
export default ProtectedRoute