const { getDefaultConfig } = require('expo/metro-config');

module.exports = (() => {
  const config = getDefaultConfig(__dirname);
  config.resolver.assetExts.push('ttf'); // Ensure `.ttf` files are recognized as assets
  return config;
})();
