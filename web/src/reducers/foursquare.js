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
        case 'Selected_Venue':
            let groups = state.groups.map(group => {
                if(group.venue.id === action.payload.id){
                    return {...group, highlighted: true}
                }
                else{
                   return {...group, highlighted: false}
               }
            })

            return {
                isFetching : false,
                groups : groups
            }
        default:   
            return state;
    }
}