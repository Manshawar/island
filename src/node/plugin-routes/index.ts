import { Plugin } from 'vite';
import { RouteService } from "./RouteService";
import { PageModule } from 'shared/types'
export const CONVENTIONAL_ROUTE_ID = 'island:routes';
interface PluginOptions {
  root: string,
  isSSR: boolean
}

export interface Route {
  path: string;
  element: React.ReactElement;
  filePath: string;
  preload: () => Promise<PageModule>;
}

export function pluginRoutes(options: PluginOptions): Plugin {
  let root = options.root;
  let res = new RouteService(root);


  return {
    name: "island:routes",
    async configResolved() {
      await res.init()
    },
    resolveId(id: string) {
      if (id === CONVENTIONAL_ROUTE_ID) {
        return "\0" + id
      }
    },
    load(id: string) {
      if (id === "\0" + CONVENTIONAL_ROUTE_ID) {
        return res.generateRoutesCode(options.isSSR || false);
      }
    }
  }
}