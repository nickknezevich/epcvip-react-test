import React, { useReducer, createContext } from "react";

export const initialState = {
  users: [],
  loading: false,
  error: null
};

export const reducer = (state, action) => {
  
  switch (action.type) {
    case "ADD_USERS":
      return { ...state, users: action.payload };
    case "ADD_USER":
      return {
        users: [...state.users, action.payload]
      };
    case "UPDATE_USER":
      let match = _.find(state.users, function(item) { return item.id === action.payload.id })
      let index = _.findIndex(state.users, function(item) { return item.id == action.payload.id })
      state.users[index] = action.payload
      return {
        users: state.users
      };
    case "DELETE_USER":
      return {
        users: state.users.filter(
          user => user.id !== action.payload
        )
      };
    case "START":
      return {
        loading: true
      };
    case "COMPLETE":
      return {
        loading: false
      };
    default:
      throw new Error();
  }
};