import TabsComponent from "components/TabsComponent";
import { instance } from "libs/axios";
import Head from "next/head";
import { Suspense } from "react";
import { Metadata } from "next";
import { dataTab, getPreviewData } from "services/product.service";

type Props = {
    params: {
        id: string;
    };
};
async function getDataQRDetail(id: string) {
    const res = await instance.get(`posts/${id}`);
    return res.data;
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
    const postData = await getDataQRDetail(params.id);
    return {
        title: `Post ${params.id}`,
        description: `${postData.body}`
    };
};

export default async function QRDetail({ params: { id } }: Props) {
    const postData = await getDataQRDetail(id);
    return (
        <>
            {/* <Head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
                <meta property="og:title" content={metadata.openGraph.title} />
                <meta property="og:description" content={metadata.openGraph.description} />
            </Head> */}
            <h1>{postData.title}</h1>
            <p>{postData.body}</p>
        </>
    );
}
