
import { Route, RouteComponentProps } from "react-router-dom";
import { ItRoute } from "./routeModule";
import KeepAlive from "react-activation";
export default function TrackRouteUI(propsEntry: Partial<ItRoute>) {
    const { exact = true, cache = false, component: Component, path, name = "", ...otherProps } = propsEntry;

    if (cache) {
        return <Route exact={exact} path={path} render={(props: RouteComponentProps) => {
            console.log("KeepAlive render RouteComponentProps", props);
            return <KeepAlive id={name} name={name} when={true}>{Component ? <Component {...props} {...otherProps} /> : null}</KeepAlive>
        }}></Route>
    }
    return (
        <Route exact={exact} path={path} render={(props: RouteComponentProps) => {
            return Component ? <Component  {...otherProps} {...props} /> : null
        }} ></Route>
    )
}
