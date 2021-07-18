import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { TestPage, DefaultPage } from '@Pages';

const Routes = ({ Routerhistory }: { Routerhistory: any }) => {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <ConnectedRouter history={Routerhistory}>
                <Switch>
                    {/* <Route path={['/test', '/default', '/login', '/register']}> */}
                    <Route path={process.env.PUBLIC_URL + '/'} component={DefaultPage} exact />
                    <Route path={process.env.PUBLIC_URL + '/test'} component={TestPage} exact />
                    <Route path={process.env.PUBLIC_URL + '/default'} component={DefaultPage} exact />
                    {/* </Route> */}
                </Switch>
            </ConnectedRouter>
        </BrowserRouter>
    );
};

export default Routes;
