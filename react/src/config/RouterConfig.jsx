import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import DetailPage from '../pages/DetailPage'


function RouterConfig({ token }) {
    return (
        <Routes>
            <Route path='/' element={<HomePage token={token} />} />
            <Route path='/details' element={<DetailPage token={token} />} />
        </Routes>
    )
}

export default RouterConfig
