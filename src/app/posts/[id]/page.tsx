import TabsComponent from "components/TabsComponent";
import { instance } from "libs/axios";
import Head from "next/head";
import { Suspense } from "react";
import { Metadata, ResolvingMetadata } from "next";
import { dataTab, getPreviewData } from "services/product.service";

async function getDataQRDetail(id: string) {
    const res = await instance.get(`posts/${id}`);
    // if (!res.data) {
    //     throw new Error("Fail to fetch data");
    // }
    return res.data;
}

export default async function QRDetail({ params: { id } }: { params: { id: string } }, parent: ResolvingMetadata) {
    const data = await getDataQRDetail(id);
    return (
        <>
            <Head>
                <title>{data?.title}</title>
                <meta name="og:description" content={data?.body} />
                {/* <meta name="keywords" content={metadata.keywords.join(", ")} />
                <meta property="og:image" content={metadata.image} /> */}
            </Head>
            <Suspense fallback={<div>Loading...</div>}>
                <h1>
                    {data?.title} + {id}
                </h1>
                <h1>{data?.body}</h1>
                {/* <TabsComponent tabsList={data.data.tabs?.sort((a: any, b: any) => a.index - b.index) ?? []} listImage={data?.images} /> */}
            </Suspense>
        </>
    );
}
