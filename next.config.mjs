/** @type {import('next').NextConfig} */
import { createProxyMiddleware } from 'http-proxy-middleware';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
    devIndicators: {
        autoPrerender: false,
    },
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.alias['@mock'] = path.resolve(__dirname, 'mock');
        }
        return config;
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: '/mock/:path*', // 直接代理到本地的 Mock 文件
            },
        ];
    },
};

export default nextConfig;