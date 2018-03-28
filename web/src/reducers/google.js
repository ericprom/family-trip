export let google = (state={},action) => {
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