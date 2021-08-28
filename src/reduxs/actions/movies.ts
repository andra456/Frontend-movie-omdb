import { getAPIFetch } from '../services';
import { createSlice, Action, AnyAction, createAsyncThunk } from '@reduxjs/toolkit';



export const fetchSearch = createAsyncThunk(
  'movies/search',
  async (req: object, thunkAPI) => {
    const response = await getAPIFetch(req)
    return response.data
  }
)

export const fetchAllmovie = createAsyncThunk(
  'movies/movies',
  async (req: object, thunkAPI) => {
    const response = await getAPIFetch(req)
    return response.data

  }
)


export const fetchById = createAsyncThunk(
  'movies/detail',
  async (req: object, thunkAPI) => {
    const response = await getAPIFetch(req)
    return response.data
  }
)




interface RejectedAction extends Action {
  error: Error
}

function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith('rejected')
}


interface moviesState {
  movies: {
    all: [],
    totalResults: {},
    detail: {},
    search : []
  }
}


const InitialState = {
  movies: {
    all: [],
    totalResults: {},
    detail: { },
    search : []
  }
} as moviesState



const moviesAllSlice = createSlice({
  name: 'movies',
  initialState: InitialState,
  reducers: { },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearch.fulfilled, (state, action) => {
        state.movies = { ...state.movies, search: action.payload.Search }
      })
      .addCase(fetchById.fulfilled, (state, action) => {
        state.movies = { ...state.movies, detail: action.payload }
      })
      .addCase(fetchAllmovie.fulfilled, (state, action) => {
        state.movies = { ...state.movies, all: action.payload.Search, totalResults : action.payload.totalResults  }
      })
      // You can match a range of action types
      .addMatcher(
        isRejectedAction,
        // `action` will be inferred as a RejectedAction due to isRejectedAction being defined as a type guard
        (state, action) => { }
      )
      .addDefaultCase((state, action) => { })
  },
})





export default moviesAllSlice.reducer