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
