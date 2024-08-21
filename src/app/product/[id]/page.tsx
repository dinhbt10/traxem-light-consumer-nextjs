import TabsComponent from "components/TabsComponent";
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
    const { data } = postData.data;

    return {
        title: {
            absolute: `Post ${params.id}`
        },
        description: `${data.nameProduct} - ${data.nameLot}`
    };
};

export default async function QRDetail({ params: { id } }: Props) {
    const postData = await getDataQRDetail(id);
    const t = await getTranslations("HomePage");
    const { nameProduct, nameLot } = postData.data;

    return (
        <>
            <Typography>{t("title")}</Typography>
            <h1>{nameProduct}</h1>
            <p>{nameLot}</p>
        </>
    );
}
