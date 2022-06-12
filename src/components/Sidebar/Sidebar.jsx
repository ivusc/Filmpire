import React, { useEffect } from 'react';
import { Divider, List, ListItem, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgress} from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';

import { useGetGenresQuery } from '../../services/TMDB';
import useStyles from './styles';
import genreIcons from '../../assets/genres';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';

const categories = [
   { label: 'Popular', value: 'popular' },
   { label: 'Top Rated', value: 'top_rated' },
   { label: 'Upcoming', value: 'upcoming' },
];

const redLogo = 'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
const blueLogo = 'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';

const Sidebar = ({ setMobileOpen }) => {
   const { genreIdOrCategoryName } = useSelector((state)=>state.currentGenreOrCategory)
   const theme = useTheme();
   const classes = useStyles();
   const { data, isFetching } = useGetGenresQuery({ genreIdOrCategoryName });
   const dispatch = useDispatch();

   useEffect(()=>{
      setMobileOpen(false);
   },[genreIdOrCategoryName])

   return (
    <>
      <Link to='/' className={classes.imageLink}>
         <img
            className={classes.image}
            src={theme.palette.mode === 'light' ? redLogo : blueLogo}
            alt='Filmpire Logo'
         />
      </Link>
      <Divider/>
      <List>
         <ListSubheader>Categories</ListSubheader>
         { categories.map(({label, value})=>(
            <Link key={value} className={classes.links} to='/'>
               <ListItem onClick={()=>dispatch(selectGenreOrCategory(value))} button>
                  <ListItemIcon>
                     <img src={genreIcons[label.toLowerCase()]}className={classes.genreImage} height={30} />
                  </ListItemIcon>
                  <ListItemText primary={label} ></ListItemText>
               </ListItem>
            </Link>
         ))}
      </List>
      <Divider></Divider>
      <List>
         <ListSubheader>Genres</ListSubheader>
         {isFetching ? (
            <Box display='flex' justifyContent='center'>
               <CircularProgress size='4rem' />
            </Box>
         ) : data.genres.map(({ name, id })=>(
            <Link key={name} className={classes.links} to='/'>
               <ListItem onClick={()=>dispatch(selectGenreOrCategory(id))} button>
                  <ListItemIcon>
                     <img src={genreIcons[name.toLowerCase()]}className={classes.genreImage} height={30} />
                  </ListItemIcon>
                  <ListItemText primary={name} ></ListItemText>
               </ListItem>
            </Link>
         ))}
      </List>
    </>
  )
}

export default Sidebar