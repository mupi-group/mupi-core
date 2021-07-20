import { MUPI_MODEL_IF_UPLOAD } from '../constants';

export function Upload(): PropertyDecorator {
  return (
    _,
    propertyKey,
  ) => {
    const definedMetadata = Reflect.getMetadata(MUPI_MODEL_IF_UPLOAD, _);

    Reflect.defineMetadata(
      MUPI_MODEL_IF_UPLOAD,
      { ...definedMetadata, [propertyKey]: true },
      _,
    );
  };
}
