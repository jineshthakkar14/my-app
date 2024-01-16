import * as React from 'react';
import * as _ from 'lodash';
import { TrayWidget } from './TragWidget';
import { Application } from '../../Application';
import { TrayItemWidget } from './TragItemWidget';
import { DefaultNodeModel, DiagramModel } from '@projectstorm/react-diagrams';
import { Action, CanvasWidget } from '@projectstorm/react-canvas-core';
import { action } from '@storybook/addon-actions';
import * as beautify from 'json-beautify';


import styled from '@emotion/styled';
import { DemoCanvasWidget } from './DemoCanvasWidget';
import { DemoButton, DemoWorkspaceWidget } from './DemoWorkspaceWIdget';
import axios from 'axios';
import { apis } from '../../services/apis';
import { DiamondNodeModel } from '../model1/DiamondNodeModel';
import { AdvancedLinkModel, AdvancedPortModel } from '../../pages/Sam';
import { DiamondNodeModel1 } from '../model2/DiamondNodeModel';
import { DiamondNodeModel2 } from '../model3/DiamondNodeModel';
import { DiamondNodeModel3 } from '../model4/DiamondNodeModel';

export interface BodyWidgetProps {
	app: Application;
}

namespace S {
	export const Body = styled.div`
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		min-height: 100%;
	`;

	export const Header = styled.div`
		display: flex;
		background: rgb(30, 30, 30);
		flex-grow: 0;
		flex-shrink: 0;
		color: white;
		font-family: Helvetica, Arial, sans-serif;
		padding: 10px;
		align-items: center;
	`;

	export const Content = styled.div`
		display: flex;
		flex-grow: 1;
	`;

	export const Layer = styled.div`
		position: relative;
		flex-grow: 1;
	`;
}

export class BodyWidget extends React.Component<BodyWidgetProps> {

	
	render() {

		
		var str = JSON.stringify(this.props.app.getDiagramEngine().getModel().serialize());
		

		var model2 = new DiagramModel();
		  

		return (
			<S.Body>
					
				<S.Header className=' overflow-auto'>
					<div className="title">Storm React Diagrams - DnD demo</div>
				</S.Header>
				<S.Content className='w-[100vw] justify-center mx-auto '>
					<TrayWidget>
						<TrayItemWidget model={{ type: 'Building' }} name="Building" color="rgb(192,255,0)" />
						<TrayItemWidget model={{ type: 'Solar Panel' }} name="Solar Panel" color="rgb(0,192,255)" />
						<TrayItemWidget model={{ type: 'Electricity Pole' }} name="Electricity Pole" color="rgb(192,255,0)" />
						<TrayItemWidget model={{ type: 'Battery' }} name="Battery" color="rgb(0,192,255)" />
					</TrayWidget>
					<S.Layer
                        className="mx-auto bg-slate-600"
						onDrop={(event) => {
							var data = JSON.parse(event.dataTransfer.getData('storm-diagram-node'));
							var nodesCount = _.keys(this.props.app.getDiagramEngine().getModel().getNodes()).length;

							var node: DiamondNodeModel = null;
							var node1: DiamondNodeModel1 = null;
							var node2: DiamondNodeModel2 = null;
							var node3: DiamondNodeModel3 = null;

							var port2
							var port1

							
							if (data.type === 'Building') {
								node = new DiamondNodeModel('Node ' + (nodesCount + 1));
								node.addPort(new AdvancedPortModel(false,"out"));
								let x =10
								if(x>=0){
									
								}
								var point = this.props.app.getDiagramEngine().getRelativeMousePoint(event);
								node.setPosition(point);
								this.props.app.getDiagramEngine().getModel().addNode(node);
								this.forceUpdate();
							
							} 
							if (data.type === 'Solar Panel') {
								node1 = new DiamondNodeModel1('Node1 ' + (nodesCount + 1));
								port1=node1.addPort(new AdvancedPortModel(true,"in-1"));
								var point = this.props.app.getDiagramEngine().getRelativeMousePoint(event);
								node1.setPosition(point);
								var link = new AdvancedLinkModel()
								this.props.app.getDiagramEngine().getModel().addNode(node1);
								// link.setSourcePort(port1)
								
								this.forceUpdate();
							}
							if (data.type === 'Electricity Pole') {
								node2 = new DiamondNodeModel2('Node2 ' + (nodesCount + 1));
								port2= node2.addPort(new AdvancedPortModel(false,"in-2"));
								var point = this.props.app.getDiagramEngine().getRelativeMousePoint(event);
								node2.setPosition(point);
								// link.setTargetPort(port2)
								
								this.props.app.getDiagramEngine().getModel().addNode(node2);
								this.forceUpdate();
							}
							if (data.type === 'Battery') {
								node3 = new DiamondNodeModel3('Node2 ' + (nodesCount + 1));
								node3.addPort(new AdvancedPortModel(false,"in-3"));
								var point = this.props.app.getDiagramEngine().getRelativeMousePoint(event);
								node3.setPosition(point);
								this.props.app.getDiagramEngine().getModel().addNode(node3);
								this.forceUpdate();
							}
							

							console.log(point)

							


							this.forceUpdate();

							

							
						}}
						onDragOver={(event) => {
							event.preventDefault();
						}}
					>
						<DemoWorkspaceWidget
							buttons={
								<DemoButton
									onClick={() => {
										action('Serialized Graph')((model2.serialize()));
										const yz= this.props.app.getDiagramEngine().getModel()

										var str = JSON.stringify(yz.serialize());

										// console.log(JSON.parse(str))
								
										async function raju() {
											try {
												const res = await axios({
												  method:"POST",
												  url:apis.MODIFY_DB_API,
												  data:{
													
													"links":str
												  },
												  withCredentials:true,
												  
												  
												})
												
												// console.log("Raju",JSON.parse(str))
												// console.log("Modified values are",res.data)
											  } catch (error) {
												console.log(error)
											  }
										}
								
										raju()

										
										// Create1()
										
									}}
								>
									Save
								</DemoButton>
							}
							
						>
							{/* <div> */}
								<DemoCanvasWidget >
									<CanvasWidget engine={this.props.app.getDiagramEngine()} />
								</DemoCanvasWidget>
							{/* </div> */}
							
						</DemoWorkspaceWidget>
						
                        
					</S.Layer>  
				</S.Content>
               
			</S.Body>
            
		);
	}
}
