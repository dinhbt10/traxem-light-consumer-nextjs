import { dataTab } from "@/services/product.service";
import { Metadata } from "next";
import TabsComponents from "./TabsComponents";

type Props = {
    params: {
        id: string;
    };
};

// example
// export async function generateMetadata({
//   params,
// }: {
//   params: { locale: string };
// }): Promise<Metadata> {
//   const t = await getTranslations('HomePage');
//   return {
//     metadataBase: new URL(`https://abc.com`),
//     alternates: {
//       canonical: '/',
//       languages: routing.locales.reduce((prev, lang) => {
//         prev[lang] = `/${lang}`;
//         return prev;
//       }, {} as Record<string, string>),
//     },
//     keywords: t('title').split('\n'),
//     title: t('title'),
//     description: t('title'),
//     openGraph: {
//       images: [''],
//       type: 'website',
//       url: `https://abc.com/${params.locale}`,
//       title: t('title'),
//       description: t('title'),
//     },
//     twitter: {
//       images: [''],
//       creator: '',
//       title: t('title'),
//       description: t('title'),
//     },
//   };
// }

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
    const postData = await dataTab(params.id);
    const { data } = postData.data;

    if (!data) return {};

    return {
        title: {
            absolute: `${data?.nameProduct} - ${data?.nameLot}`
        },
        openGraph: {
            title: `${data?.nameProduct} - ${data?.nameLot}`,
            description: `${data?.nameProduct} - ${data?.nameLot}`,
            images: [
                {
                    url: data.images?.[0].imageUrl,
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
    return <TabsComponents />;
}
