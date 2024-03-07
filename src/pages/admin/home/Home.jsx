import React from "react";
import Sidenav from '../../../components/Sidenav';
import Box from '@mui/material/Box';
import { Margin } from "@mui/icons-material";


function Home()
{
    return(
        <>
         <Box sx={{ display: 'flex' }}>
        <Sidenav></Sidenav>
       
        <Box component="main" sx={{ flexGrow: 1, p: 3 }} style={{Margin:'25px'}}>
        <h1>Welcome to home page</h1>
       
      </Box>
        </Box>
        </>
    )
}
export default Home