import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    general:[],
    random: [],
    jokes: []
}

export const messageSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        newMessage: (state, action) => {
            console.log(action.payload.c);
                if(action.payload.c == "general"){
                        state.general.push(action.payload.payload)
                } else{
                    console.log("kuch to gadbad h")
                }           
        }
    }
})

export const {newMessage} = messageSlice.actions;
export default messageSlice.reducer;