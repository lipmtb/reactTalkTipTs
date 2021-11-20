import type { actionType } from '../interface';
export default function areaReducer(prevState={areaId:""},action:actionType){
  let {type}=action;

    switch(type){
        case "GUANZHOU":{
            return {
                areaId:"001"
            }
        }
        case "SHENZHEN":{
            return {
                areaId:"002"
            }
        }
        default: {
            return prevState;
        }
    }
}