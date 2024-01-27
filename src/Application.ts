import * as SRD from "@projectstorm/react-diagrams";
import {
  AdvancedLinkFactory,
} from "./pages/Animation";
import { Component } from "react";
import * as _ from "lodash";
import { CustomPortFactory } from "./componets/model/CustomPortFactory";
import { CustomPortModel } from "./componets/model/CustomPortModel";
import { CustomNodeFactory } from "./componets/model/CustomNodeFactory";
import { CustomType } from "./componets/model/CustomType";
import { getDiagramEngine,getActiveModel } from "./utils/DiagramUtil";

export class Application extends Component {
  protected activeModel: SRD.DiagramModel;
  protected diagramEngine: SRD.DiagramEngine;

  constructor(props?: any) {
    super(props);
    this.diagramEngine = SRD.default()
    this.newModel();
    this.startRandomNumberGeneration();
  }

  public startRandomNumberGeneration() {
    const generateRandomValue = () => {
      const randomValue = this.getRandomNumber(-10, 10);
      this.newModel(randomValue);
  
      // Use setTimeout to delay the next iteration
      setTimeout(generateRandomValue, 3000);
    };
    
    // Call the function initially
    generateRandomValue();
  }

  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  public newModel(randomValue?: number) {
    const customTypes: CustomType[] = [
      "building",
      "solarPanel",
      "battery",
      "grid",
    ];

    customTypes.map((type) => {
      this.diagramEngine
        .getPortFactories()
        .registerFactory(
          new CustomPortFactory(
            type,
            (config) => new CustomPortModel(SRD.PortModelAlignment.BOTTOM, type)
          )
        );
      this.diagramEngine
        .getNodeFactories()
        .registerFactory(new CustomNodeFactory(type));
      this.diagramEngine.getLinkFactories().registerFactory(new AdvancedLinkFactory());
    });

    this.activeModel = getActiveModel();

    this.diagramEngine = getDiagramEngine();  
 
    this.diagramEngine.setModel(this.activeModel);

    
  }


  public getActiveDiagram(): SRD.DiagramModel {
    var x = this.activeModel;
    return x;
  }

  public getDiagramEngine(): SRD.DiagramEngine {
    return this.diagramEngine;
  }
}
