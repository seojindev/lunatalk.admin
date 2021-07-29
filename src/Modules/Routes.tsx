import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { TestPage, DefaultPage, LoginPage, SamplePage, Dashboard } from '@Pages';
import { MainLayout, BlankLayout } from '@Element/Layouts';

const Routes = ({ Routerhistory }: { Routerhistory: any }) => {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <ConnectedRouter history={Routerhistory}>
                <Switch>
                    <Route path={['/auth/login', '/auth/logout']}>
                        <BlankLayout>
                            <Switch>
                                <Route path={process.env.PUBLIC_URL + '/auth/login'} component={LoginPage} exact />
                            </Switch>
                        </BlankLayout>
                    </Route>
                    <Route path={['/', '/test', '/default']}>
                        <MainLayout>
                            <Switch>
                                <Route path={process.env.PUBLIC_URL + '/'} component={Dashboard} exact />
                                <Route path={process.env.PUBLIC_URL + '/test'} component={TestPage} exact />
                                <Route path={process.env.PUBLIC_URL + '/default'} component={DefaultPage} exact />
                                <Route path={process.env.PUBLIC_URL + '/main'} component={SamplePage} exact />
                                <Route path={process.env.PUBLIC_URL + '/main/dashboard'} component={Dashboard} exact />
                            </Switch>
                        </MainLayout>
                    </Route>
                </Switch>
            </ConnectedRouter>
        </BrowserRouter>
    );
};

export default Routes;
