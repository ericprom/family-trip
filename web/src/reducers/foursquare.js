import * as types from '../actions/mutation-types'

export let foursquare = (state={items:[],categories:[]},action) => {
    switch(action.type){
        case types.START_SEARCH:
            return {
                ...state,
                isFetching : true
            }
        case types.END_CATEGORY_SEARCH:
            return{
                ...state,
                isFetching : false,
                categories : action.payload
            }
        case types.SELECTED_CATEGORY:
            let categories = categories.items.map(item => {
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
                categories : categories
            }
        case types.END_VENUE_SEARCH:
            return{
                ...state,
                isFetching : false,
                items : action.payload
            }
        case types.SELECTED_VENUE:
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
            return state
    }
}