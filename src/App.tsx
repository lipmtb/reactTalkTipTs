import React, { Component } from 'react';
import AppRoutes from "./routes/";

export const AppContext = React.createContext({
  appId: "20211225",
  appName: "jjccAppTalkTip",
  appTheme:"#585858"
});
class App extends Component {
  render() {
    return (
      <div className="App">
        <AppContext.Provider value={{
          appId: "20211225",
          appName: "jjccAppTalkTip",
          appTheme:"#585858"
        }}>
          <AppRoutes />
        </AppContext.Provider>
      </div>
    );
  }
}

export default App;