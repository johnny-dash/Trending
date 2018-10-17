import React from 'React';
import { Redirect, Switch, Route } from 'react-router-dom';
import DashBoard from './dashboard';
import News from './news';
import Twitter from './twitter';
import NavBar from './navBar';


export const Routes = () => {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route exact path='/dashboard' component={DashBoard} />
                <Route exact path='/'>
                    <Redirect to='/dashboard' />
                </Route>
                <Route exact path='/news' component={News} />
                <Route exact path='/twitter' component={Twitter} />
            </Switch>
        </div>
    )
}