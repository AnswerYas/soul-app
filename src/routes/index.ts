import React, { lazy, Suspense } from 'react';
import { Switch, RouteProps, Route } from 'react-router-dom';
import Loading from '@/components/Loading'

const Home = lazy(() => import(/* webpackChunkName:"home" */ '@/pages/home'));

const routes: RouteProps[] = [
    {
        path: '/',
        exact: true,
        component: Home,
    },
];

const Routes = () => (
    <Suspense fallback={<Loading />}>
        <Switch>
            {routes.map(r => {
                const { path, exact, component } = r;
                const LazyCom = component;
                return (
                    <Route key={path + ''} exact={exact} path={path} render={() => <LazyCom />} />
                );
            })}
        </Switch>
    </Suspense>
);
export default Routes;
