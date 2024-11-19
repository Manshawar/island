import { MD_REGEX } from "../constants";
import { Plugin } from "vite";
import assert from "assert";
import { fileURLToPath } from "url";
export function pluginMdxHMR(): Plugin{
  let viteReactPlugin: Plugin;
  return {
    name: "island:mdx-hmr",
    apply: 'serve',
    configureServer({config}) {
      viteReactPlugin = (config as any).plugins.find(
        (plugin) => plugin.name === 'vite:react-babel'
      ) as Plugin;
    },
    handleHotUpdate(ctx) {
      if (/\.mdx?/.test(ctx.file)) {

        ctx.server.ws.send({
          type: 'custom',
          event: 'mdx-changed',
          data: {
            fileURLToPath:ctx.file
          }
        })
      }
    },
    async transform(code,id,opts) {
      if (MD_REGEX.test(id)) {
     
        assert(typeof viteReactPlugin.transform === 'function');
      
        const result = await viteReactPlugin.transform.call(
          this, code, id + '?.jsx', opts
        );
        
        const selfAcceptCode = 'import.meta.hot.accept();';
        if (
          typeof result === 'object' &&
          !result!.code?.includes(selfAcceptCode)
        ) {
          result!.code += selfAcceptCode;
        }
 
        return result
      }
    }
  }
}