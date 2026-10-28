import { TruckType } from "../constants/index.js";
import { TruckEquipment } from "../constants/index.js";

export type LicensePlate = {
    number: string;
    state: string;
};

export type Dimensions = {
    length: number;
    width: number;
    height: number;
}

export type Equipment = 
    | { countable: true; type: TruckEquipment, count: number }
    | { countable: false; type: TruckEquipment, count: never }

export type TruckEssentialProperties = Required<{
    id: string;

    type: TruckType

    make: string;
    model: string;
    year: string;
    
    vin: string;
    licensePlate: LicensePlate;

    payload: number;

    dimensions: Dimensions;

    createdAt: Date;
}>;

export type TruckOptionalProperties = Partial<{
    equipment?: Equipment[];

    updatedAt: Date;
}>;

export type TruckProperties = 
    TruckEssentialProperties & TruckOptionalProperties;