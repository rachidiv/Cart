import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()
const initialeState = {
  loading:false,
  cart:cartItems,
  total:0,
  amount:0

}
const AppProvider = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialeState)
  const clearCart = () => {
    dispatch({type:'CLEAR-CART'})
  }
  const remove = (id) => {
    dispatch({type:'REMOVE', payload:id})
  }
  
  const fetchData = async () => {
    dispatch({type:'LOADING'})
    const response = await fetch(url)
    const cart = await response.json()
    dispatch({type:'DISPLAY-CART', payload:cart})
  }
  const toggleAmount = (id, type) => {
    dispatch({type:'TOGGLE-AMOUNT', payload:{id, type}})
  }
  
  useEffect(() => {
    fetchData();
  },[])

  useEffect(() => {
    dispatch({type:'GET-TOTAL'})
  },[state.cart])

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        toggleAmount
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
