import { configureStore } from '@reduxjs/toolkit'
import { spaceApi } from '../api'
import { minerReducer } from './slices/miners'

export const store = configureStore({
    reducer: {
        [spaceApi.reducerPath]: spaceApi.reducer,
        miners: minerReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(spaceApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch