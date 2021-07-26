import { MUPI_MODEL_ITEM_IF_LISTED } from '../constants';

export function List(): PropertyDecorator {
  return (
    _,
    propertyKey,
  ) => {
    const definedMetadata = Reflect.getMetadata(MUPI_MODEL_ITEM_IF_LISTED, _);

    Reflect.defineMetadata(
      MUPI_MODEL_ITEM_IF_LISTED,
      { ...definedMetadata, [propertyKey]: true },
      _,
    );
  };
}
