import  { Component } from 'react';

import HasLoginProvider from './component/container/HasLoginProvider'; //登录权限控制分配
  class App extends Component {
    render() {
      return (
        <div className="App">
          <HasLoginProvider/>
        </div>
      );
    }
  }

  export default App;