import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import loadable from '@loadable/component';
import { Helmet } from 'react-helmet';
import GlobalStyle from './styles/global-style';
import routes from './routes';

const AsyncPage = loadable((props) => import(`./pages${props.importPath}`), {
  cacheKey: (props) => props.importPath,
});

const App = () => {
  return (
    <>
      <Helmet
        htmlAttributes={{ lang: 'en' }}
        defaultTitle="BreakLine"
        titleTemplate="%s | BreakLine"
        meta={[{ charset: 'UTF-8' }, { name: 'robots', content: 'noindex' }]}
      />

      <Router>
        <Switch>
          {routes?.map((route) => (
            <Route
              path={route.path}
              key={route.path}
              exact={route.path === '/' || route.exact}
              render={(props) => (
                <AsyncPage
                  importPath={route.importPath}
                  privateRoute={route.private}
                  access={route.access}
                  {...props}
                />
              )}
            />
          ))}
        </Switch>
      </Router>

      <GlobalStyle />
    </>
  );
};

export default App;
