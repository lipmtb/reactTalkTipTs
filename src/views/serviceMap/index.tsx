
import { RouteComponentProps } from "react-router-dom";
import { BaseMap01 } from "../../component/baiduMap/baseMap01";
const ServiceMap: React.FC<RouteComponentProps<{mapid:string}>> = props => {
    console.log("propsservicemap******", props);
    return (
        <BaseMap01 initMapId={props.match?.params?.mapid}></BaseMap01>
    )
}
export default ServiceMap;
