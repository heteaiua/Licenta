import React from 'react';
import { Box } from '@mui/material';
import { Button } from '@mui/material';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import './Home.css';
import Navbar from '../../components/Navbar';
function Home() {
    return (
        <div id="content">
            <header><Navbar /></header>
            
            <div className='mainAction'>
                <Box>
                    <Button sx={{
                        '&.MuiButton-outlined': { color: 'black' },
                        "&.MuiButton-root": { border: "2px black solid" },
                        mr: 2,
                    }} startIcon={<HowToRegOutlinedIcon />} variant="outlined" size="large" href="/register">Register</Button>
                </Box>
                <Box >
                    <Button sx={{
                        '&.MuiButton-outlined': { color: 'black' },
                        "&.MuiButton-root": { border: "2px black solid" },
                    }} startIcon={<LoginOutlinedIcon />} variant="outlined" size="large" href="/login">Login</Button>
                </Box>
            </div>
        </div>

    );
};

export default Home;