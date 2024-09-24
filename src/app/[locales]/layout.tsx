import { routing } from "@/i18n/routing";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "photoswipe/dist/photoswipe.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "video-react/dist/video-react.css";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params: { locale } }: { children: React.ReactNode; params: { locale: string } }) {
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body
                style={{
                    margin: 0
                }}
            >
                <AppRouterCacheProvider>
                    <NextIntlClientProvider locale={locale} messages={messages}>
                        {children}
                    </NextIntlClientProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
