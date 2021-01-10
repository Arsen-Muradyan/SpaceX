import "./bootstrap.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import Launches from "./components/launches/Launches";
import { Switch, Route } from "react-router-dom";
import Details from "./components/launches/Details";
// Create Apollo client
const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Switch>
        {/* Default Path */}
        <Route path="/" exact>
          <div className="container">
            <h1 className="display-3 my-3">Launches</h1>
            <div className="my-3">
              <span className="px-3 mr-2 bg-success"></span>= Success
              <br />
              <br />
              <span className="px-3 mr-2 bg-danger"></span>= Danger
            </div>
            <Launches />
          </div>
        </Route>
        {/* Launch Details path */}
        <Route exact path="/launches/:id" component={Details} />
      </Switch>
    </ApolloProvider>
  );
}

export default App;
