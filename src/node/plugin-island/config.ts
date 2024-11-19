import { relative, join } from "path";
import { Plugin, ViteDevServer } from "vite";
import { SiteConfig } from '../../shared/types/index';
import { PACKAGE_ROOT } from '../../node/constants';
import fs from 'fs-extra';
import sirv from "sirv";
const SITE_DATA_ID = 'island:site-data';
export function pluginConfig(config: SiteConfig, restartServer?: () => Promise<void>): Plugin {
  let server: ViteDevServer | null = null;
  return {
    name: "island:Config",
    config() {
      return {
        root: PACKAGE_ROOT,
        resolve: {
          alias: {
            '@runtime': join(PACKAGE_ROOT, 'src', 'runtime', 'index.ts')
          }
        },
        css: {
          modules: {
            localsConvention: 'camelCaseOnly'
          }
        }
      }
    },
    configureServer(s) {
      server = s;

      const publicDir = join(PACKAGE_ROOT, config.root);

      if (fs.existsSync(publicDir)) {
        server.middlewares.use(sirv(publicDir));
      }
    },
    resolveId(id) {
      if (id === SITE_DATA_ID) {
        return '\0' + SITE_DATA_ID
      }

    },
    load(id) {
      if (id === '\0' + SITE_DATA_ID) {
        return `export default ${JSON.stringify(config.siteData)}`
      }
    },
    async handleHotUpdate(ctx) {
      const customWatchFiles = [config.configPath];
      const include = (id: string) =>
        customWatchFiles.some(file => id.includes(file))
        ;


      if (include(ctx.file)) {
        console.log(`\n${relative(config.root, ctx.file)} changed , restarting server...`)
      }
      await restartServer();
    }
  }

}