import React, {createContext, useContext, useReducer} from "react"
import reducer from "./Reducer";

const initialState = {
    doctorId:"",
    doctorFilteredList:[],
    doctorIndividualData:""
}

const Context = createContext(initialState);


export const useValue = ()=>{
    return useContext(Context);
};

const ContextProvider = ({ children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <Context.Provider value={{state, dispatch}}> {children} </Context.Provider>
    )
}

export default ContextProvider;