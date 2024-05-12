import { useDispatch, useSelector } from "react-redux";
import { Asteroid, Miner, MiningEntity, Planet } from "./types";
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { useEffect } from "react";
import { reset } from "../../store/slices/miners";
import { useGetMiners } from "../../store/selectors/spaces";
import { NewMinerForm } from "../../pages/planets/newMinerForm";


/* All data should be accessible via a REST API structure:

GET /miners: return the list of miners
GET /miners?planetId=[planet ID]: return the list of miners from a given planet ID
GET /miners/[miner ID]: return a miner based on its ID
POST /miners: create a miner
PUT /miners/[miner ID]: update a miner based on its ID
DELETE /miners/[miner ID]: delete a miner based on its ID
*/
export const baseUri = "https://asteroids.dev.mediasia.cn/"



// const fetcher = (url: string) => fetch(url).then((res) => res.json())
// export const useGetMiners = () => useSWR<Array<Miner>, Error>(baseUri + "miners", fetcher)
// export const useGetMinerHistory = (minerId: string | number) => useSWR<Array<MiningEntity>, Error>(baseUri + "/history?minerId=" + minerId, fetcher)
// export const useGetPlanets = () => useSWR<Array<Planet>, Error>(baseUri + "planets", fetcher)
// export const useGetPlanetMiners = (planetId: string) =>
// useSWR<Array<Planet>, Error>(baseUri + "miners?planetId=" + planetId, fetcher)



export const spaceApi = createApi({
    reducerPath: 'spaceApi',
    baseQuery: fetchBaseQuery({ baseUrl: "https://asteroids.dev.mediasia.cn/" }),

    endpoints: (builder) => ({
        getMiners: builder.query<Array<Miner>, undefined>({
            query: () => `miners`,
        }),
        getMinerHistory: builder.query<Array<MiningEntity>, string | number>({
            query: (minerId) => "/history?minerId=" + minerId,
        }),
        getAsteroids: builder.query<Array<Asteroid>, undefined>({
            query: () => `asteroids`,
        }),
        getPlanets: builder.query<Array<Planet>, undefined>({
            query: () => `planets`,
        }),
        getPlanetMiners: builder.query<Array<Miner>, string>({
            query: (planetId) => "miners?planetId=" + planetId,
        }),
        postNewMiner: builder.mutation<Miner, NewMinerForm & {
            status: number,
            angle: number,
            x: number,
            y: number,
            minerals: number
        }>({
            query: (body) => ({
                url: `miners`,
                method: "POST",
                body
            }),
        }),
    }),
})

export const { useGetMinerHistoryQuery, useGetPlanetsQuery, useGetPlanetMinersQuery, useGetAsteroidsQuery, usePostNewMinerMutation } = spaceApi
export const useGetMinersQuery = () => {
    const dispatch = useDispatch()
    const queryRes = spaceApi.useGetMinersQuery(undefined)
    useEffect(() => {
        dispatch(reset(queryRes.data as Miner[]))
    }, [dispatch, queryRes.data])
    const minersObj = useGetMiners()
    return { ...queryRes, data: minersObj.miners, minersMap: minersObj.minersMap }
}