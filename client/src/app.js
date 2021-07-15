import React from "react";
import { Route, Switch } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';


import { NavBar, Loading } from "./components";
import { Home, Profile, ExternalApi, AddNew, NoAuth } from "./views";
import ProtectedRoute from "./auth/protected-route";

import "./app.css";

const httpLink = createHttpLink({
  uri: '/graphql',
  // uri: 'http://localhost:3001/graphql'
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
    <div id="app">
      <NavBar />
      <main>
        <Switch>
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute path="/profile" component={Profile} />
          <ProtectedRoute path="/external-api" component={ExternalApi} />
          <ProtectedRoute path="/add-new" component={AddNew} />
          <ProtectedRoute path="/edit/:id" component={AddNew} />
          {/* <Route path="/" exact component={NoAuth} /> */}
        </Switch>
      </main>
    </div>
    </ApolloProvider>
  );
};

export default App;
