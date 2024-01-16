import * as SRD from '@projectstorm/react-diagrams';
import { SimplePortFactory } from './componets/model1/SimplePortFactory';
import { DiamondPortModel } from './componets/model1/DiamondPortModel';
import { DiamondNodeFactory } from './componets/model1/DiamondNodeFactory';
import { AdvancedLinkFactory, AdvancedLinkModel, AdvancedPortModel } from './pages/Sam';
import { DiamondPortModel1 } from './componets/model2/DiamondPortModel';
import { DiamondPortModel2 } from './componets/model3/DiamondPortModel';
import { SimplePortFactory1 } from './componets/model2/SimplePortFactory';
import { SimplePortFactory2 } from './componets/model3/SimplePortFactory';
import { DiamondNodeFactory1 } from './componets/model2/DiamondNodeFactory';
import { DiamondNodeFactory2 } from './componets/model3/DiamondNodeFactory';
import { SimplePortFactory3 } from './componets/model4/SimplePortFactory';
import { DiamondPortModel3 } from './componets/model4/DiamondPortModel';
import { DiamondNodeFactory3 } from './componets/model4/DiamondNodeFactory';
import { DiamondNodeModel } from './componets/model1/DiamondNodeModel';
import axios from 'axios';
import { apis } from './services/apis';
import React, { useEffect } from 'react';
import { DiamondNodeModel1 } from './componets/model2/DiamondNodeModel';
import { DiamondNodeModel2 } from './componets/model3/DiamondNodeModel';
import { DiamondNodeModel3 } from './componets/model4/DiamondNodeModel';
import { DefaultLinkModel, DiagramEngine, DiagramModel } from 'storm-react-diagrams';
import { DiamondNodeWidget } from './componets/model1/DiamondNodeWidget';
import * as _ from 'lodash';

/**
 * @author Dylan Vorster
 */

export interface BProps {
	xyz: DiamondNodeWidget
	size?: number;
}

export class Application {
	protected activeModel: SRD.DiagramModel;
	protected diagramEngine: SRD.DiagramEngine;

	constructor() {
		
		this.diagramEngine = SRD.default();
		this.newModel();
		
	}

	public newModel() {

		// console.log(SRD.)

		

		this.diagramEngine
		.getPortFactories()
		.registerFactory(new SimplePortFactory('diamond', (config) => new DiamondPortModel(SRD.PortModelAlignment.BOTTOM)));
		this.diagramEngine.getNodeFactories().registerFactory(new DiamondNodeFactory())
	   
		this.diagramEngine.repaintCanvas()
 
		this.diagramEngine.getLinkFactories().registerFactory(new AdvancedLinkFactory());
 
	   
	   
		this.diagramEngine
		  .getPortFactories()
		  .registerFactory(new SimplePortFactory1('diamond1', (config) => new DiamondPortModel1(SRD.PortModelAlignment.BOTTOM)));
		  this.diagramEngine.getNodeFactories().registerFactory(new DiamondNodeFactory1());
	   
		  this.diagramEngine
		.getPortFactories()
		.registerFactory(new SimplePortFactory2('diamond2', (config) => new DiamondPortModel2(SRD.PortModelAlignment.BOTTOM)));
		this.diagramEngine.getNodeFactories().registerFactory(new DiamondNodeFactory2());
	   
		this.diagramEngine
		.getPortFactories()
		.registerFactory(new SimplePortFactory3('diamond3', (config) => new DiamondPortModel3(SRD.PortModelAlignment.BOTTOM)));
		this.diagramEngine.getNodeFactories().registerFactory(new DiamondNodeFactory3());
		

		this.activeModel = new SRD.DiagramModel();

		
		

		//3-A) create a default node
		var node1 = new DiamondNodeModel("Diamond")
        // var port1 = node1.addPort(new DiamondPortModel(PortModelAlignment.RIGHT))
        let port1 = node1.addPort(new AdvancedPortModel(false,"out"));
		node1.setPosition(100,150 );


		var node2 = new DiamondNodeModel1("Dimanod1");
       var port2 = node2.addPort(new AdvancedPortModel(true,"in-1"));
      // var port2 = node2.addPort(new DiamondPortModel(PortModelAlignment.RIGHT))

       node2.setPosition(150,500 );

      //  console.log(port2)
      
       var node3 = new DiamondNodeModel2()
      //  var port3 = node3.addInPort('In');
      var port3 = node3.addPort(new AdvancedPortModel(false,"in-2"))

       node3.setPosition(700, 400);
      //  let x = this.node.getPort(PortModelAlignment.RIGHT)

	 
      
      
      
       //3-C) link the 2 nodes together
    //    var link1 = port1.link(node2.getPort(PortModelAlignment.LEFT));
    //    var link2 = port3.link(node2.getPort(PortModelAlignment.RIGHT));

	
	

		
      
       var node4 = new DiamondNodeModel3()
      	var port4 = node4.addPort(new AdvancedPortModel(false,"in-3",))

      //  var port4 = node4.addOutPort('Out');
       node4.setPosition(600, 100);

	   
		this.activeModel.addAll(node1,node2,node3,node4);

		// console.log(this.activeModel.getLinks()[0].getSourcePort())
		// this.activeModel.addLink(link)

		// var link2 = new AdvancedLinkModel()

		// console.log(link2.setSourcePort(this.activeModel.getLinks()[0].getSourcePort()))
		// console.log(link2.setTargetPort(this.activeModel.getLinks()[0].getTargetPort()))

		
		// this.activeModel.addLink(link2)

		// console.log(this.activeModel.addLink(link2))
		//   this.activeModel

		var link = new AdvancedLinkModel()

		var x=10

		// setInterval(function name() {
		// 	x=Math.ceil(Math.random() * 10) * (Math.round(Math.random()) ? 1 : -1)
		// 	console.log(x)
			
			
		// }, 5000);

		
		
		// this.activeModel.addLink(link)
	

		
		
		
		const model = this.activeModel
		const yzx = this.diagramEngine
		const bc =this.activeModel
		

		async function Create1() {
			try {
			const res = await axios({
				method:"GET",
				url:apis.GETALLVALUES_API,
				withCredentials:true,    
			})

			

			console.log(res.data.ans.positionX)

			if(res.data.ans.positionX>=0){
				link.setSourcePort(port2)
				link.setTargetPort(port3)
				// bc.addLink(link)
			}
	
			if(res.data.ans.positionX<0){
				link.setSourcePort(port3)
				link.setTargetPort(port2)
				
			}

			

			model.deserializeModel(JSON.parse(res.data.ans.links), yzx);
			// console.log("1")
			

			

			// console.log(JSON.parse(res.data.ans.links))
			
			} catch (error) {
				console.log(error)
			}
		}
		
		
		// console.log(Create1())
		
		Create1()
		yzx.setModel(model);

		

		
		
	}

	public getActiveDiagram(): SRD.DiagramModel {
		var x= this.activeModel
		return x;
	}

	public getDiagramEngine(): SRD.DiagramEngine {
		
		return this.diagramEngine;
	}
	
}