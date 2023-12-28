import { GET_MOVIES, GET_FILTERED_MOVIES, FETCH_MOVIES_FAILURE, LOAD_MORE_MOVIES, FETCH_MOVIES_REQUEST, SET_SELECTED_YEAR, GENRES_ID, SEARCH_MOVIES, SHOW_MOVIES_DETAILS } from './movieActionTypes';
import { default_selected_year } from '../../Constant';
// ########################################################
// Initial State
// ########################################################

export const initialState = {
    error: false, 
    loading: false,
    data: [],
    total_page:1,
    page:1,
    selected_year: default_selected_year, //default selected year is 2012
    total_results:null,
    genres_id:1, // default selected All movie list
    search_movies:[]
}

const updateObject = (year, oldObject, updatedProperties) => {
    let arr = [
        ...oldObject,
        {
        selected_year: year,
        moviesList:[...updatedProperties]
    } ]
   arr = arr.sort((a,b)=>{
      return a.selected_year - b.selected_year
    })
    return arr
}

// ########################################################
// Different Reducer Functions which change the store state
// ########################################################

export const updateGenresIDReducer = (state, action) =>{
    return {...state, genres_id: action.payload}
}

const fetchMoviesRequest = (state, action) =>{
    return { ...state, isLoading: true };
}

const getFilteredMoviesReducer = (state, action) => {
        return  {
            ...state,
            error: null,
            loading: state.loading,
            data: state.selected_year === default_selected_year ? [{selected_year:state.selected_year, moviesList:action?.payload?.results}] : updateObject(state.selected_year,state?.data, action?.payload?.results),
            total_pages:action.payload?.total_pages,
            page:action.payload?.page,
            total_results:action.payload?.total_results, 
            search_movies:[]
        };
    }

const getSeacrhMoviesReducer = (state, action) => {
    return {
        ...state,
        error: null,
        loading: state.loading,
        search_movies: [...action.payload?.results]
    }

}
const showMoviesReducer = (state, action) => {
    return {
        ...state,
        error: null,
        loading: state.loading,
        search_movies: action.payload
    }

}
  
 const loadMoreMoviesReducer = (state, action) =>{
    return { ...state, page: state.page + 1 };
 }

 const selectedYearReducer = (state, action) =>{
  return  { ...state, selected_year: action.payload }
 }

const moviesFailureReducer = (state, action) => {
    return { ...state, loading: false, error : true }
}



// ########################################################
// The Main Reducer 
// ########################################################

const moviesReducer = (state=initialState, action) => {
    switch (action.type) {
        case FETCH_MOVIES_REQUEST: return fetchMoviesRequest(state, action)
        case GET_FILTERED_MOVIES: return getFilteredMoviesReducer(state, action);
        case LOAD_MORE_MOVIES: return loadMoreMoviesReducer(state, action);
        case SET_SELECTED_YEAR:  return selectedYearReducer(state, action);
        case GENRES_ID: return updateGenresIDReducer(state, action);
        case SEARCH_MOVIES : return getSeacrhMoviesReducer(state, action);
        case SHOW_MOVIES_DETAILS : return showMoviesReducer(state, action);
        case FETCH_MOVIES_FAILURE: return moviesFailureReducer(state, action);
        default: return state;
    }
}

export default moviesReducer
