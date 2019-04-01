const path = require("path");

module.exports = ({ config, mode }) => {
  config.module.rules.push({
    test: /\.less$/,
    use: [
      {
        loader: "style-loader"
      },
      {
        loader: "css-loader"
      },
      {
        loader: "less-loader",
        options: {
          javascriptEnabled: true
        }
      }
    ],
    include: path.resolve(__dirname, "../")
  });
  config.resolve.extensions.push(".css", ".less");

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve("awesome-typescript-loader")
      },
      {
        loader: require.resolve("react-docgen-typescript-loader")
      }
    ]
  });
  config.resolve.extensions.push(".ts", ".tsx");

  return config;
};
