export const TruckEquipment = {
    LIFT_GATE: 'LIFT', // Liftgate (гидроборт)
    PALLET_JACK: 'JACK', // Pallet Jack (рохля)
    LOADING_RAMPS: 'RAMP', // Loading Ramps (трапы/пандусы)

    HORIZONTAL_E_TRACK: 'ETRK', // Horizontal E-Track
    VERTICAL_E_TRACK: 'VETK', // Vertical E-Track
    LOAD_BARS: 'BARS', // Load Bars / Lock Bars (распорные штанги)
    DECKING_BEAMS: 'DECK', // Decking Beams (балки второго этажа)

    // Ремни и цепи
    RATCHET_STRAPS: 'STRD', // Ratchet Straps (храповые ремни)
    CAM_STRAPS: 'CAMS', // Cam Buckle Straps (ремни с защелкой)
    CHAINS_AND_BINDERS: 'CHNX', // Chains & Binders (цепи для тяжелых грузов)
    FLATBED_TARPS: 'TARP', // Flatbed Tarps (тенты для бортовых)
    CORNER_PROTECTORS: 'CORN', // Corner Protectors (защита углов)

    // Защита груза и безопасность
    MOVING_BLANKETS: 'BLNK', // Moving Blankets / Pads (одеяла)
} as const;

export type TruckEquipment = (typeof TruckEquipment)[keyof typeof TruckEquipment];

export const CountableEquipment = [
    TruckEquipment.LOADING_RAMPS,
    TruckEquipment.LOAD_BARS,
    TruckEquipment.DECKING_BEAMS,
    TruckEquipment.RATCHET_STRAPS,
    TruckEquipment.CAM_STRAPS,
    TruckEquipment.CHAINS_AND_BINDERS,
    TruckEquipment.FLATBED_TARPS,
    TruckEquipment.CORNER_PROTECTORS,
    TruckEquipment.MOVING_BLANKETS,
] as const;

export type CountableEquipment = (typeof CountableEquipment)[number];

export const NotCountableEquipment = Object.values(TruckEquipment).filter(
    (eq): eq is Exclude<TruckEquipment, CountableEquipment> =>
        !(CountableEquipment as readonly string[]).includes(eq)
);

export type NotCountableEquipment = (typeof NotCountableEquipment)[number];