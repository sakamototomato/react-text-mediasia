import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Miner } from "../../api/space/types"

export interface MinerListSlice {
    miners: Array<Miner>
}

const initialState: MinerListSlice = {
    miners: [],
}

export const counterSlice = createSlice({
    name: 'miners',
    initialState,
    reducers: {
        reset: (state, action: PayloadAction<Array<Miner>>) => {
            return { ...state, miners: action.payload }
        },
        add: (state, action: PayloadAction<Miner>) => {
            const result: Array<Miner> = new Array()
            result.push(...state.miners, action.payload)
            return { ...state, miners: result }
        },
    },
})

// Action creators are generated for each case reducer function
export const { reset, add } = counterSlice.actions

export const minerReducer = counterSlice.reducer