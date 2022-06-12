import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Button, Box } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';

import { userSelector } from '../../features/auth';
import { useGetListQuery } from '../../services/TMDB';
import { RatedCards } from '..';

const Profile = () => {
  const { user } = useSelector(userSelector);

  const { data: favoriteMovies, refetch: refetchFavorites } = useGetListQuery({ listName: 'favorite/movies', accountId: user.Id, sessionId: localStorage.getItem('session_id'), page: 1});
  const { data: watchlistMovies, refetch: refetchWatchlisted } = useGetListQuery({ listName: 'watchlist/movies', accountId: user.Id, sessionId: localStorage.getItem('session_id'), page: 1});

  useEffect(()=>{
    refetchFavorites();
    refetchWatchlisted();
  },[])
  
  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  }

  return (
    <Box>
      <Box display='flex' justifyContent='space-between'>
        <Typography variant='h5' gutterBottom>My Profile</Typography>
        <Button color='inherit' onClick={logout}>
          Logout &nbsp; <ExitToApp></ExitToApp>
        </Button>
      </Box>
      {!favoriteMovies?.results?.length && !watchlistMovies?.results?.length ?
        <Typography variant='h6'>Add favorites or watch some movies to see them here!</Typography> :
        <Box>
          <RatedCards title='Favorite Movies' data={favoriteMovies}></RatedCards>
          <RatedCards title='Watchlist Movies' data={watchlistMovies}></RatedCards>
        </Box>
      }
    </Box>
  )
}

export default Profile