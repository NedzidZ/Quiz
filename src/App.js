import "./App.css";
import { Switch, Route } from "react-router-dom";
import Quiz from "./Components/Quiz.js";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/">
          <Quiz />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
