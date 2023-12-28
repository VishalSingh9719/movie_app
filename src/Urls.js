import React from "react";
import { Route, Routes, BrowserRouter, redirect } from "react-router-dom";

import { MoviesList } from "./components/moviesList/MoviesList";
import MovieDetails from "./components/moviesCard/MovieDetails";

function Urls(props) {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<MoviesList />}></Route>
                    <Route exact path="/movies/:id" element={<MovieDetails />}></Route>
                  </Routes>
                  </BrowserRouter>
        </div>
    )
};

export default Urls;