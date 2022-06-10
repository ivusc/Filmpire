import React from 'react'
import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { Actors, Movies, MovieInfo, Profile, NavBar } from './index';
import useStyles from './styles';

const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
       <CssBaseline />
       <NavBar></NavBar>
       <main className={classes.content}>
        <div className={classes.toolbar}></div>
         <Routes>
           <Route path='/' element={<Movies></Movies>}>
           </Route>
           <Route path='/movie/:id' element={<MovieInfo></MovieInfo>}>
           </Route>
           <Route path='/actors/:id' element={<Actors></Actors>}>
           </Route>
           <Route path='/profile/:id' element={<Profile></Profile>}>
           </Route>
         </Routes>
       </main>
    </div>
  )
}

export default App