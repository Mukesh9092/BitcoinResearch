const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  webpack: (config, { dev }) => {
    config.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: "static",
        analyzerHost: "127.0.0.1",
        analyzerPort: 8888,
        reportFilename: "report.html",
        openAnalyzer: false,
        generateStatsFile: false,
        statsFilename: "stats.json",
        statsOptions: null,
        logLevel: "info"

        // For all options see https://github.com/th0r/webpack-bundle-analyzer#as-plugin
        // generateStatsFile: true,

        // Will be available at `.next/stats.json`
        // statsFilename: 'stats.json'
      })
    );

    // In production, use Preact.
    if (!dev) {
      config.resolve.alias = {
        react: "preact-compat/dist/preact-compat",
        "react-dom": "preact-compat/dist/preact-compat"
      };
    }

    return config;
  }
};
