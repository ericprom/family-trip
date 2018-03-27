export let foursquare = (state={isFetching : false, items : []},action) => {
    switch(action.type){
        case 'Start_Search':
            return {
                isFetching : true
            }
        case 'End_Search':
            return{
                isFetching : false,
                items : action.items
            }
        default:   
            return state;
    }
}