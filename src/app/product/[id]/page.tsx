import TabsComponent from "components/TabsComponent";
import { instance } from "libs/axios";
import { Suspense } from "react";
import { Metadata } from "next";
import { dataTab, getPreviewData } from "services/product.service";
import { getTranslations } from "next-intl/server";
import { Typography } from "@mui/material";

type Props = {
    params: {
        id: string;
    };
};
async function getDataQRDetail(id: string) {
    const res = await dataTab(id);
    return res.data;
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
    const postData = await dataTab(params.id);
    return {
        title: {
            absolute: `Post ${params.id}`
        }
    };
};

export default async function QRDetail({ params: { id } }: Props) {
    const postData = await getDataQRDetail(id);
    const t = await getTranslations("HomePage");

    return (
        <>
            <Typography>{t("title")}</Typography>
            <h1>{postData?.title}</h1>
            <p>{postData?.url}</p>
        </>
    );
}
