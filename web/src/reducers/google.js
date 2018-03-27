export let google = (state={center: {}},action) => {
    switch(action.type){
        case 'Get_Center_Map':
            return{
                center : action.payload
            }
        default:   
            return state;
    }
}