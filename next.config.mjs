import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "192.168.0.32",
                port: "8764",
                pathname: "/**"
            },
            {
                protocol: "https",
                hostname: "light.traxem.vn",
                pathname: "/**"
            }
        ]
    }
};

export default withNextIntl(nextConfig);
