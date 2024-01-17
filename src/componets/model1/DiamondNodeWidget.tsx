import * as React from 'react';
import { SolarNodeModel } from './DiamondNodeModel';
import {  DefaultLinkModel, DefaultNodeModel, DiagramEngine, DiagramModel, LinkLayerModel, NodeWidget, PortModelAlignment, PortWidget } from '@projectstorm/react-diagrams';
import styled from '@emotion/styled';
import buliding from '../../assets/images/Bulding.jpeg'
import axios from 'axios';
import { apis } from '../../services/apis';
import { json } from 'stream/consumers';
import { serialize } from 'v8';
import { useDispatch } from 'react-redux';
import { setPosX } from '../../slices/solarSlice';
import { Application } from '../../Application';
import { AdvancedLinkModel } from '../../pages/Animation';


export interface DiamondNodeWidgetProps {
	node: SolarNodeModel;
	engine: DiagramEngine;
	size?: number;
}

export interface BodyWidgetProps {
	app: Application;
}

namespace S {
	export const Port = styled.div`
		width: 16px;
		height: 16px;
		z-index: 10;
		background: rgba(0, 0, 0, 0.5);
		border-radius: 8px;
		cursor: pointer;


		&:hover {
			background: rgba(0, 0, 0, 1);
		}
	`;
}

	


/**
 * @author Dylan Vorster
 */



export class DiamondNodeWidget extends React.Component<DiamondNodeWidgetProps & BodyWidgetProps> {
	
	 DummyView = () => {
		
		const [x, setX ] = React.useState(null)
		const [y, setY ] = React.useState(null)
		
		const[setLoading] = React.useState(false)

		// const links = Object.values(this.props.node.getPort(this.props.node.getPorts().right.getName()).getLinks());
		// const raj = links.map(link => link.getSourcePort());
		
		// console.log(raj)
		const dispatch = useDispatch()
		var z=this.props.node.getX()

		// dispatch(setPosX(z))5

		
		
		var xy =this.props.node.serialize().ports[3]
		// async function raju() {
		// 	try {
		// 		const res = await axios({
		// 		  method:"POST",
		// 		  url:apis.MODIFY_DB_API,
		// 		  data:{
		// 			"PositionX":x,
		// 			"PositionY":y,
		// 			// "links":xy
		// 		  },
		// 		  withCredentials:true,
				  
				  
		// 		})

				
				
				
		// 		// console.log("Modified values are",res.data)
		// 	  } catch (error) {
		// 		console.log(error)
		// 	  }
		// }

		var model = new DiagramModel();

		const link = new DefaultLinkModel()
		// console.log(Object.values(this.props.node.getPort(this.props.node.getPorts().right.getName()).getLinks()))
        // link.setSourcePort(Object.values(this.props.node.getPort(this.props.node.getPorts().right.getName()).getLinks()))
        
        // link.setTargetPort(Object.values(this.props.node.getPort(this.props.node.getPorts().right.getName()).getLinks())[0].getTargetPort());

		const links = Object.values(this.props.node.getPort(this.props.node.getPorts().right.getName()).getLinks());
		const raj = links.map(link => link.getSourcePort());

		

		const links1 = Object.values(this.props.node.getPort(this.props.node.getPorts().right.getName()).getLinks());
		const raj1 = links1.map(link => link.getTargetPort());


		// model.addAll(link)
		for (let index = 0; index < raj.length; index++) {
			link.setSourcePort(raj[index])
		}

		for (let index = 0; index < raj1.length; index++) {
			link.setTargetPort(raj1[index])
		}
		// console.log(link)

		// console.log(this.props.engine.setModel(model))


		
		// model.addLink(link)
		// model.addAll(this.props.node,link);

		async function ab() {
			try {
				console.log("success")
			} catch (error) {
				// console.log(error)
				console.log("failure")
			}
		}

		
		

		React.useEffect(() => {
			setX(this.props.node.getX())
			setY(this.props.node.getY())
			// raju()
			
			
			
        })
		
		
		// console.log(this.props.node.serialize())
		
		console.log()

		// console.log(x instanceof DiagramEngine )

		return null
    }


	

	render() {
		
		// function kc() {
			// console.log(this.props.node.getLink())
			// model
		
		

		



		const link = new AdvancedLinkModel()
		// console.log(Object.values(this.props.node.getPort(this.props.node.getPorts().right.getName()).getLinks()))
        // link.setSourcePort(Object.values(this.props.node.getPort(this.props.node.getPorts().right.getName()).getLinks()))
        
        // link.setTargetPort(Object.values(this.props.node.getPort(this.props.node.getPorts().right.getName()).getLinks())[0].getTargetPort());

		const links = Object.values(this.props.node.getPort(this.props.node.getPorts().out.getName()).getLinks());
		const raj = links.map(link => link.getSourcePort());

		

		const links1 = Object.values(this.props.node.getPort(this.props.node.getPorts().out.getName()).getLinks());
		const raj1 = links1.map(link => link.getTargetPort());

		



		for (let index = 0; index < raj.length; index++) {
			link.setSourcePort(raj[index])
		}

		for (let index = 0; index < raj1.length; index++) {
			link.setTargetPort(raj1[index])
		}

		var model = new DiagramModel();
		// const skd = this.props.app.getActiveDiagram().getNodes()[0]
		// const link1=this.props.app.getActiveDiagram().getActiveNodeLayer()

		// console.log(this.props.app.getActiveDiagram().getActiveLinkLayer())

		// model.addAll(link1)
		// console.log(link)

		

		// model.addAll(this.props.node,link);

		// console.log(model)

		// this.props.app.getDiagramEngine().getModel().addNode(this.props.node)
		// this.props.app.getDiagramEngine().getModel().addLink(link)
		// this.props.app.getActiveDiagram().addAll(this.props.node,link)

		// console.log(this.props.engine.setModel(this.props.app.getDiagramEngine().getModel()))

		
		// console.log(this.props.engine.setModel(this.props.app.getDiagramEngine().getModel()))

		// console.log(this.props.app.getDiagramEngine().getModel().addLink(link))
		

		// console.log(this.props.node)

		

		// console.log(this.props.app.getActiveDiagram().getNodes()[0])

		// this.props.engine.setModel(model)

		// console.log(DiagramModel)

		// console.log(1)

		// this.props.engine.setModel(this.props.engine.getModel());

		// console.log(this.props.engine.getModel())

		// console.log(2)
		// console.log(link
		
		// console.log(this.props.node.serialize().ports[3].links)

		return (

		
			
			<div
				style={{
					position: 'relative'
					// width: this.props.size,
					// height: this.props.size
				}}
			>
				<div className='relative border-[1px] border-black z-10 p-2 w-fit h-fit bg-slate-50' onClick={()=>{
					// try {
					// 	this.props.engine.setModel(model);
					// 	console.log("success")
					// } catch (error) {
					// 	console.log("failure")
					// }
				}}>
					<div className=' text-black ' >
						{this.props.node.getX()}
					</div>
					<img src={buliding }  alt='udshj' className='pointer-events-none z-20' 	></img>
					
					
					<this.DummyView/>
				</div>
			
                {/* {buliding} */}
				<PortWidget
					style={{
						top: this.props.size+25,
						right: -8,	
						position: 'absolute'
						
					}}
					
					// className="z-30"
					port={this.props.node.getPort("out")}
					engine={this.props.engine}
					

					
				>
					<S.Port onClick={()=>{
					// 	try {
					// 	this.props.engine.setModel(model);
					// 	console.log("success")
					// } catch (error) {
					// 	console.log("failure")
					// }
					}} />
					
				</PortWidget>
				
			</div>
			
			
		);
		
	}
	
}




