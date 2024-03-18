import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store';
import { CoinAPIDataResponses, SetAssetsPayload } from './coinAPI.types'

// Define a type for the slice state
interface CoinAPIState {
  assets: any,
  assetsIcons: any,
  favoritedAssets: any;
}

// Define the initial state using that type
const initialState: CoinAPIState = {
  assets: undefined,
  assetsIcons: undefined,
  favoritedAssets: undefined,
}

export const coinAPISlice = createSlice({
    name: 'coinAPI',
    initialState,
    reducers: {
        setAllData: (state, action: PayloadAction<CoinAPIDataResponses>) => {

            state.assets = action.payload.assets;
            state.assetsIcons = action.payload.assetsIcons;
            state.favoritedAssets = action.payload.favoritedAssets;

        },
        setAssets: (state, action: PayloadAction<SetAssetsPayload>) => {

            state.assets = action.payload.assets; 

        }
    },
})

export const { setAllData, setAssets } = coinAPISlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectAssets = (state: RootState) => state.coinAPI.assets;
export const selectAssetsIcons = (state: RootState) => state.coinAPI.assetsIcons;
export const selectFavoritedAssets = (state: RootState) => state.coinAPI.favoritedAssets;


export default coinAPISlice.reducer;