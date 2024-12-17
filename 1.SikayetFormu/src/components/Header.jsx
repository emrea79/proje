import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

function Header() {

    const navigate = useNavigate();

    return (
        <div className='header'>
            <div className='header-cont'>
                <div className='header1' onClick={() => navigate("/")}>
                    <Button><HomeIcon color='success' sx={{ fontSize: 35 }} /></Button>
                    <div className='title'>Şikayet Formu</div>
                </div>
                <div>
                    <Button color='success' onClick={() => navigate("/register")} ><AccountBoxIcon /></Button>
                    <Button onClick={() => navigate('/details')} startIcon={<ViewListOutlinedIcon />} color='success' sx={{ textTransform: 'none', marginRight: '30px' }}>Şikayetler</Button>
                </div>
            </div>



        </div >
    )
}

export default Header
