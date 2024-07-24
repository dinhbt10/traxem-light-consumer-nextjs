export interface IIofoBusiness {
    id: string;
    displayName: string;
    logoImageId: string;
    logoImageUrl: string;
    phoneNumber: string;
    address: string;
}

export interface ITabs {
    id: string;
    label: string;
    index: number;
    publicStatus: boolean;
    tabType: string;
    groupInfos: Item[];
}

export interface IGropupInfo {
    id: string;
    label: string;
    index: number;
    publicStatus: boolean;
    fields: {
        id: string;
        label: string;
        index: number;
        publicStatus: boolean;
        values:
            | string[]
            | {
                  id: string;
                  fileName: string;
                  dowloadUrl: string;
                  metaData: {
                      id: string;
                      fileName: string;
                      metakey: string;
                      metaValue: string;
                  };
              }[];
        type: string;
    }[];
}

export interface IProductInfo {
    id: string;
    enterpriseId: string;
    lotCode: string;
    nameProduct: string;
    qrType: string;
    visibleLogo: boolean;
    status: string;
    nameLot: string;
    images: {
        id: string;
        imageFileId: string;
        imageUrl: string;
    }[];
    tabs: ITabs[];
}

export interface MetaData {
    id: string;
    fileName: string;
    metaKey: string;
    metaValue: string;
}

export interface ValueObject {
    dowloadUrl: string;
    fileName: string;
    id: string;
    metaData: MetaData;
}

export interface Item {
    id: string;
    label: string;
    index: number;
    publicStatus: boolean;
    fields: IFiedlItem[]; ///
}

export interface IFiedlItem {
    id: string;
    label: string;
    index: number;
    publicStatus: boolean;
    type: string;
    values: ValueObject[] | string[];
}
