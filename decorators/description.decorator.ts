import { MUPI_MODEL_DESCRIPTION } from '../constants';

export type DescriptionOptions = {
  description: string
};

export function Description(description?: DescriptionOptions | string): PropertyDecorator {
  return (
    _,
    propertyKey,
  ) => {
    const descriptionOptions = description as DescriptionOptions;
    const descriptionName = (descriptionOptions && descriptionOptions.description)
            || (typeof description === 'string' && description)
            || propertyKey;

    const definedMetadata = Reflect.getMetadata(MUPI_MODEL_DESCRIPTION, _);

    Reflect.defineMetadata(
      MUPI_MODEL_DESCRIPTION,
      { ...definedMetadata, [propertyKey]: descriptionName },
      _,
    );
  };
}
