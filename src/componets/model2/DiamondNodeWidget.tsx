import * as React from 'react';
import { DiamondNodeModel1 } from './DiamondNodeModel';
import { DefaultLinkModel, DiagramEngine, DiagramModel, PortModelAlignment, PortWidget } from '@projectstorm/react-diagrams';
import styled from '@emotion/styled';
import solar from '../../assets/images/solarpanel.jpeg'
import { useDispatch } from 'react-redux';
import { setPosX } from '../../slices/solarSlice';
import { setTimeout } from 'timers/promises';
import axios from 'axios';
import { apis } from '../../services/apis';


export interface DiamondNodeWidgetProps {
	node: DiamondNodeModel1;
	engine: DiagramEngine;
	size?: number;

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
export class DiamondNodeWidget1 extends React.Component<DiamondNodeWidgetProps> {
	constructor(props) {
		super(props);
		this.state = {
		  count: 0
		};
	  }

	// DummyView = () => {
	
	// 	  React.useEffect(() => {	
	// 		ab()
			
    //     })


	// 	var model = new DiagramModel();

	// 	const link = new DefaultLinkModel()
	// 	// console.log(Object.values(this.props.node.getPort(this.props.node.getPorts().right.getName()).getLinks()))
    //     // link.setSourcePort(Object.values(this.props.node.getPort(this.props.node.getPorts().right.getName()).getLinks()))
        
    //     // link.setTargetPort(Object.values(this.props.node.getPort(this.props.node.getPorts().right.getName()).getLinks())[0].getTargetPort());

	// 	const links = Object.values(this.props.node.getPort(this.props.node.getPorts().right.getName()).getLinks());
	// 	const raj = links.map(link => link.getSourcePort());

		

	// 	const links1 = Object.values(this.props.node.getPort(this.props.node.getPorts().right.getName()).getLinks());
	// 	const raj1 = links1.map(link => link.getTargetPort());

	// 	// model.addAll(link)

	// 	async function ab() {
	// 		try {
				

	// 			for (let index = 0; index < raj.length; index++) {
	// 				link.setSourcePort(raj[index])
	// 				// console.log(55)
	// 			}
		
	// 			for (let index = 0; index < raj1.length; index++) {
					
	// 				link.setTargetPort(raj1[index])
	// 				// console.log(55)
	// 			}
	// 			// console.log(link)
				
	// 			console.log(1)
				
	// 			model.addAll(link);
	// 			console.log(2)


	// 			this.props.engine.setModel(model);
	// 			console.log(3)

				
	// 			this.props.engine.repaintCanvas()
    // 	//    //5) load model into engine
       			
	// 			console.log("success")
	// 		} catch (error) {
	// 			console.log("failure")
	// 			// console.log(error)
	// 		}
	// 	}
		
		

	// 	return null
    // }
	render() {

		// var x:number

		
		// setInterval(function(){   
		// 	console.log("1")
		// this.state={ count: ((Math.ceil(Math.random() * 10) * (Math.round(Math.random()) ? 1 : -1)))}
		// 	console.log("2")
		// }, 5000);


		
		// console.log(this.state)
		// this.state={ count: ((Math.ceil(Math.random() * 10) * (Math.round(Math.random()) ? 1 : -1)))}

		// setInterval(function(){   
		// 	console.log(this.state.count)

		// }, 7000);


		

		// console.log(x)


		return (
			<div
				className={'diamond-node'}
				style={{
					position: 'relative'
					// width: this.props.size,
					// height: this.props.size
				}}
			>
				
				{/* <svg
					width={this.props.size}
					height={this.props.size}
					dangerouslySetInnerHTML={{
						__html:
							`
          <g id="Layer_1">
          </g>
          <g id="Layer_2">
            <polygon fill="mediumpurple" stroke="${
							this.props.node.isSelected() ? 'white' : '#000000'
						}" stroke-width="3" stroke-miterlimit="10" points="10,` +
							this.props.size / 2 +
							` ` +
							this.props.size / 2 +
							`,10 ` +
							(this.props.size - 10) +
							`,` +
							this.props.size / 2 +
							` ` +
							this.props.size / 2 +
							`,` +
							(this.props.size - 10) +
							` "/>
          </g>
        `
					}}
				/> */}

				
				
                <div className=' border-[1px] border-black -z-10 p-2'
				onClick={
					()=>{
						// try {
						// 	this.props.engine.setModel(model);
						// 	console.log("success")
						// } catch (error) {
						// 	console.log("failure")
						// }
					}
				} >
					<Like/>
					
					<img src={solar} alt='udshj' className=' -z-10 pointer-events-none'></img>
				</div>
				<PortWidget
					style={{
						top: this.props.size-50,
						right: -8,
						position: 'absolute'
					}}
					className=""
					port={this.props.node.getPort("in-1")}
					engine={this.props.engine}
				>
					
					<S.Port />
				</PortWidget>
				{/* <PortWidget
					style={{
						left: this.props.size / 2 - 8,
						top: -8,
						position: 'absolute'
					}}
					port={this.props.node.getPort(PortModelAlignment.TOP)}
					engine={this.props.engine}
				>
					<S.Port />
				</PortWidget>
				<PortWidget
					style={{
						left: this.props.size - 8,
						top: this.props.size / 2 - 8,
						position: 'absolute'
					}}
					port={this.props.node.getPort(PortModelAlignment.RIGHT)}
					engine={this.props.engine}
				>
					<S.Port />
				</PortWidget>
				<PortWidget
					style={{
						left: this.props.size / 2 - 8,
						top: this.props.size - 8,
						position: 'absolute'
					}}
					port={this.props.node.getPort(PortModelAlignment.BOTTOM)}
					engine={this.props.engine}
				>
					<S.Port />
				</PortWidget> */}
			</div>
		);
	}
}

const Like = () => {
	const [first, setfirst] = React.useState(0)
	setInterval(function(){   
		setfirst(Math.ceil(Math.random() * 10) * (Math.round(Math.random()) ? 1 : -1))
		
		
	}, 3000);
	

	async function modifyPosition() {
		try {
			const res = await axios({
			  method:"POST",
			  url:apis.MODIFY_DB_API,
			  data:{
				
				"PositionX":first
			  },
			  withCredentials:true,
			  
			  
			})
			
			// console.log("Modified values are",res.data)
		  } catch (error) {
			console.log(error)
		  }
	}

	modifyPosition()

  return (
	<div>
		{first}
	</div>
  )
}