import * as SRD from "@projectstorm/react-diagrams";
import { Application } from "../Application";

let diagramEngine ;
let activeModel;
export function getDiagramEngine():SRD.DiagramEngine{
    if(!diagramEngine){
        diagramEngine=SRD.default();
    }
    return diagramEngine;
}

export function getActiveModel():SRD.DiagramModel{
    if(!activeModel){
        activeModel = new SRD.DiagramModel()
    }
    return activeModel;
    
}
