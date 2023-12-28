import React, { useEffect } from 'react'

// function TopBar() {
//   return (
//     <>
//       <nav style={{display:'flex', flex:1, alignItems:'center', justifyContent: 'space-between', border:'1px solid grey', position:'sticky'}}>
//        <div style={{display:'flex', alignItems:'center', justifyContent: 'space-between', flex:0.8}}>
//         <p style={{color:'red', fontSize:'18px', fontWeight:600,}}>MovieFix</p>
//         <div style={{display:'flex'}}>
//           <div>
//             <button>All</button>
//           </div>
//           <div>
//           <button>Action</button>
//           </div>
//           <div>
//           <button>Comedy</button>
//           </div>
//           <div>
//           <button>Horror</button>
//           </div>
//           <div>
//           <button>Drama</button>
//           </div>
//           <div>
//           </div>
//         </div>
//        </div>
//        <div >
//             <span class="user-logo">
//               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation"
//                 focusable="false" style={{display: 'block', height: '100%', width: '100%', fill: 'currentcolor'}}>
//                 <path
//                   d="M16 .7C7.56.7.7 7.56.7 16S7.56 31.3 16 31.3 31.3 24.44 31.3 16 24.44.7 16 .7zm0 28c-4.02 0-7.6-1.88-9.93-4.81a12.43 12.43 0 0 1 6.45-4.4A6.5 6.5 0 0 1 9.5 14a6.5 6.5 0 0 1 13 0 6.51 6.51 0 0 1-3.02 5.5 12.42 12.42 0 0 1 6.45 4.4A12.67 12.67 0 0 1 16 28.7z" />
//               </svg>
//             </span>
//             <div class="dropdown">
//             <ul>
//               <li>Subitem Xfdbgfbtbthtnhtnynyjuyyjnh</li>
//               <li>Subitem Y</li>
//               <li>Subitem Z</li>
//             </ul>
//           </div>
//           </div>
//       </nav>
//     </>
//   )
// }

// export default TopBar

// import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import { useState } from "react";
import "../../style/TopBar.css"
import { default_selected_year, genres } from '../../Constant';
import { getMoviesList, setGenresId, setSelectedYear } from '../../store/movieStore/movieActions';
import { useDispatch, useSelector } from 'react-redux';

const TopBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: moviesList,selected_year,  genres_id, error, loading } = useSelector(state => state.movies)
  const dispatch = useDispatch()
  // window.onscroll = () => {
  //   setIsScrolled(window.pageYOffset === 0 ? false : true);
  //   return () => (window.onscroll = null);
  // };

   useEffect(()=>{
    updateGenresIds(genres_id)
   },[dispatch, genres_id])

  const updateGenresIds = (genres_id) =>{
    dispatch(getMoviesList(selected_year,genres_id))
  }

  const changeColor=(e)=> {
    e.preventDefault()
    // Remove 'clicked' class from all buttons
    const allButtons = document.querySelectorAll('.btn');
     allButtons.forEach(button => button.classList.remove('clicked'));
    // Add 'clicked' class to the currently clicked button
    e.target.classList.add('clicked');
    // updating the genres id
    dispatch(setGenresId(e.target.id))
    // updating the selected year
    dispatch(setSelectedYear(default_selected_year))
  }
 

  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"} style={{position:'fixed', top:0, zIndex:999}}>
      <div className="container">
        <div className="left">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
          <div className="genres">
          {genres &&genres.map((genres_item)=>{
            return <button className={genres_item.id === 1 ? 'btn clicked':'btn'} id={genres_item.id} onClick={changeColor}>{genres_item?.name}</button>
          }) }
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;