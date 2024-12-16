import React from 'react'
import { IconButton } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';

function Header() {

    const navigate = useNavigate();

    return (
        <div className='header'>
            <IconButton
                onClick={() => navigate("/")}
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
                <HomeIcon sx={{ fontSize: 40, color: 'white' }} />
                <div className='title'>Şikayet Formu</div>
            </IconButton>

        </div>
    )
}

export default Header
