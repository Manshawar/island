import { Layout } from '../theme-default';
import { routes } from 'island:routes';
import { matchRoutes } from 'react-router-dom';
import { PageData } from 'shared/types';
import siteData from 'island:site-data';
import { Route } from '../node/plugin-routes/index';
export async function initPageData(routePath: string): Promise<PageData> {
  const matched = matchRoutes(routes, routePath);

  if (matched) {
    const moduleInfo = await (matched[0].route as Route).preload();
 
    return {
      pageType: moduleInfo.frontmatter?.pageType ?? 'doc',
      siteData,
      frontmatter: moduleInfo.frontmatter,
      pagePath: routePath,
      toc: moduleInfo.toc,
      title: moduleInfo.title
    };
  }
  return {
    pageType: '404',
    siteData,
    pagePath: routePath,
    frontmatter: {},
    title: '404'
  };
}

export function App() {
  return <Layout></Layout>;
}
