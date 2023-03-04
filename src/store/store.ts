import { combineReducers, configureStore } from '@reduxjs/toolkit';


const rootReducer = combineReducers({

});

export const store = configureStore({
	reducer: rootReducer,
});

export type TypeRootState = ReturnType<typeof rootReducer>;