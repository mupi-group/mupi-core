import { MUPI_MODEL_TITLE } from '../constants';

export type TitleOptions = {
  title?: string
  subtitle?: string
};

export function Title(title?: TitleOptions | string): ClassDecorator {
  return (
    property,
  ) => {
    const titleOptions = title as TitleOptions || {};

    const titleFromOption = (titleOptions && titleOptions.title)
            || (typeof title === 'string' && title)
            || property.name;

    const titleMetadata: TitleOptions = {
      title: titleFromOption,
    };

    if (titleOptions.subtitle) titleMetadata.subtitle = titleOptions.subtitle;

    Reflect.defineMetadata(MUPI_MODEL_TITLE, titleMetadata, property);
  };
}
