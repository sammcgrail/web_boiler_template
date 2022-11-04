// eslint-disable-next-line max-len
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import { Configuration as WebpackConfiguration } from "webpack";
import CopyPlugin from "copy-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import * as path from "path";

export const INDEX_HTML_OPTIONS: HtmlWebpackPlugin.Options = {
  title: "NXL",
  publicPath: "/",
  template: path.join(__dirname, "src/web/index.html"),
};

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

export const WEBPACK_CONFIG: Configuration = {
  mode: "development",
  devtool: "eval-cheap-source-map",
  devServer: {
    hot: true,
    open: [`http://localhost:3000`],
    devMiddleware: {
      writeToDisk: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: new RegExp("node_modules|server.ts"),
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  entry: {
    demo: "./src/web/index.tsx",
  },
  output: {
    path: path.join(process.cwd(), "dist"),
    filename: "static/bundle.js",
    hotUpdateChunkFilename: "hot/hot-update.js",
    hotUpdateMainFilename: "hot/hot-update.json",
  },
  plugins: [
    new HtmlWebpackPlugin(INDEX_HTML_OPTIONS),
    new CopyPlugin({
      patterns: [
        {
          from: path.join(process.cwd(), "src", "static"),
          to: path.join(process.cwd(), "dist", "static"),
        },
      ],
    }),
  ],
};

export default WEBPACK_CONFIG;
