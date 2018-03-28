export let google = (state={ center: {lat: 13.7978114, lng: 100.4627011}},action) => {
    switch(action.type){
        case 'Get_Center_Map':
            return{
                ...state,
                center : action.payload
            }
        case 'Add_Map_Markers':
            return{
                ...state,
                markers : action.payload
            }

        case 'Selected_Marker':
            let markers = state.markers.map(marker => {
                if(marker.venue.id === action.payload.venue.id){
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