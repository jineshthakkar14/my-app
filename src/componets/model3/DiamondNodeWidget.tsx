import * as React from 'react';
import { DiamondNodeModel2 } from './DiamondNodeModel';
import { DefaultLinkModel, DiagramEngine, DiagramModel, PortModelAlignment, PortWidget } from '@projectstorm/react-diagrams';
import styled from '@emotion/styled';
import img1 from '../../assets/images/Img1.jpeg'

export interface DiamondNodeWidgetProps {
	node: DiamondNodeModel2;
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
export class DiamondNodeWidget2 extends React.Component<DiamondNodeWidgetProps> {
// 	DummyView = () => {
	
// 		React.useEffect(() => {	
// 		  ab()
		  
// 	  })


// 	  var model = new DiagramModel();

// 	  const link = new DefaultLinkModel()
// 	  // console.log(Object.values(this.props.node.getPort(this.props.node.getPorts().right.getName()).getLinks()))
// 	  // link.setSourcePort(Object.values(this.props.node.getPort(this.props.node.getPorts().right.getName()).getLinks()))
	  
// 	  // link.setTargetPort(Object.values(this.props.node.getPort(this.props.node.getPorts().right.getName()).getLinks())[0].getTargetPort());

// 	  const links = Object.values(this.props.node.getPort(this.props.node.getPorts().right.getName()).getLinks());
// 	  const raj = links.map(link => link.getSourcePort());

	  

// 	  const links1 = Object.values(this.props.node.getPort(this.props.node.getPorts().right.getName()).getLinks());
// 	  const raj1 = links1.map(link => link.getTargetPort());

// 	  // model.addAll(link)

// 	  async function ab() {
// 		  try {

// 			  for (let index = 0; index < raj.length; index++) {
// 				  link.setSourcePort(raj[index])
// 			  }
	  
// 			  for (let index = 0; index < raj1.length; index++) {
// 				  link.setTargetPort(raj1[index])
// 			  }
// 			//   console.log(link)
// 			//   this.props.engine.repaintCanvas()
// 		  		model.addAll(link);
	
// 	  //    //5) load model into engine
// 			 this.props.engine.setModel(model);
// 			  console.log("success")
// 		  } catch (error) {
// 			console.log("failure")
// 			//   console.log(error)
// 		  }
// 	  }
	  
	  

// 	  return null
//   }
	render() {

		var model = new DiagramModel();

		const link = new DefaultLinkModel()
		// console.log(Object.values(this.props.node.getPort(this.props.node.getPorts().right.getName()).getLinks()))
        // link.setSourcePort(Object.values(this.props.node.getPort(this.props.node.getPorts().right.getName()).getLinks()))
        
        // link.setTargetPort(Object.values(this.props.node.getPort(this.props.node.getPorts().right.getName()).getLinks())[0].getTargetPort());

		const links = Object.values(this.props.node.getPort(this.props.node.getPorts().right.getName()).getLinks());
		const raj = links.map(link => link.getSourcePort());

		

		const links1 = Object.values(this.props.node.getPort(this.props.node.getPorts().right.getName()).getLinks());
		const raj1 = links1.map(link => link.getTargetPort());



		for (let index = 0; index < raj.length; index++) {
			link.setSourcePort(raj[index])
		}

		for (let index = 0; index < raj1.length; index++) {
			link.setTargetPort(raj1[index])
		}

		model.addAll(this.props.node,link);
		
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
			<div className=' border-[1px] border-black -z-10 p-2' onClick={()=>
				{
					// try {
					// 	this.props.engine.setModel(model);
					// 	console.log("success")
					// } catch (error) {
					// 	console.log("failure")
					// }
				}
			}>
					<img src={img1} alt='udshj' className='z-10 pointer-events-none bg-none' 	></img>
					{/* <this.DummyView></this.DummyView> */}
				</div>
				<PortWidget
					style={{
						top: this.props.size ,
						left: -10,
						position: 'absolute'
					}}
					className="z-30"
					port={this.props.node.getPort("in-2")}
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