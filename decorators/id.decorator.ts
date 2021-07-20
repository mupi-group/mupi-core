import { MUPI_MODEL_ITEM_ID } from '../constants';

export function ID(): PropertyDecorator {
  return (
    _,
    propertyKey,
  ) => {
    Reflect.defineMetadata(
      MUPI_MODEL_ITEM_ID,
      propertyKey,
      _,
    );
  };
}
