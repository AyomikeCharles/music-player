import { createSlice } from '@reduxjs/toolkit';
import songData from '../song/songsdata'
const initialState = {
    album:songData.collections,
    value: songData.collections[0],
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