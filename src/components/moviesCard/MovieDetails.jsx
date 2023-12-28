import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { img_300, img_not_available } from '../../Constant';
import '../../style/MovieDetail.css'
import { showMovieDetails } from '../../store/movieStore/movieActions';
export const MovieDetails = () => {
const [movieDetail, setMovieDetail] = useState({})
const {search_movies: movieDetails, error, loading} = useSelector(state=> state.movies)
const { id } = useParams();

const dispatch = useDispatch()
useEffect(()=>{
    if(id)
 dispatch(showMovieDetails(id))
},[id])

  return (
    <>
    <div className="movie-details-container">
    {movieDetails ? (
      <div className="movie-details">
        <div className="movie-poster">
          <img
            src={movieDetails?.poster_path ? img_300 + movieDetails.poster_path : img_not_available}
            alt={movieDetails?.title}
          />
        </div>
        <div className="movie-info">
          <h1>Title - {movieDetails.title}</h1>
          <p>Release Year - {movieDetails.release_date}</p>
          <p>Description - {movieDetails.overview}</p>
        </div>
      </div>
    ): null}
    </div>
      </>
  )
}

export default MovieDetails