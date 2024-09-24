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
    language: string;
    productionDate: string;
    expirationDate: string;
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

export type DataLanguage = {
    batchName: string;
    manufacturingBatch: string;
    manufacturingDate: string;
    expiryDate: string;
    qRSerial: string;
};

export type DefaultLanguageConfig = {
    languageLabel: string;
    language: string;
    data: DataLanguage;
};

export const configLanguageDefault: DefaultLanguageConfig[] = [
    {
        language: "vi",
        languageLabel: "Tiếng Việt",
        data: {
            batchName: "Tên lô",
            manufacturingBatch: "Lô sản xuất",
            manufacturingDate: "Ngày sản xuất",
            expiryDate: "Ngày hết hạn",
            qRSerial: "QR sê ri"
        }
    },
    {
        language: "en",
        languageLabel: "Tiếng Anh",
        data: {
            batchName: "Batch Name",
            manufacturingBatch: "Batch Number",
            manufacturingDate: "Production date",
            expiryDate: "Expiration date",
            qRSerial: "QR series"
        }
    },
    {
        language: "zh",
        languageLabel: "Tiếng Trung",
        data: {
            batchName: "批次名称",
            manufacturingBatch: "批次号码",
            manufacturingDate: "生产日期",
            expiryDate: "过期日期",
            qRSerial: "QR 系列"
        }
    },
    {
        language: "fr",
        languageLabel: "Tiếng Pháp",
        data: {
            batchName: "Nom du lot",
            manufacturingBatch: "Numéro de lot",
            manufacturingDate: "Date de production",
            expiryDate: "Date d'expiration",
            qRSerial: "Série QR"
        }
    },
    {
        language: "ja",
        languageLabel: "Tiếng Nhật",
        data: {
            batchName: "バッチ名",
            manufacturingBatch: "バッチ番号",
            manufacturingDate: "生産日",
            expiryDate: "有効期限",
            qRSerial: "QRシリーズ"
        }
    },
    {
        language: "ko",
        languageLabel: "Tiếng Hàn",
        data: {
            batchName: "배치이름",
            manufacturingBatch: "배치 번호",
            manufacturingDate: "생산 날짜",
            expiryDate: "만료 날짜",
            qRSerial: "QR 시리즈"
        }
    },
    {
        language: "ru",
        languageLabel: "Tiếng Nga",
        data: {
            batchName: "Название партии",
            manufacturingBatch: "Номер партии",
            manufacturingDate: "Дата производства",
            expiryDate: "Срок годности",
            qRSerial: "QR серия"
        }
    },
    {
        language: "de",
        languageLabel: "Tiếng Đức",
        data: {
            batchName: "Chargenname",
            manufacturingBatch: "Chargennummer",
            manufacturingDate: "Produktionsdatum",
            expiryDate: "Verfallsdatum",
            qRSerial: "QR-Serie"
        }
    },
    {
        language: "es",
        languageLabel: "Tiếng Tây Ban Nha",
        data: {
            batchName: "Nombre del lote",
            manufacturingBatch: "Número de lote",
            manufacturingDate: "Fecha de producción",
            expiryDate: "Fecha de caducidad",
            qRSerial: "Serie QR"
        }
    },
    {
        language: "ar",
        languageLabel: "Tiếng Ả Rập Saudi",
        data: {
            batchName: "اسم الدفعة",
            manufacturingBatch: "رقم الدفعة",
            manufacturingDate: "تاريخ الإنتاج",
            expiryDate: "تاريخ الانتهاء",
            qRSerial: "QR سلسلة"
        }
    }
];

export function convertToDate(isoString: string): string {
    // Tạo một đối tượng Date từ chuỗi ISO
    const date = new Date(isoString);

    // Kiểm tra nếu chuỗi không hợp lệ (Invalid Date)
    if (isNaN(date.getTime())) {
        return isoString;
    }

    // Lấy ngày, tháng, năm từ đối tượng Date
    const day = String(date.getDate()).padStart(2, "0"); // Lấy ngày và đảm bảo có 2 chữ số
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Lấy tháng (lưu ý getMonth trả về từ 0-11)
    const year = date.getFullYear(); // Lấy năm

    // Trả về kết quả theo định dạng dd/mm/yyyy
    return `${day}/${month}/${year}`;
}

export function formatDate(isoString: string): string {
    const date: Date = new Date(isoString);
    const day: string = date.getDate().toString().padStart(2, "0");
    const month: string = (date.getMonth() + 1).toString().padStart(2, "0");
    const year: string = date.getFullYear().toString();
    return `${day}/${month}/${year}`;
}

export function formatDateTime24(dateString: string): string {
    const date = new Date(dateString);

    // Lấy giờ UTC và chuyển đổi sang GMT+7
    const utcHours = date.getUTCHours();
    const gmt7Hours = utcHours + 7;
    date.setUTCHours(gmt7Hours);

    // Lấy ngày, tháng, năm
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0, nên cần cộng thêm 1
    const year = String(date.getUTCFullYear()).toString();

    // Lấy giờ và phút theo định dạng 24 giờ
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes}`;
}
