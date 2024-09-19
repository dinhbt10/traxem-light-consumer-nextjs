import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "video-react/dist/video-react.css";
import "photoswipe/dist/photoswipe.css";

export default async function LocaleLayout({ children }: { children: React.ReactNode }) {
    const messages = await getMessages();
    const locale = await getLocale();

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
