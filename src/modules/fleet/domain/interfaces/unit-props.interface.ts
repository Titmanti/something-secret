import { DriverProperties } from './driver-props.interface.js';
import { TruckProperties } from './truck-props.interface.js';

export type LocationCoordinates = {
    city: string;
    state: string;
    zip?: string;
    latitude?: number;
    longitude?: number;
};

export type UnitStatus = 'AVAILABLE' | 'DISPATCHED' | 'MAINTENANCE' | 'OFF_DUTY';

export type UnitEssentialProperties = Required<{
    id: string;
    unitNumber: string;
    truck: TruckProperties; 
    drivers: [] | [DriverProperties] | [DriverProperties, DriverProperties];
    status: UnitStatus;

    createdAt: Date;
}>;

export type UnitOptionalProperties = Partial<{
    availableAt: Date;
    availableLocation: LocationCoordinates;

    notes: string;
    updatedAt: Date;
}>;

export type UnitProperties = 
    UnitEssentialProperties & UnitOptionalProperties;