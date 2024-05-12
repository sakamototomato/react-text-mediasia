import { useSelector } from "react-redux";
import { RootState } from "..";
import { useMemo } from "react";
import { Planet } from "../../api/types";

const getMiners = (root: RootState) => root.miners

export const getPlanets = (root: RootState) => root.spaceApi.queries["getPlanets(undefined)"]
export const useGetPlanets = () => {

    const res = useSelector(getPlanets)
    const dataMap = useMemo(() => {
        const map = new Map<string, Planet>()
        const dataArray = (res?.data as Array<Planet>) || []
        if (dataArray?.length > 0) {
            for (let item of dataArray) {
                map.set(item._id, item)
            }
        }
        return map
    }, [res?.data])
    return { ...res, dataMap }
}
export const useGetMiners = () => {
    const miners = useSelector(getMiners).miners
    return miners;
}