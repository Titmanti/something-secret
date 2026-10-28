import { plainToInstance } from 'class-transformer';
import { validateSync, type ValidationError } from 'class-validator';

type ClassConstructor<T extends object> = new () => T;

/**
 * Converts environment variables to a typed config class and validates it.
 * Implicit conversion is enabled because process.env values are strings.
 */
export function validateEnv<T extends object>(
  environment: Record<string, unknown>,
  validator: ClassConstructor<T>,
): T {
  const instance = plainToInstance(validator, environment, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(instance, {
    skipMissingProperties: false,
    whitelist: true,
  });

  if (errors.length > 0) {
    throw new Error(formatValidationErrors(errors));
  }

  return instance;
}

function formatValidationErrors(errors: ValidationError[]): string {
  return errors
    .map((error) => {
      const constraints = Object.values(error.constraints ?? {}).join(', ');
      return constraints
        ? `${error.property}: ${constraints}`
        : error.property;
    })
    .join('; ');
}
