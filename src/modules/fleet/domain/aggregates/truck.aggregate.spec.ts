import { describe, expect, it } from 'vitest';
import { TruckEquipment } from '../constants/truck-equipment.constants.js';
import { TruckType } from '../constants/truck-type.constants.js';
import type { TruckProperties } from '../interfaces/truck-props.interface.js';
import { TruckAggregate } from './truck.aggregate.js';

function validTruck(overrides: Partial<TruckProperties> = {}): TruckProperties {
  return {
    id: 'truck_01',
    type: TruckType.SMALL_STRAIGHT,
    make: 'Ford',
    model: 'Transit',
    year: '2023',
    vin: '1FTBR1C80PKA00001',
    licensePlate: { number: 'ABC123', state: 'TX' },
    payload: 3000,
    dimensions: { length: 20, width: 8, height: 9 },
    createdAt: new Date('2026-01-01T00:00:00.000Z'),
    ...overrides,
  };
}

describe('TruckAggregate', () => {
  it('creates a truck when required properties are valid', () => {
    const result = TruckAggregate.create(validTruck());

    expect(result.isOk()).toBe(true);
    expect(result._unsafeUnwrap().id).toBe('truck_01');
  });

  it('rejects a non-positive payload', () => {
    const result = TruckAggregate.create(validTruck({ payload: 0 }));

    expect(result.isErr()).toBe(true);
    expect(result._unsafeUnwrapErr().message).toContain('payload');
  });

  it('rejects invalid dimensions', () => {
    const result = TruckAggregate.create(
      validTruck({ dimensions: { length: 20, width: 0, height: 9 } }),
    );

    expect(result.isErr()).toBe(true);
    expect(result._unsafeUnwrapErr().message).toContain('dimensions');
  });

  it('rejects duplicate equipment entries', () => {
    const result = TruckAggregate.create(
      validTruck({
        equipment: [
          { countable: false, type: TruckEquipment.LIFT_GATE },
          { countable: false, type: TruckEquipment.LIFT_GATE },
        ],
      }),
    );

    expect(result.isErr()).toBe(true);
    expect(result._unsafeUnwrapErr().message).toContain('duplicated');
  });

  it('rejects a countable item with a zero count', () => {
    const result = TruckAggregate.create(
      validTruck({
        equipment: [
          { countable: true, type: TruckEquipment.LOADING_RAMPS, count: 0 },
        ],
      }),
    );

    expect(result.isErr()).toBe(true);
    expect(result._unsafeUnwrapErr().message).toContain('positive integer');
  });
});
