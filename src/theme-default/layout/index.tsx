import { Nav } from '../components/Nav';
import { usePageData } from '../../runtime';
import '../styles/base.css';
import '../styles/vars.css';
import '../styles/doc.css';
import { Helmet } from 'react-helmet-async';
import 'uno.css';
import 'virtual:unocss-devtools';
import { HomeLayout } from './HomeLayout/index';
import { DocLayout } from './DocLayout';
import { NotFoundLayout } from './NotFoundLayout';
export function Layout() {
  const pageData = usePageData();
  const { pageType, title } = pageData;
  const getContent = () => {
    if (pageType === 'home') {
      return <HomeLayout></HomeLayout>;
    } else if (pageType === 'doc') {
      return <DocLayout></DocLayout>;
    } else {
      return <NotFoundLayout></NotFoundLayout>;
    }
  };
  return (
    <div>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Nav />
      <section style={{ paddingTop: 'var(--island-nav-height)' }}>
        {getContent()}
      </section>
    </div>
  );
}
