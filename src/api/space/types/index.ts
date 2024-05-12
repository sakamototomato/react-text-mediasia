// all of theose types are generated in https://tongyi.aliyun.com/qianwen/?sessionId=944c923410c64728ba2235033ff86dd8
// it also a site like ChatGPT
export type Miner = {
    _id: string;
    name: string;
    planet: string; // Assuming the planet ID is also a string
    x: number;
    y: number;
    angle: number;
    carryCapacity: number;
    travelSpeed: number;
    miningSpeed: number;
    status: number;
    minerals: number;
    __v: number;
    target: string; // Represents the target (e.g., Asteroid) ID
    targetType: string; // Describes the type of the target, e.g., "Asteroid"
}
export type Asteroid = {
    position: {
        x: number;
        y: number;
    };
    capability: number;
    _id: string;
    name: string;
    minerals: number;
    status: number;
    currentMiner: string | null; // Assuming it's either a string (miner ID) or null if unoccupied
    __v: number;
}
export type Planet = {
    position: {
        x: number;
        y: number;
    };
    _id: string;
    name: string;
    minerals: number;
    miners: number;
    __v: number;
    capability: number;
}
export type MiningEntity = {
    capacity: {
        current: number;
        max: number;
    };
    speed: {
        travel: number;
        mining: number;
    };
    position: {
        x: number;
        y: number;
    };
    _id: string;
    year: number;
    planet: string;
    status: number;
    miner: string; // Presumably the ID of the associated miner
    createdAt: string;
    updatedAt: string;
    __v: number;
}
/*
0 (int): Idle
1 (int): Traveling
2 (int): Mining
3 (int): Transfering minerals to planet
*/
export enum EMinerStatus {
    "Idle",
    "Traveling",
    "Mining",
    "Transfering"
}


export enum EminerEntityStatus {
    /*
    Miner spawn on planet [planet name]

    Traveling from planet [planet name] to asteroid [asteroid name]

    Mining asteroid [asteroid name] for [number of years] years
    Traveling back from asteroid [asteroid name] to [planet name]

    Transfering minerals to planet [planet name]

    ... and others if you think they make sense
    */

}