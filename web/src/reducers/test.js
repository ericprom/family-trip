export let test = (state={disableViewButton: false},action) => {
    switch(action.type){
        case 'Disable_View_Button':
            return{
                disableViewButton : action.payload
            }
        default:   
            return state;
    }
}