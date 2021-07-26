import {
  MUPI_MODEL_DESCRIPTION, MUPI_MODEL_IF_UPLOAD, MUPI_MODEL_ITEM_ID, MUPI_MODEL_TITLE,
} from '../constants';

export type FormattedMupiModelItemStructure = {
  key: string;
  description: string;
  type: string;
  upload?: boolean;
  id?: boolean;
};

export type FormattedMupiModelStructure = {
  title: string;
  subtitle?: string;
  items: FormattedMupiModelItemStructure[]
};

export function formatThenResolveMupiModelStructure(MupiModel):
FormattedMupiModelStructure | boolean {
  try {
    const formatted = { items: [] } as FormattedMupiModelStructure;
    const { title, subtitle } = Reflect.getMetadata(MUPI_MODEL_TITLE, MupiModel);
    const items:
    { [key: string]
    : { name: string, type: string }
    } = Reflect.getMetadata(MUPI_MODEL_DESCRIPTION, MupiModel.prototype);
    const uploads = Reflect.getMetadata(MUPI_MODEL_IF_UPLOAD, MupiModel.prototype);
    const id = Reflect.getMetadata(MUPI_MODEL_ITEM_ID, MupiModel.prototype);

    formatted.title = title;
    formatted.subtitle = subtitle;

    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const key in items) {
      formatted.items.push({
        key,
        id: key === id,
        description: items[key].name,
        type: items[key].type,
        upload: uploads ? !!uploads[key] : false,
      });
    }

    return formatted;
  } catch (e) {
    return false;
  }
}
