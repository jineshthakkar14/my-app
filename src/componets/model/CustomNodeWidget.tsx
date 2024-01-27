import * as React from "react";
import { CustomNodeModel } from "./CustomNodeModel";
import {
  DiagramEngine,
  PortWidget,
} from "@projectstorm/react-diagrams";
import styled from "@emotion/styled";
import buliding from "../../assets/images/Bulding.jpeg";
import solar from "../../assets/images/solarpanel.jpeg";
import grid from "../../assets/images/Img1.jpeg";
import battery from "../../assets/images/Img2.jpeg";

import { CustomType } from "./CustomType";
import { useSelector } from "react-redux";
import { RootState } from "../..";

export interface CustomNodeWidgetProps {
  node: CustomNodeModel;
  engine: DiagramEngine;
  size?: number;
  type: CustomType;
}

namespace S {
  export const Port = styled.div`
    width: 220px;
    height: 190px;
    z-index: 50;
    // background: rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    cursor: pointer;

    &:hover {
      // background: rgba(0, 0, 0, 1);
    }
  `;
}

/**
 * @author Dylan Vorster
 */

export const CustomNodeWidget: React.FC<CustomNodeWidgetProps> = (props) => {
  

	const solarValue = useSelector((state:RootState) => state.solar.solarEnergy);
	const buildingValue = useSelector((state:RootState) => state.solar.buildingEnergy);

    const getPortName = (type:CustomType,node:CustomNodeModel) => {
		if(type==="building"){
			return node.getPort("building")
		}
		if(type==="solarPanel"){
			return node.getPort("solarPanel")
		}
		if(type==="battery"){
			return node.getPort("battery")
		}
		if(type==="grid"){
			return node.getPort("grid")
		}

	};

    return (
      <div
        style={{
          position: "relative",
          width: 200,
          height: 180
        }}
      >
        <div
          className="relative border-[1px] border-black z-10 p-2 w-fit h-fit bg-slate-50  ">
          {props.type === "solarPanel" && (
            <div className="-z-20">
              {solarValue}
              <img
                src={solar}
                alt="udshj"
                className="pointer-events-none z-20"
              ></img>
            </div>
          )}
          {props.type === "building" && (
            <div>
               {
                (<div>{buildingValue}</div>)
              }
              <img
                src={buliding}
                alt="udshj"
                className="pointer-events-none "
              ></img>
            </div>
          )}
          {props.type === "battery" && (
            <img
              src={battery}
              alt="udshj"
              className="pointer-events-none z-20"
            ></img>
          )}
          {props.type === "grid" && (
            <img
              src={grid}
              alt="udshj"
              className="pointer-events-none z-20"
            ></img>
          )}
        </div>

        <PortWidget
          style={{
            top: -9,
            right: -9,
            position: "absolute",
          }}
          port={getPortName(props.type,props.node)}
          engine={props.engine}
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

 
  

