import React, { useRef } from 'react'
import { CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { Actors, Movies, MovieInfo, Profile, NavBar } from './index';
import useStyles from './styles';
import useAlan from './Alan';

const App = () => {
  const classes = useStyles();
  const alanBtnContainer = useRef();

  useAlan();

  const renderMultiRoutes = ({ element: Element, paths, ...rest }) =>
    paths.map((path) => <Route key={path} path={path} {...rest} element={Element} />);

  return (
    <div className={classes.root}>
       <CssBaseline />
       <NavBar></NavBar>
       <main className={classes.content}>
        <div className={classes.toolbar}></div>
         <Routes>
            {renderMultiRoutes({
                paths: ['/', '/approved'],
                element: <Movies />,
            })}
           <Route path='/movie/:id' element={<MovieInfo></MovieInfo>}>
           </Route>
           <Route path='/actors/:id' element={<Actors></Actors>}>
           </Route>
           <Route path='/profile/:id' element={<Profile></Profile>}>
           </Route>
         </Routes>
       </main>
       <div ref={alanBtnContainer}></div>
    </div>
  )
}

export default App