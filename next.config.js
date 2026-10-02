const isProduction = process.env.NODE_ENV === 'production';
module.exports = {
  ...(isProduction ? { output: 'export' } : {}),
  trailingSlash: true,
  images: { unoptimized: true },
};
