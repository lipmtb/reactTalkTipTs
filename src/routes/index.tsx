import { Suspense } from "react";
// import { Router, Route, Switch, RouteComponentProps } from "react-router-dom";
// import { Switch, BrowserRouter } from "react-router-dom";
import { Switch, Router } from "react-router-dom";

import { AliveScope } from "react-activation";
import TrackRouteUI from "./TrackRouteUI";
// import { createBrowserHistory } from "history";
import   historyMe  from "./historyHook";

import { getRoutes, ItRoute } from "./routeModule";

//所有的路由模块
const allRoutes = getRoutes();


export default function AppRoutes() {
    return (
        <Router history={historyMe} >

            <AliveScope>
                <Suspense fallback={<h2>loading23333</h2>}>
                    <Switch>
                        {
                            allRoutes.map((curRoute: ItRoute, idx: number) => {
                                const { exact = true, component, path, cache = false, ...otherProperties } = curRoute;
                                return <TrackRouteUI key={idx + ""} path={path} exact={exact} cache={cache} component={component} {...otherProperties} />
                            })
                        }
                    </Switch>

                </Suspense>
            </AliveScope>
        </Router>
    )
}
