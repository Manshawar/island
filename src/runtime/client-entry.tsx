import { createRoot } from 'react-dom/client';
import { App, initPageData } from './App';
import { BrowserRouter } from 'react-router-dom';
import { DataContext } from './hooks';
import { HelmetProvider } from 'react-helmet-async';

async function renderInBrowser() {
  const containerEl = createRoot(document.getElementById('root'));
  const pageData = await initPageData(location.pathname);
  if (!containerEl) {
    throw new Error('#root element not found');
  }
  containerEl.render(
    <HelmetProvider>
   
      <DataContext.Provider value={pageData}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DataContext.Provider>
    </HelmetProvider>
  );
}

renderInBrowser();
