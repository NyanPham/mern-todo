import { useReducer } from "react";

const ACTIONS = {
    ON_CHANGE: "on-change"
}

interface IActionProps {
    type: string,
    payload?: any 
}

const reducer = (state: any, { type, payload } : IActionProps) => {
    switch (type) { 
        case ACTIONS.ON_CHANGE: 
            return {
                ...state,
                [payload.name]: payload.value
            }
    }
}

export default function useForm(initialState: any) {
    const [state, dispatch] = useReducer(reducer, initialState)  

    const onChange = (e) => {
        
    }
   
    return {    
        state,
        dispatch
    }
}