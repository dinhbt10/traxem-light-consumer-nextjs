import createMiddleware from "next-intl/middleware";
import { locales } from "constants/common";

export default createMiddleware({
    locales,
    defaultLocale: "vi"
});

export const config = {
    matcher: ["/", "/(vi|en)/:path*"]
};
