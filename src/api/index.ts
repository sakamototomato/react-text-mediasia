import useSWR from "swr";
import { Miner, Planet } from "./types";


/* All data should be accessible via a REST API structure:

GET /miners: return the list of miners
GET /miners?planetId=[planet ID]: return the list of miners from a given planet ID
GET /miners/[miner ID]: return a miner based on its ID
POST /miners: create a miner
PUT /miners/[miner ID]: update a miner based on its ID
DELETE /miners/[miner ID]: delete a miner based on its ID
*/
export const baseUri = "https://asteroids.dev.mediasia.cn/"



const fetcher = (url: string) => fetch(url).then((res) => res.json())
export const useGetMiners = () => useSWR<Array<Miner>, Error>(baseUri + "miners", fetcher)
export const useGetPlanets = () => useSWR<Array<Planet>, Error>(baseUri + "planets", fetcher)
export const useGetPlanetMiners = (planetId: string) =>
    useSWR<Array<Planet>, Error>(baseUri + "miners?planetId=" + planetId, fetcher)
