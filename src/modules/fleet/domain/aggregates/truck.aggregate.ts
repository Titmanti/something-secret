import { AggregateRoot } from '@nestjs/cqrs';
import { err, ok, type Result } from 'neverthrow';
import { CountableEquipment } from '../constants/truck-equipment.constants.js';
import type {
  Equipment,
  TruckProperties,
} from '../interfaces/truck-props.interface.js';

export type TruckDomainError = {
  readonly type: 'INVALID_TRUCK';
  readonly message: string;
};

function domainError(message: string): TruckDomainError {
  return { type: 'INVALID_TRUCK', message };
}

function isPositiveFiniteNumber(value: number): boolean {
  return Number.isFinite(value) && value > 0;
}

function validateEquipment(equipment: readonly Equipment[]): string | null {
  const seen = new Set<string>();

  for (const item of equipment) {
    if (seen.has(item.type)) {
      return `Equipment "${item.type}" must not be duplicated`;
    }
    seen.add(item.type);

    const countable = (CountableEquipment as readonly string[]).includes(
      item.type,
    );

    if (item.countable !== countable) {
      return `Equipment "${item.type}" has an invalid countable flag`;
    }

    if (item.countable && (!Number.isInteger(item.count) || item.count < 1)) {
      return `Equipment "${item.type}" count must be a positive integer`;
    }
  }

  return null;
}

/**
 * Domain aggregate for a physical truck. It intentionally contains no
 * TypeORM decorators or persistence concerns.
 */
export class TruckAggregate extends AggregateRoot {
  private constructor(private state: TruckProperties) {
    super();
    this.state = TruckAggregate.copy(state);
  }

  static create(
    props: TruckProperties,
  ): Result<TruckAggregate, TruckDomainError> {
    if (!props.id.trim()) {
      return err(domainError('Truck id is required'));
    }
    if (!props.make.trim() || !props.model.trim()) {
      return err(domainError('Truck make and model are required'));
    }
    if (!props.vin.trim()) {
      return err(domainError('Truck VIN is required'));
    }
    if (!Number.isInteger(Number(props.year)) || Number(props.year) < 1900) {
      return err(domainError('Truck year must be a valid year'));
    }
    if (!isPositiveFiniteNumber(props.payload)) {
      return err(domainError('Truck payload must be greater than zero'));
    }

    const { length, width, height } = props.dimensions;
    if (
      !isPositiveFiniteNumber(length) ||
      !isPositiveFiniteNumber(width) ||
      !isPositiveFiniteNumber(height)
    ) {
      return err(domainError('Truck dimensions must all be greater than zero'));
    }

    const equipmentError = validateEquipment(props.equipment ?? []);
    if (equipmentError) {
      return err(domainError(equipmentError));
    }

    return ok(new TruckAggregate(props));
  }

  get id(): string {
    return this.state.id;
  }

  get properties(): Readonly<TruckProperties> {
    return TruckAggregate.copy(this.state);
  }

  changePayload(payload: number): Result<void, TruckDomainError> {
    if (!isPositiveFiniteNumber(payload)) {
      return err(domainError('Truck payload must be greater than zero'));
    }

    this.state = { ...this.state, payload, updatedAt: new Date() };
    return ok(undefined);
  }

  replaceEquipment(
    equipment: Equipment[],
  ): Result<void, TruckDomainError> {
    const validationError = validateEquipment(equipment);
    if (validationError) {
      return err(domainError(validationError));
    }

    this.state = {
      ...this.state,
      equipment: equipment.map((item) => ({ ...item })),
      updatedAt: new Date(),
    };
    return ok(undefined);
  }

  private static copy(props: TruckProperties): TruckProperties {
    return {
      ...props,
      licensePlate: { ...props.licensePlate },
      dimensions: { ...props.dimensions },
      equipment: props.equipment?.map((item) => ({ ...item })),
      createdAt: new Date(props.createdAt),
      updatedAt: props.updatedAt ? new Date(props.updatedAt) : undefined,
    };
  }
}
