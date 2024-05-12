import * as yup from "yup"

export const minerSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    planet: yup.string().required("Planet is required"),
    carryCapacity: yup.number().required("carryCapacity is invald").max(99999).min(0),
    miningSpeed: yup.number().required("miningSpeed is invald").max(99999).min(0),
    travelSpeed: yup.number().required("travelSpeed is invald").max(99999).min(0)
});

export type NewMinerForm = {
    name: string,
    planet: string,
    carryCapacity: number,
    miningSpeed: number,
    travelSpeed: number
}