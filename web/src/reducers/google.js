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
        default:   
            return state;
    }
}