import { AxiosRequestConfig, AxiosPromise } from "axios";
import { instance } from "@/libs/axios";

export const getPreviewData = <T>(qrSerise: T): AxiosPromise => {
    const request: AxiosRequestConfig = {
        url: `product/products/draft-product/${qrSerise}`,
        method: "GET"
    };

    return instance(request);
};

export const updateCount = (qrSerise: string): AxiosPromise => {
    const request: AxiosRequestConfig = {
        url: `/product/products/update-qr-scan-count/${qrSerise}`,
        method: "PUT"
    };

    return instance(request);
};

export const download = (fileName: string): AxiosPromise => {
    const request: AxiosRequestConfig = {
        url: `/storage/files/download/${fileName}`,
        method: "GET",
        responseType: "blob"
    };

    return instance(request);
};

export const dataTab = (id: string): AxiosPromise => {
    const request: AxiosRequestConfig = {
        url: `product/products/${id}`,
        method: "GET"
    };

    return instance(request);
};

export const getListLanguage = (qrSeries: string): AxiosPromise => {
    const request: AxiosRequestConfig = {
        url: `product/products/get-language/${qrSeries}`,
        method: "GET"
    };

    return instance(request);
};

export const switchLanguage = (id: string): AxiosPromise => {
    const request: AxiosRequestConfig = {
        url: `product/products/switch-language/${id}`,
        method: "GET"
    };

    return instance(request);
};
