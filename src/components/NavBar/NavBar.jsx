import React, { useState } from 'react';
import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery } from '@mui/material';
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useStyles from './styles';
import { Sidebar, Search } from '..';

const NavBar = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px)');
  const theme = useTheme();
  const isAuthenticated = true;
  const [mobileOpen, setMobileOpen] = useState(false);

   return (
    <>
      <AppBar position='fixed'>
        <Toolbar className={classes.toolbar}>
          { isMobile && (
            <IconButton 
              color='inherit' 
              edge='start' 
              style={{ outline: 'none' }}
              onClick={()=>setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              className={classes.menuButton}
              >
              <Menu></Menu>
            </IconButton>
          )}
          <IconButton color='inherit' sx={{ ml: 1 }} onClick={()=>{}}>
            { theme.palette.mode === 'dark' ? <Brightness7></Brightness7> : <Brightness4></Brightness4> }
          </IconButton>
          { !isMobile && <Search></Search> }
          <div>
            {!isAuthenticated ? (
              <Button color='inherit' onClick={()=>{}}>
                Login &nbsp; <AccountCircle></AccountCircle>
              </Button>
            ) : (
              <Button color='inherit' 
                component={NavLink} to={`/profile/:id`}
                className={classes.linkButton} onClick={()=>{}}
              >
                {!isMobile && <>My Movies &nbsp;</>}
                <Avatar
                  style={{ width:30, height:30 }}
                  alt='Profile'
                  src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'
                />
              </Button>
            )}
          </div>
          { isMobile && <Search></Search> }
        </Toolbar>
      </AppBar>
      <div>
        <nav className={classes.drawer}>
          { isMobile ? (
            <Drawer
              variant='temporary'
              anchor='right'
              open={ mobileOpen }
              onClose={()=>setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true}}
            >
              <Sidebar setMobileOpen={setMobileOpen}></Sidebar>
            </Drawer>
          ) : (
            <Drawer classes={{ paper: classes.drawerPaper }} variant='permanent' open>
              <Sidebar setMobileOpen={setMobileOpen}></Sidebar>
            </Drawer>
          )}
        </nav>
      </div>
    </>
  )
}

export default NavBar