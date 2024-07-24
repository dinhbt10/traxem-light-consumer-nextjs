import TabsComponent from "components/TabsComponent";
import { instance } from "libs/axios";
import Head from "next/head";
import { Suspense } from "react";
import { dataTab, getPreviewData } from "services/product.service";

async function getDataQRDetail(id: string) {
    const res = await dataTab(id);
    if (!res.data) {
        throw new Error("Fail to fetch data");
    }
    return res.data;
}

export default async function QRDetail({ params: { id } }: { params: { id: string } }) {
    const data = await getDataQRDetail(id);
    return (
        <>
            <Head>
                <title>{data.nameProduct}</title>
                <meta name="description" content={data.nameLot} />
                {/* <meta name="keywords" content={metadata.keywords.join(", ")} />
                <meta property="og:image" content={metadata.image} /> */}
            </Head>
            <Suspense fallback={<div>Loading...</div>}>
                <TabsComponent tabsList={data.data.tabs?.sort((a: any, b: any) => a.index - b.index) ?? []} listImage={data?.images} />
            </Suspense>
        </>
    );
}
