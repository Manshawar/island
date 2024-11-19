import { pluginIndexHtml } from "./plugin-island/indexHtml";
import pluginReact from "@vitejs/plugin-react";
import { pluginConfig } from "./plugin-island/config";
import { pluginRoutes } from "./plugin-routes/index";
import { pluginMdx } from "./plugin-mdx/index";
import { SiteConfig } from 'shared/types/index';
import options from "./unocssOptions";
import UnoCSS from 'unocss/vite';
import path from "path"
import { PACKAGE_ROOT } from "./constants";
import babelPluginIsland from "./babel-plugin-island";
export async function createVitePlugins(config: SiteConfig,
  restartServer?: () => Promise<void>, isSSR = false) {
  return [UnoCSS(options) ,pluginIndexHtml(), pluginReact({
    jsxRuntime: 'automatic',
    jsxImportSource: isSSR ? path.join(PACKAGE_ROOT, 'src', 'runtime') : 'react',
    babel: {
      plugins:[babelPluginIsland]
    }
  }), pluginConfig(config, restartServer), pluginRoutes({ root: config.root, isSSR }), await pluginMdx()]
}