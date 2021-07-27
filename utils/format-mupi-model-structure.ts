import {
  MUPI_MODEL_DESCRIPTION,
  MUPI_MODEL_IF_UPLOAD,
  MUPI_MODEL_ITEM_ID,
  MUPI_MODEL_ITEM_IF_LISTED,
  MUPI_MODEL_TITLE,
} from '../constants';

export type FormattedMupiModelItemStructure = {
  key: string;
  description: string;
  type: string;
  graphqlType?: string;
  typescriptType?: string;
  upload?: boolean;
  id?: boolean;
  listed?: boolean;
};

export type FormattedMupiModelStructure = {
  title: string;
  subtitle?: string;
  items: FormattedMupiModelItemStructure[]
};

export enum MupiGraphQLType {
  Int = 'Int',
  String = 'String',
  IntList = '[Int]',
  StringList = '[String]',
  ID = 'String!',
}

export enum MupiTypescriptType {
  Number = 'number',
  String = 'string',
  NumberList = 'number[]',
  StringList = 'string[]',
  ID = 'string',
}

export function getGraphQLType(type: string, listed: boolean, identifier: boolean): string {
  if (identifier) return MupiGraphQLType.ID;

  if (listed) {
    switch (type) {
      case 'String':
        return MupiGraphQLType.StringList;
      case 'Number':
        return MupiGraphQLType.IntList;
        // todo: give default list type a scalar
      default:
        return MupiGraphQLType.StringList;
    }
  } else {
    switch (type) {
      case 'String':
        return MupiGraphQLType.String;
      case 'Number':
        return MupiGraphQLType.Int;
        // todo: give default type a scalar
      default:
        return MupiGraphQLType.String;
    }
  }
}

export function getTypescriptType(type: string, listed: boolean, identifier: boolean): string {
  if (identifier) return MupiTypescriptType.ID;

  if (listed) {
    switch (type) {
      case 'String':
        return MupiTypescriptType.StringList;
      case 'Number':
        return MupiTypescriptType.NumberList;
        // todo: give default list type a scalar
      default:
        return MupiTypescriptType.StringList;
    }
  } else {
    switch (type) {
      case 'String':
        return MupiTypescriptType.String;
      case 'Number':
        return MupiTypescriptType.Number;
        // todo: give default type a scalar
      default:
        return MupiTypescriptType.String;
    }
  }
}

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
    const listedList = Reflect.getMetadata(MUPI_MODEL_ITEM_IF_LISTED, MupiModel.prototype);
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
        graphqlType: getGraphQLType(
          items[key].type,
          (listedList ? !!listedList[key] : false),
          key === id,
        ),
        typescriptType: getTypescriptType(
          items[key].type,
          (listedList ? !!listedList[key] : false),
          key === id,
        ),
        listed: listedList ? !!listedList[key] : false,
        upload: uploads ? !!uploads[key] : false,
      });
    }

    return formatted;
  } catch (e) {
    return false;
  }
}
