import Header from "./Layout/Header/Header";
import { Switch, Route } from "react-router-dom"
import Home from "./Home/Home";
import About from "./About/About";
import UserProfile from "./user/UserProfile";
import AddUser from "./user/AddUser";
import UpdateUser from "./user/UpdateUser";
function App() {
  return (
    <div>
      <Header />
      <Switch>
        <div className="container mt-5">
          <Route exact path="/"> <Home /> </Route>
          <Route exact path="/about"> <About /> </Route>
          <Route exact path="/add-user"> <AddUser /> </Route>
          <Route exact path="/update-user/:id"> <UpdateUser /> </Route>
          <Route exact path="/user-profile/:id"> <UserProfile /> </Route>
        </div>
      </Switch>
    </div>
  );
}

export default App;
