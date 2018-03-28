import * as types from '../actions/mutation-types'

export let google = (state={ center: {lat: 13.7978114, lng: 100.4627011}},action) => {
    switch(action.type){
        case types.SET_MAP_CENTER:
            return{
                ...state,
                center : action.payload
            }
        case types.ADD_MAP_MARKER:
            return{
                ...state,
                markers : action.payload
            }

        case types.SELECTED_MARKER:
            let markers = state.markers.map(marker => {
                if(marker.id === action.payload.id){
                    return {...marker, highlighted: true}
                }
                else{
                   return {...marker, highlighted: false}
               }
            })
            return {
                ...state,
                markers : markers
            }
        default:   
            return state;
    }
}