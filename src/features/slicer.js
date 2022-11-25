import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    album:'',
    value: '',
    isLoop:false
}
export const playSlice = createSlice({
    name:'playing',
    initialState,
    reducers:{
        currentPlaying:(state, action)=>{
            state.album = action.payload.album
            state.value = action.payload.music
            state.isLoop = action.payload.loop
        }
    }

});

export const { currentPlaying } = playSlice.actions;

export default playSlice.reducer;