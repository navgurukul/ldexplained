import config from "config";
import React, { createContext, useState } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import MyContainer from "./mycontainer.jsx";
import AppContainer from "./appcontainer.jsx";

export const Appcontext = createContext();

const AppRouter = () => {
  const [isAuth, setIsAuth] = useState("user");
  // const config = "/react/template/";
  return (
    <Router basename={`${config.publicPath}`}>
      <Appcontext.Provider value={{ isAuth, setIsAuth }}>
        <Route render={(props) => <MyContainer {...props} />} />
        {/* <Route render={(props) => <AppContainer {...props} />} /> */}
      </Appcontext.Provider>
    </Router>
  );
};

export default AppRouter;
