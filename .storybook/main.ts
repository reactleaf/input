import type { StorybookConfig } from "@storybook/react-webpack5"
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin"

const config: StorybookConfig = {
  stories: ["../stories/**/*.mdx", "../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-mdx-gfm",
    "@storybook/addon-webpack5-compiler-swc",
    "@chromatic-com/storybook"
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {},
  webpackFinal: async (config) => {
    config.resolve = {
      ...config.resolve,
      plugins: [new TsconfigPathsPlugin()],
    }
    return config
  },
}
export default config
