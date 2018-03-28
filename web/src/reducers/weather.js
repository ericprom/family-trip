import * as types from '../actions/mutation-types'

export let weather = (state={},action) => {
    switch(action.type){
        case types.START_WEATHER_SEARCH:
            return {
                ...state,
                isFetching : true
            }
        case types.END_WEATHER_SEARCH:
            return{
                ...state,
                isFetching : false,
                items : action.payload
            }
        case types.SELECTED_WEATHER:
            let items = state.items.map(item => {
                if(item.id === action.payload.id){
                    return {...item, highlighted: true}
                }
                else{
                   return {...item, highlighted: false}
               }
            })

            return {
                ...state,
                isFetching : false,
                items : items
            }
        default:   
            return state;
    }
}