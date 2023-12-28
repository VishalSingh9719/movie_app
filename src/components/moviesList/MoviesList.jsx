
import { useEffect, useRef, useState } from "react";
import { MoviesListItem } from "../moviesCard/MoviesItem";
import "../../style/moviesList.css";
import { useDispatch, useSelector } from "react-redux";
import { getMoviesData, getMoviesList, searchMovies, setGenresId, setSelectedYear, showSearchMovies } from "../../store/movieStore/movieActions";
import InfiniteScroll from "react-infinite-scroll-component";

export const MoviesList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearchTrue, setIsSearchTrue] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  const { data: moviesList, page, total_pages, total_results, selected_year, genres_id, search_movies, error, loading } = useSelector(state => state.movies)
  const dispatch = useDispatch()


  useEffect(() => {
    changePage(selected_year, genres_id)
  }, [dispatch, selected_year])

  const changePage = (selected_year, genres_id) => {
    dispatch(getMoviesList(selected_year, genres_id))
  }

  const handleScroll = () => {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    const isVerticalScroll = Math.abs(window.scrollY - lastScrollY) > 5;
    const scrollY = window.scrollY;
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

    if (isVerticalScroll) {
      if (scrollY == 0 && selected_year > 2012 && !loading) {
        // Scrolled to the top, load movies for the previous year
        dispatch(setSelectedYear(2011));
      }
      if (scrollY == 0 && selected_year <= 2012 && !loading) {
        // Scrolled to the top, load movies for the previous year
        dispatch(setSelectedYear(selected_year - 1));
      }  else if (
        distanceFromBottom <= 100 && !loading
      ) {
        // Scrolled to the bottom, load movies for the next year
        setTimeout(() => {
          dispatch(setSelectedYear(selected_year + 1));
        }, 100)
      }
    }
    lastScrollY = window.scrollY; // Store last scroll position
  }
  let lastScrollY = window.scrollY;

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  useEffect(() => {
    const fetchSuggestions = async (text) => {
      try {

        const response = dispatch(searchMovies(text));
        setSuggestions(search_movies.map((movie) => movie.original_title || movie.name)); // Assuming 'results' contains suggestions
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };

    const delayedSearch = debounce(fetchSuggestions, 300);

    if (searchTerm.trim() !== '') {
      delayedSearch(searchTerm);
    } else {
      setSuggestions([]);
      setShowSuggestions(false); // Hide suggestions if search term is empty
    }
  }, [searchTerm]);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    setShowSuggestions(true);
    setIsSearchTrue(false)
  };
  const handleSearchClick = () => {
    setIsSearchTrue(true)
    setSearchTerm('');
  }

  const handleSuggestionClick = (e, movie) => {
    e.preventDefault()
    e.stopPropagation()
    setSearchTerm(movie); // Set the selected title in the input field
    setShowSuggestions(false); // Hide suggestions after selection
  };

  return (
    <main className="list" id='infinite-movies-container'>
      <div className="search-container">
        <div className="search-box" style={{ position: 'relative', display: 'inline-block' }}>
          <input
            className="search-input"
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search movies..."
            ref={inputRef}
          />
          {showSuggestions && (
            <div
              className="suggestion-container"
            >
              <ul>
                {suggestions?.map((movie, id) => (
                  <li onClick={(e) => {
                    handleSuggestionClick(e, movie)
                  }}>{movie}</li>
                ))}

              </ul>
            </div>
          )}
        </div>
        <button className="search-btn" onClick={handleSearchClick}>Search</button>
      </div>
      <InfiniteScroll
        dataLength={moviesList?.length}
        hasMore={page < total_pages}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div>
          {isSearchTrue && search_movies?.length > 0 ? (
            <div className="movies-container">
              {search_movies.length > 0 && search_movies?.map((movie, id) => {
                return <MoviesListItem moviesdata={movie} key={id} />
              })}
            </div>
          ) : (
            <>
              {moviesList && moviesList?.map((movies, id) => {
                return movies?.moviesList?.length > 0 && (<>
                  <h2>{movies?.selected_year}</h2>
                  <div className="movies-container">
                    {movies?.moviesList && movies?.moviesList.map((movie) => {
                      return <MoviesListItem moviesdata={movie} key={id} />
                    })}
                  </div>
                </>
                )
              })}
            </>
          )
          }
        </div>
      </InfiniteScroll>
    </main>
  );
}