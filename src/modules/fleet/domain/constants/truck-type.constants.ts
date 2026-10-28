export const TruckType = {
    SMALL_STRAIGHT: "SLST",
    LARGE_STRAIGHT: "LEST"
} as const;
export type TruckType = (typeof TruckType)[keyof typeof TruckType];