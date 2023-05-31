import type { StorybookConfig } from "@storybook/react-webpack5"
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin"

const config: StorybookConfig = {
  stories: ["../stories/**/*.mdx", "../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions"],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: async (config) => {
    config.resolve = {
      ...config.resolve,
      plugins: [new TsconfigPathsPlugin()],
    }
    return config
  },
}
export default config
