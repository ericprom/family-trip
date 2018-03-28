export let foursquare = (state={},action) => {
    switch(action.type){
        case 'Start_Search':
            return {
                isFetching : true
            }
        case 'End_Search':
            return{
                isFetching : false,
                items : action.payload
            }
        case 'End_Group_Search':
            return{
                isFetching : false,
                groups : action.payload
            }
        default:   
            return state;
    }
}