import React, { useRef, useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useSelector } from 'react-redux';

function Header() {

    const navigate = useNavigate();
    const { currentToken } = useSelector((state) => state.form)

    const runDetailPage = () => {
        if (currentToken === 'null') {
            alert("Login Yapılmadı")
            return;
        }
        console.log("currentToken:", currentToken)
        navigate('/details')
    }

    return (
        <div className='header'>
            <div className='header-cont'>
                <div className='header1' onClick={() => navigate("/")}>
                    <Button><HomeIcon color='success' sx={{ fontSize: 35 }} /></Button>
                    <div className='title'>Şikayet Formu</div>
                </div>
                <div>
                    <Button onClick={runDetailPage} startIcon={<ViewListOutlinedIcon />} color='success' sx={{ textTransform: 'none', marginRight: '30px' }}>Şikayetler</Button>
                </div>
            </div>



        </div >
    )
}

export default Header
