import React from 'react';
import './App.css';

type AppState = {
  message: string;
};
class App extends React.Component<{}, AppState> {
  state: AppState = {
    message: 'Hello World',
  };

  componentDidMount() {
    fetch('http://localhost:3000/courses')
    .then(res => res.json())
    .then(obj => {
      this.setState({
        message: obj.message,
      })
    })
  }

  render() {
    return (
      <div>
        {this.state.message}
      </div>
    );
  }
}

export default App;
