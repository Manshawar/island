declare module 'island:site-data' {
  import type { UserConfig } from 'shared/types';
  const siteData: UserConfig;
  export default siteData;
}

declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
}


declare module 'island:routes' {
  import type { Route } from 'node/plugin-routes';
  export const routes: Route[];
}