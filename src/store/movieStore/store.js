import React from "react";
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import moviesReducer from './movieReducer'
// Using Combine Reducers here although only one reducer is present.
const reducer = combineReducers({ movies: moviesReducer });

const composeEnhanced = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // The first one is to make the chrome dev extension work

export const store = createStore(reducer, applyMiddleware(thunk)); // We are using thunk, because it allows delaying the dispatch actions
