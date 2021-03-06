import React from "react";
import { Switch } from "react-router-dom";
import { setContext } from '@apollo/client/link/context';
import { useAuth0 } from "@auth0/auth0-react";
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { StoreProvider } from "./utils/GlobalState";
import { NavBar, Loading } from "./components";
import { Home, Profile, AddNew, SingleView, Archive, Production, Stats, Material, QuoteReady } from "./views";
import ProtectedRoute from "./auth/protected-route";

// import "./app.css";

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
          <Home/>
          {/* <NavBar/>
          <main>
          <Route path="/" component={ Home } />
            <Switch>
              <ProtectedRoute exact path="/" component={ Home } />
              <ProtectedRoute exact path="/archive" component={ Archive } />
              <ProtectedRoute exact path="/production" component={ Production } />
              <ProtectedRoute exact path="/qready" component={ QuoteReady } />
              <ProtectedRoute path="/profile" component={ Profile } />
              <ProtectedRoute path="/stats" component={ Stats } />
              <ProtectedRoute path="/add-new" component={ AddNew } />
              <ProtectedRoute path="/mtl" component={ Material } />
              <ProtectedRoute path="/edit/:id" component={ AddNew } />
              <ProtectedRoute path="/quote/:id" component={ SingleView } />
            </Switch>
          </main> */}
        </div>
      </StoreProvider>
    </ApolloProvider>
  );
};

export default App;
