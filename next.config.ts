import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "ir.ozone.ru",
				port: "",
				pathname: "/**",
			},
		],
	},
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
