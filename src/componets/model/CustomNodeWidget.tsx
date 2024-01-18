import * as React from "react";
import { CustomNodeModel } from "./CustomNodeModel";
import {
  DefaultLinkModel,
  DefaultNodeModel,
  DiagramEngine,
  DiagramModel,
  LinkLayerModel,
  NodeWidget,
  PortModelAlignment,
  PortWidget,
} from "@projectstorm/react-diagrams";
import styled from "@emotion/styled";
import buliding from "../../assets/images/Bulding.jpeg";
import solar from "../../assets/images/solarpanel.jpeg";
import grid from "../../assets/images/Img1.jpeg";
import battery from "../../assets/images/Img2.jpeg";

import axios from "axios";
import { apis } from "../../services/apis";
import { json } from "stream/consumers";
import { serialize } from "v8";
import { useDispatch } from "react-redux";
import { setPosX } from "../../slices/solarSlice";
import { Application } from "../../Application";
import { AdvancedLinkModel } from "../../pages/Animation";
import { CustomType } from "./CustomType";

export interface CustomNodeWidgetProps {
  node: CustomNodeModel;
  engine: DiagramEngine;
  size?: number;
  type: CustomType;
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

export class CustomNodeWidget extends React.Component<
  CustomNodeWidgetProps
> {
  DummyView = () => {
    const [x, setX] = React.useState(null);
    const [y, setY] = React.useState(null);

    const [setLoading] = React.useState(false);

    // const links = Object.values(this.props.node.getPort(this.props.node.getPorts().right.getName()).getLinks());
    // const raj = links.map(link => link.getSourcePort());

    // console.log(raj)
    const dispatch = useDispatch();
    var z = this.props.node.getX();

    // dispatch(setPosX(z))5

    var xy = this.props.node.serialize().ports[3];
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

    const link = new DefaultLinkModel();
    // console.log(Object.values(this.props.node.getPort(this.props.node.getPorts().right.getName()).getLinks()))
    // link.setSourcePort(Object.values(this.props.node.getPort(this.props.node.getPorts().right.getName()).getLinks()))

    // link.setTargetPort(Object.values(this.props.node.getPort(this.props.node.getPorts().right.getName()).getLinks())[0].getTargetPort());

    const links = Object.values(
      this.props.node
        .getPort(this.props.node.getPorts().right.getName())
        .getLinks()
    );
    const raj = links.map((link) => link.getSourcePort());

    const links1 = Object.values(
      this.props.node
        .getPort(this.props.node.getPorts().right.getName())
        .getLinks()
    );
    const raj1 = links1.map((link) => link.getTargetPort());

    // model.addAll(link)
    for (let index = 0; index < raj.length; index++) {
      link.setSourcePort(raj[index]);
    }

    for (let index = 0; index < raj1.length; index++) {
      link.setTargetPort(raj1[index]);
    }
    // console.log(link)

    // console.log(this.props.engine.setModel(model))

    // model.addLink(link)
    // model.addAll(this.props.node,link);

    async function ab() {
      try {
        console.log("success");
      } catch (error) {
        // console.log(error)
        console.log("failure");
      }
    }

    React.useEffect(() => {
      setX(this.props.node.getX());
      setY(this.props.node.getY());
      // raju()
    });

    // console.log(this.props.node.serialize())

    console.log();

    // console.log(x instanceof DiagramEngine )

    return null;
  };

  render() {

    const getPortName = (type:CustomType,node:CustomNodeModel) => {
		if(type==="building"){
			return node.getPort("out")
		}
		if(type==="solarPanel"){
			return node.getPort("in-1")
		}
		if(type==="battery"){
			return node.getPort("in-3")
		}
		if(type==="grid"){
			return node.getPort("in-2")
		}

	};

  const getPosition =()=>{
    if(this.props.type==="building"){
			return {
        top: this.props.size + 25,
        right: -8,
        position: "absolute",
      }
		}
		if(this.props.type==="solarPanel"){
			return {
        top: this.props.size-50,
        right: -8,
        position: 'absolute'
      }
		}
		if(this.props.type==="grid"){
			return {
        top: this.props.size ,
        left: -10,
        position: 'absolute'
      }
		}
		if(this.props.type==="battery"){
			return {
        bottom: this.props.size-50 ,
        left: -10,
        position: 'absolute',
        
      }
		}
  }

    return (
      <div
        style={{
          position: "relative",
          // width: this.props.size,
          // height: this.props.size
        }}
      >
        <div
          className="relative border-[1px] border-black z-10 p-2 w-fit h-fit bg-slate-50"
          onClick={() => {
            // try {
            // 	this.props.engine.setModel(model);
            // 	console.log("success")
            // } catch (error) {
            // 	console.log("failure")
            // }
          }}
        >
          <div className=" text-black "></div>
          {this.props.type === "solarPanel" && (
            <div>
              <Like></Like>
              <img
                src={solar}
                alt="udshj"
                className="pointer-events-none z-20"
              ></img>
            </div>
          )}
          {this.props.type === "building" && (
            <img
              src={buliding}
              alt="udshj"
              className="pointer-events-none z-20"
            ></img>
          )}
          {this.props.type === "battery" && (
            <img
              src={battery}
              alt="udshj"
              className="pointer-events-none z-20"
            ></img>
          )}
          {this.props.type === "grid" && (
            <img
              src={grid}
              alt="udshj"
              className="pointer-events-none z-20"
            ></img>
          )}

          <this.DummyView />
        </div>

        {/* {buliding} */}
        <PortWidget
          style={getPosition()}
          // className="z-30"
          port={getPortName(this.props.type,this.props.node)}
          engine={this.props.engine}
        >
          <S.Port
            onClick={() => {
              // 	try {
              // 	this.props.engine.setModel(model);
              // 	console.log("success")
              // } catch (error) {
              // 	console.log("failure")
              // }
            }}
          />
        </PortWidget>
      </div>
    );
  }
}


const Like = () => {
	const [first, setfirst] = React.useState(0)
	
	

  async function Create1() {
    try {
      const res = await axios({
        method: "GET",
        url: apis.GETALLVALUES_API,
        withCredentials: true,
      });

      console.log(res.data.ans.positionX);
      setfirst(res.data.ans.positionX)
      
    } catch (error) {
      console.log(error);
    }
  }

 React.useEffect(() => {
    Create1()
 })
 

  return (
	<div>
		{first}
	</div>
  )
}
