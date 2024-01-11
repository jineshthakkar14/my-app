import React from 'react';
import './index.css';
import createEngine, { 
  DefaultLinkModel, 
  DefaultNodeModel,
  DiagramModel ,
  DefaultLinkFactory ,
  PortModelAlignment,
  LinkLayerModel,
  LinkLayerFactory
} from '@projectstorm/react-diagrams';

import {
  CanvasWidget,
} from '@projectstorm/react-canvas-core';

import { PortWidget } from '@projectstorm/react-diagrams';
import { DiamondNodeModel } from './componets/model1/DiamondNodeModel';
import { DiamondNodeFactory } from './componets/model1/DiamondNodeFactory';
import { SimplePortFactory } from './componets/model1/SimplePortFactory';
import { DiamondPortModel } from './componets/model1/DiamondPortModel';

import { DiamondNodeModel1 } from './componets/model2/DiamondNodeModel';
import { DiamondNodeFactory1 } from './componets/model2/DiamondNodeFactory';
import { SimplePortFactory1 } from './componets/model2/SimplePortFactory';
import { DiamondPortModel1 } from './componets/model2/DiamondPortModel';

import { DiamondNodeModel2 } from './componets/model3/DiamondNodeModel';
import { DiamondNodeFactory2 } from './componets/model3/DiamondNodeFactory';
import { SimplePortFactory2 } from './componets/model3/SimplePortFactory';
import { DiamondPortModel2 } from './componets/model3/DiamondPortModel';

import { DiamondNodeModel3 } from './componets/model4/DiamondNodeModel';
import { DiamondNodeFactory3 } from './componets/model4/DiamondNodeFactory';
import { SimplePortFactory3 } from './componets/model4/SimplePortFactory';
import { DiamondPortModel3 } from './componets/model4/DiamondPortModel';


function App() {
 //1) setup the diagram engine
 const engine = createEngine();

 // register some other factories as well

 
 engine
 .getPortFactories()
 .registerFactory(new SimplePortFactory('diamond', (config) => new DiamondPortModel(PortModelAlignment.BOTTOM)));
engine.getNodeFactories().registerFactory(new DiamondNodeFactory());

 engine
   .getPortFactories()
   .registerFactory(new SimplePortFactory1('diamond1', (config) => new DiamondPortModel1(PortModelAlignment.BOTTOM)));
 engine.getNodeFactories().registerFactory(new DiamondNodeFactory1());

 engine
 .getPortFactories()
 .registerFactory(new SimplePortFactory2('diamond2', (config) => new DiamondPortModel2(PortModelAlignment.BOTTOM)));
engine.getNodeFactories().registerFactory(new DiamondNodeFactory2());

engine
 .getPortFactories()
 .registerFactory(new SimplePortFactory3('diamond3', (config) => new DiamondPortModel3(PortModelAlignment.BOTTOM)));
engine.getNodeFactories().registerFactory(new DiamondNodeFactory3());





 //2) setup the diagram model
 var model = new DiagramModel();

 //3-A) create a default node
 var node1 = new DiamondNodeModel()
  var port1 = new DiamondPortModel(PortModelAlignment.BOTTOM)
 node1.setPosition(100, 200);
//  var link1 = port1.Link(node4)

 //3-B) create our new custom node
 var node2 = new DiamondNodeModel1();
//  var port2 = new DiamondPortModel(PortModelAlignment.BOTTOM)
 node2.setPosition(150,500 );

 var node3 = new DiamondNodeModel2()
//  var port3 = node3.addInPort('In');
 node3.setPosition(700, 400);

 //3-C) link the 2 nodes together
//  var link1 = port1.link(node2.getPort(PortModelAlignment.LEFT));
//  var link2 = port3.link(node2.getPort(PortModelAlignment.RIGHT));

 var node4 = new DiamondNodeModel3()
//  var port4 = node4.addOutPort('Out');
 node4.setPosition(600, 100);

//  var link3 = port4.link(node2.getPort(PortModelAlignment.TOP));

//  var node5 = new DiamondNodeModel1();
// //  var port5 = node5.addInPort('In');
//  node5.setPosition(400, 300);

//  var link4 = port5.link(node2.getPort(PortModelAlignment.BOTTOM));

 //4) add the models to the root graph
 model.addAll(node1,node2,node3, node4);

 //5) load model into engine
 engine.setModel(model);
  
//  const link = new DefaultLinkModel()
//   link.setSourcePort(port1);
//   link.setTargetPort(port2);
  
// const model = new DiagramModel();

// engine.setModel(model);


  return (
    <div>
      <CanvasWidget className='h-[100vh] w-[100%] ' engine={engine} ></CanvasWidget>
      
    </div>
    

  );
}

export default App;
