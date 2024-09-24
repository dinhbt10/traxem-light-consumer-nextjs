import { DefaultLanguage } from "@/types/conmon";

export const DATE_FORMAT = {
    DDMMYYYY: "DD/MM/YYYY",
    MMM: "MMM",
    MMMM: "MMMM",
    DDMMYYYYHHmmss: "DD/MM/YYYY HH:mm:ss",
    HHmmssDDMMYYYY: "HH:mm:ss DD/MM/YYYY",
    HHmmDDMMYYYY: "HH:mm - DD/MM/YYYY",
    DoMMMYY: "Do MMM YY"
};

export const configLanguage: DefaultLanguage[] = [
    {
        value: "vi",
        label: "Tiếng Việt"
    },
    {
        value: "en",
        label: "English"
    },
    {
        value: "zh",
        label: "中国人"
    },
    {
        value: "fr",
        label: "Français"
    },
    {
        value: "ja",
        label: "日本語"
    },
    {
        value: "ko",
        label: "한국인"
    },
    {
        value: "ru",
        label: "Русский"
    },
    {
        value: "de",
        label: "Deutsch"
    },
    {
        value: "es",
        label: "Español"
    },
    {
        value: "ar",
        label: "السعودية"
    }
];
