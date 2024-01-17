import * as SRD from "@projectstorm/react-diagrams";
import {
  AdvancedLinkFactory,
  AdvancedLinkModel,
  AdvancedPortModel,
} from "./pages/Animation";
import axios from "axios";
import { apis } from "./services/apis";
import React, { Component } from "react";
import * as _ from "lodash";
import { CustomPortFactory } from "./componets/model/CustomPortFactory";
import { CustomPortModel } from "./componets/model/CustomPortModel";
import { CustomNodeFactory } from "./componets/model/CustomNodeFactory";
import { CustomType } from "./componets/model/CustomType";
import { CustomNodeModel } from "./componets/model/CustomNodeModel";





export class Application extends Component {
  protected activeModel: SRD.DiagramModel;
  protected diagramEngine: SRD.DiagramEngine;

  constructor(props?: any) {
    super(props);
    this.diagramEngine = SRD.default();
    this.newModel();
    this.startRandomNumberGeneration();
  }

  private startRandomNumberGeneration() {
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

    this.activeModel = new SRD.DiagramModel();

    //3-A) create a default node
    var node1 = new CustomNodeModel("building","building");
    // var port1 = node1.addPort(new DiamondPortModel(PortModelAlignment.RIGHT))
    let port1 = node1.addPort(new AdvancedPortModel(false, "out"));
    node1.setPosition(100, 150);

    var node2 = new CustomNodeModel("solarPanel",'solarPanel');
    var port2 = node2.addPort(new AdvancedPortModel(true, "in-1"));
    // var port2 = node2.addPort(new DiamondPortModel(PortModelAlignment.RIGHT))

    node2.setPosition(150, 500);

    //  console.log(port2)

    var node3 = new CustomNodeModel("grid",'grid');
    //  var port3 = node3.addInPort('In');
    var port3 = node3.addPort(new AdvancedPortModel(false, "in-2"));

    node3.setPosition(700, 400);

    var node4 = new CustomNodeModel("battery","battery");
    var port4 = node4.addPort(new AdvancedPortModel(false, "in-3"));

    //  var port4 = node4.addOutPort('Out');
    node4.setPosition(600, 100);

    this.activeModel.addAll(node1, node2, node3, node4);
    var link = new AdvancedLinkModel();

    const actualRandomValue = randomValue

    async function modifyPosition() {
      try {
        const res = await axios({
          method:"POST",
          url:apis.MODIFY_DB_API,
          data:{
          
          "PositionX":actualRandomValue
          },
          withCredentials:true,
          
          
        })
        
        // console.log("Modified values are",res.data)
        } catch (error) {
        console.log(error)
        }

    }
      
      modifyPosition()
   

    // console.log("Random Value in newModel:", actualRandomValue);
    if(actualRandomValue>0){
      link.setSourcePort(port2)
      link.setTargetPort(port3)
     
    }

    else if(actualRandomValue<0){
      link.setSourcePort(port3)
      link.setTargetPort(port2)
    }
    // this.activeModel.addLink(link)

    
    

    this.activeModel.addLink(link)

    this.diagramEngine.setModel(this.activeModel);

    // this.forceUpdate();

    const model = this.activeModel;
    const engine = this.diagramEngine;

    async function Create1() {
      try {
        const res = await axios({
          method: "GET",
          url: apis.GETALLVALUES_API,
          withCredentials: true,
        });

        // console.log(res.data.ans.positionX);
  
        model.deserializeModel(JSON.parse(res.data.ans.links), engine);
        
      } catch (error) {
        console.log(error);
      }
    }
    
   
    // Create1();
    // engine.setModel(model)
    
  }


  public getActiveDiagram(): SRD.DiagramModel {
    var x = this.activeModel;
    return x;
  }

  public getDiagramEngine(): SRD.DiagramEngine {
    return this.diagramEngine;
  }
}
