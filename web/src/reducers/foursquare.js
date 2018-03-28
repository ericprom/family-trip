import * as types from '../actions/mutation-types'

export let foursquare = (state={},action) => {
    switch(action.type){
        case types.START_SEARCH:
            return {
                ...state,
                isFetching : true
            }
        case types.END_SEARCH:
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
        case types.DISABLE_MARKER_CLICK:
            return{
                ...state,
                disableViewButton : action.payload
            }
        default:   
            return state;
    }
}