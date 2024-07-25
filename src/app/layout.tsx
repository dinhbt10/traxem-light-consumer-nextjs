import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

export default async function LocaleLayout({ children }: { children: React.ReactNode }) {
    const messages = await getMessages();
    const locale = await getLocale();

    return (
        <html lang={locale}>
            <body>
                <AppRouterCacheProvider>
                    <NextIntlClientProvider locale={locale} messages={messages}>
                        {children}
                    </NextIntlClientProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
