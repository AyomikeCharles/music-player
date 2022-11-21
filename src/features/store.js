import { configureStore } from '@reduxjs/toolkit';
import playReducer from './slicer'

export default configureStore({
    reducer:{
        musicDetails:playReducer,
    },
})