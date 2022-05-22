import { Suspense } from "react";
import { Switch, BrowserRouter, HashRouter, Route } from "react-router-dom";


import { AliveScope } from "react-activation";
import TrackRouteUI from "./TrackRouteUI";

// import historyMe from "./historyHook";

import { getRoutes, ItRoute } from "./routeModule";
import Login from "../views/login";

//所有的路由模块
const allRoutes = getRoutes();


export default function AppRoutes() {
    return (
        <HashRouter>

            <AliveScope>
                <Suspense fallback={<h2>loading23333</h2>}>
                    <Switch>
                        {
                            allRoutes.map((curRoute: ItRoute, idx: number) => {
                                const { exact = true, component, path, cache = false, ...otherProperties } = curRoute;
                                return <TrackRouteUI key={idx + ""} path={path} exact={exact} cache={cache} component={component} {...otherProperties} />
                            })
                        }
                        <Route path="/login" exact={true} component={Login}></Route>
                    </Switch>

                </Suspense>
            </AliveScope>
        </HashRouter>
    )
}
