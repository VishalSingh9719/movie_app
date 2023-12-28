import axios from 'axios';
import { GET_MOVIES, GET_FILTERED_MOVIES, FETCH_MOVIES_REQUEST, FETCH_MOVIES_FAILURE, LOAD_MORE_MOVIES, SET_SELECTED_YEAR, GENRES_ID, SEARCH_MOVIES, SHOW_MOVIES_DETAILS } from './movieActionTypes';

const Api_key = process.env.REACT_APP_MOVIE_API_KEY

export const setGenresId = (id) => {
    return {type: GENRES_ID, payload: id}
}
const fetchMoviesRequest = () => ({ type: FETCH_MOVIES_REQUEST });

const fetchMoviesFailure = (error) => ({ type: FETCH_MOVIES_FAILURE, payload: error });

export const loadMoreMovies = () => {
   return { type: LOAD_MORE_MOVIES }
};

export const setSelectedYear = (selected_year) => {
    return { type: SET_SELECTED_YEAR, payload: selected_year}
}

export const moviesData = (res) => {
    return {
        type: GET_MOVIES,
        payload: res
    }
}

export const filterMoviesList = (res) => {
    return {
        type: GET_FILTERED_MOVIES,
        payload: res
    }
}

export const searchMoviesList = (res) => {
    return {
        type: SEARCH_MOVIES,
        payload: res
    }
}

export const showMovieDetailsList = (res) =>{
    return{
        type:SHOW_MOVIES_DETAILS,
        payload: res
    }
}

export const showMovieDetails =(movieId)=>{
    return async dispatch => {
        dispatch(fetchMoviesRequest());
        try{
              let   res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${Api_key}`)
              dispatch(showMovieDetailsList(res?.data))
        }
        catch(error){
            dispatch(fetchMoviesFailure(error));
        };
    }
}

export const getMoviesList = (selected_year, genres_id ) => {
    return async dispatch => {
        dispatch(fetchMoviesRequest());
        try{
            let res
            if(genres_id == 1){
                 res = await axios.get(`https://api.themoviedb.org/3/discover/movie/?api_key=${Api_key}&sort_by=popularity.desc&primary_release_year=${selected_year}&page=1&vote_count.gte=100`)   
            }else{
                 res = await axios.get(`https://api.themoviedb.org/3/discover/movie/?api_key=${Api_key}&sort_by=popularity.desc&primary_release_year=${selected_year}&page=1&vote_count.gte=100&with_genres=${genres_id}`)
            }
            dispatch(filterMoviesList(res?.data))
        }
        catch(error){
            dispatch(fetchMoviesFailure(error));
        };
    }
}

export const searchMovies = (searchTerm ) => {
    return async dispatch => {
        dispatch(fetchMoviesRequest());
        try{
              let   res = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${Api_key}&query=${searchTerm}`)
              dispatch(searchMoviesList(res?.data))
        }
        catch(error){
            dispatch(fetchMoviesFailure(error));
        };
    }
}

