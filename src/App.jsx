import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Import your components here
// import Home from './components/Home';
// import About from './components/About';

const App = () => {
    return (
        <Router>
            <Switch>
                {/* Define your routes here */}
                {/* <Route path='/' exact component={Home} /> */}
                {/* <Route path='/about' component={About} /> */}
            </Switch>
        </Router>
    );
};

export default App;