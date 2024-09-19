import TabsComponent from "components/TabsComponent";
import { Suspense } from "react";
import { Metadata } from "next";
import { dataTab, getPreviewData } from "services/product.service";
import { getTranslations } from "next-intl/server";
import { Typography } from "@mui/material";
import TabsComponents from "./TabsComponents";

type Props = {
    params: {
        id: string;
    };
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
    const postData = await dataTab(params.id);
    const { data } = postData.data;

    return {
        title: {
            absolute: `${data?.nameProduct} - ${data?.nameLot}`
        },
        openGraph: {
            title: `${data?.nameProduct} - ${data?.nameLot}`,
            description: `${data?.nameProduct} - ${data?.nameLot}`,
            images: [
                {
                    url: data.images[0].imageUrl,
                    width: 800,
                    height: 600,
                    alt: data?.nameProduct
                }
            ]
        },
        description: `${data?.nameProduct} - ${data?.nameLot}`
    };
};

export default async function QRDetail() {
    return (
        <>
            <TabsComponents />
        </>
    );
}
