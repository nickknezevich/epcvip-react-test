import React from 'react'
import { createContext, useContext, useReducer } from 'react'
export const StateContext = createContext();


export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

// this will let us interact with our Context State
export const useStateValue = () => useContext(StateContext)