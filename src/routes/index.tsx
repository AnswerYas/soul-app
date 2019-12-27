import React, { lazy, Suspense } from 'react'
import { Switch, RouteProps, Route } from 'react-router-dom'
import Loading from '@/components/Loading'

const Home = lazy(() => import(/* webpackChunkName:"home" */ '@/pages/home'))

const routes: RouteProps[] = [
    {
        path: '/',
        exact: true,
        component: Home,
    },
]

const Routes = () => (
    <Suspense fallback={<Loading />}>
        <Switch>
            {routes.map((route: RouteProps) => {
                const { path, exact, component } = route
                return (
                    <Route
                        key={path + ''}
                        exact={exact}
                        path={path}
                        render={()=>React.createElement(component)}
                    />
                )
            })}
        </Switch>
    </Suspense>
)
export default Routes
