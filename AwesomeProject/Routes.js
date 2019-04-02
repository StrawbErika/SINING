import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import Classifier from './Classifier.js'
import HomePage from './HomePage.js'


import Home from './Home.js'
const Routes = () => (
    <Router>
        <Scene key="root">
            {/* <Scene key="home" component={Home} title="Home" initial={true} /> */}
            <Scene key="classifier" component={Classifier} title="Classifier" />
            <Scene key="homePage" component={HomePage} initial={true} hideNavBar={true} />
        </Scene>
    </Router>
)
export default Routes