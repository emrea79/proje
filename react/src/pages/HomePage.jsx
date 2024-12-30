import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentToken, setSelectedMinistry } from '../redux/slices/FormSlices';
import LoginForm from '../components/LoginForm';

function HomePage({ token }) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSelectedMinistry("Tüm Bakanlıklar"));
    })

    useEffect(() => {
        sessionStorage.setItem("token", token);
        dispatch(setCurrentToken(sessionStorage.getItem("token")))
    }, [token])


    return (
        <div>
            <LoginForm />
        </div>
    )
}

export default HomePage
