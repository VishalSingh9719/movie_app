import { useState } from "react";
import "../../style/MoviesItem.css";
import {Link} from 'react-router-dom';
import { img_300, img_not_available } from "../../Constant";

export const MoviesListItem = ({ moviesdata }) => {
  const title = moviesdata.original_title || moviesdata.name;
    const id = moviesdata.id;
    const ImageURL =  moviesdata.poster_path ? img_300 + moviesdata.poster_path : img_not_available;
    const media_type = moviesdata.media_type ? moviesdata.media_type : moviesdata.type ? moviesdata.type : null;
    const release_date =  moviesdata.release_date || moviesdata.first_air_date;
    const vote_average = parseInt(moviesdata.vote_average);
    const original_language = moviesdata.original_language || ''
  return (
      <>
          <div className='movie-container'>
              <Link to={`/movies/${id}`} className='video-thumb'>
                  <figure className="video-image"> 
                      <span>
                          <img className="movie-image" src={ImageURL} alt={title} />
                      </span>
                      <div className="circle-rate">
                          <svg className="circle-chart" viewBox="0 0 30 30" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                              <circle className="circle-chart__background" stroke="#2f3439" strokeWidth="2" fill="none" cx="15" cy="15" r="14"></circle>
                              <circle className="circle-chart__circle" stroke="#4eb04b" strokeWidth="2" strokeDasharray={`${vote_average}0,100`} cx="15" cy="15" r="14"></circle>
                          </svg>
                          <b>{vote_average}</b> 
                      </div>
                      <div className="hd">{media_type} 
                      <b>{original_language}</b></div>
                  </figure>
                  <div className="video-content"> 
                      <ul className="tags">
                          <li>Release Date</li>
                      </ul>
                      <small className="range">{release_date}</small>
                      <h3 className="name">
                          {title}
                      </h3>
                  </div>
              </Link>
          </div>
      </>
  )
}