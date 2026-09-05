import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* Uploads live in Supabase Storage, and the optimizer only resizes hosts
       it has been told about. The path is narrowed to the public bucket:
       this permits our own uploads and nothing else on the domain. */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "atejcqgslgfxqezzpvia.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
