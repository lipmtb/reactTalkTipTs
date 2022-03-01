import React, { Component } from 'react';
import AppRoutes from "./routes/";
import { API_KEY } from "./config/baiduconfig";
export const AppContext = React.createContext({
  appId: "20211225",
  appName: "jjccAppTalkTip",
  appTheme: "#585858",
  baiduKey: ""
});
class App extends Component {
  state = {
    isLoading: true
  }
  //引入百度地图api
  getBaiduApi = () => {
    const bd = document.body;
    if (bd) {
      const script = document.createElement("script");
      script.src = `https://api.map.baidu.com/getscript?type=webgl&v=1.0&ak=${API_KEY}&t=20220224113913`;
      script.type = "text/javascript";
      script.onload = () => {
        this.setState({
          isLoading: false
        })
      }
      bd.appendChild(script);
      const mapLink = document.createElement("link");
      mapLink.type = "text/css";
      mapLink.href = "https://api.map.baidu.com/res/webgl/10/bmap.css";
      document.head.appendChild(mapLink);

    }
  }
  componentDidMount() {
    this.getBaiduApi();
  }
  render() {
    if (this.state.isLoading) {
      return null;
    }
    return (
      <div className="App">
        <AppContext.Provider value={{
          appId: "20211225",
          appName: "jjccAppTalkTip",
          appTheme: "#585858",
          baiduKey: API_KEY
        }}>
          <AppRoutes />
        </AppContext.Provider>
      </div>
    );
  }
}

export default App;