import React from "react";
import { Route, Switch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { StoreProvider } from "./utils/GlobalState";
import { NavBar, Loading } from "./components";
import { Home, Profile, ExternalApi, AddNew, SingleView, NoAuth } from "./views";
import ProtectedRoute from "./auth/protected-route";

import "./app.css";

const httpLink = createHttpLink({
  uri: '/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ApolloProvider client={client}>
      <StoreProvider>
        <div id="app">
          <NavBar/>
          <main>
            <Switch>
              <ProtectedRoute exact path="/" component={ Home } />
              <ProtectedRoute path="/profile" component={ Profile } />
              <ProtectedRoute path="/external-api" component={ ExternalApi } />
              <ProtectedRoute path="/add-new" component={ AddNew } />
              <ProtectedRoute path="/edit/:id" component={ AddNew } />
              <ProtectedRoute path="/quote/:id" component={ SingleView } />
              {/* <Route path="/" exact component={NoAuth} /> */}
            </Switch>
          </main>
        </div>
      </StoreProvider>
    </ApolloProvider>
  );
};

export default App;
