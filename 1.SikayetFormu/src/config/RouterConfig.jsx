import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import DetailPage from '../pages/DetailPage'
import RegisterPage from '../pages/RegisterPage'
import LoginPage from '../pages/LoginPage'

function RouterConfig() {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/details' element={<DetailPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
        </Routes>
    )
}

export default RouterConfig
