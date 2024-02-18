import '../style/App.css';
import React from 'react';
import Navbar from './Navbar';

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          {/* Le contenu de votre application va ici */}
          <h1>Bienvenue sur mon site web !</h1>
        </div>
      </div>
    );
  }
}

export default App;