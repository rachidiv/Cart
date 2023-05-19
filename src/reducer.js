
const reducer = (state,action) => {
  if(action.type === 'CLEAR-CART'){

    return {...state, cart:[]}

  }
  if(action.type === 'REMOVE'){
    return {...state, cart:state.cart.filter((item) => {
        return item.id !== action.payload
    })}
  }


  if(action.type === 'GET-TOTAL'){
    
    let {total, amount} = state.cart.reduce((totalItem, currentItem) => {
        const {price, amount} = currentItem
        const itemTotal = currentItem.amount *  currentItem.price 
             totalItem.total += itemTotal
             totalItem.amount += amount
             return totalItem;
    },{
      total:0,
      amount:0
    })

    total = parseFloat(total.toFixed(2))

    return {...state, total, amount}

  }

  if(action.type === 'LOADING'){
    return{...state, loading:true}
  }
if(action.type === 'DISPLAY-CART'){
  return {...state, cart:action.payload, loading:false}
}
if(action.type === 'TOGGLE-AMOUNT'){
  const tempCart = state.cart.map((currentItem) => {
    if(currentItem.id === action.payload.id){
      if(action.payload.type === 'increase'){
        return {...currentItem, amount:currentItem.amount + 1}
      }
      if(action.payload.type === 'decrease'){
        return {...currentItem, amount:currentItem.amount - 1}
      }
      
    }
    return currentItem;
  }).filter((item) => item.amount !== 0)

  return{...state, cart: tempCart}
}

  return state;
}
export default reducer;