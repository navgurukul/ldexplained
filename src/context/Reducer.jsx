const reducer = (state, action)=>{
    switch (action.type){
        case "DOCTER_ID":
            return {...state, doctorId:action.payload}
        case "DOCTER_FILTERED_LIST":
            return {...state, doctorFilteredList:action.payload}
            case "DOCTER_INDIVIDUAL_DATA":
            return {...state, doctorIndividualData:action.payload}
        default:
            throw new Error("No Matcher Action!")
    }
}

export default reducer;