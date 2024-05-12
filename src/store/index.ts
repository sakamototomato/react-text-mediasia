import { configureStore } from '@reduxjs/toolkit'
import { spaceApi } from '../api'

export const store = configureStore({
    reducer: {
        [spaceApi.reducerPath]: spaceApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(spaceApi.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch