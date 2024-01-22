import * as React from "react";
import { CustomNodeModel } from "./CustomNodeModel";
import {
  DiagramEngine,
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
import { CustomType } from "./CustomType";
import { useDispatch, useSelector } from "react-redux";
import { setBuildingEnergy, setLoading, setSolarEnergy } from "../../slices/solarSlice";
import { RootState } from "../..";

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

export const CustomNodeWidget: React.FC<CustomNodeWidgetProps> = (props) => {

  const dispatch = useDispatch()
  const [randomValue, setRandomValue] = React.useState<number>(0);

  const [randomValue1, setRandomValue1] = React.useState<number>(0);
  const loading = useSelector((state:RootState) => state.solar.loading);

  React.useEffect(() => {  
    const intervalId = setInterval(() => {
      
      const newValue1 = Math.floor(Math.random() * 21);

      setRandomValue(newValue1);
      
      dispatch(setSolarEnergy(newValue1));
      
    }, 15000);
    return () => clearInterval(intervalId); 
  }, [dispatch]);

  React.useEffect(() => {
    const intervalId1 = setInterval(() => {
      const newValue2 = Math.floor(Math.random() * 21);

      setRandomValue1(newValue2);
      
      dispatch(setBuildingEnergy(newValue2));
    }, 15000);

    return () => clearInterval(intervalId1);
  }, [dispatch]);

	const solarValue = useSelector((state:RootState) => state.solar.solarEnergy);
	const buildingValue = useSelector((state:RootState) => state.solar.buildingEnergy);

    const getPortName = (type:CustomType,node:CustomNodeModel) => {
		if(type==="building"){
			return node.getPort("out")
		}
		if(type==="solarPanel"){
			return node.getPort("in-1") || node.getPort(PortModelAlignment.BOTTOM)
		}
		if(type==="battery"){
			return node.getPort("in-3")
		}
		if(type==="grid"){
			return node.getPort("in-2")
		}

	};

  const getPosition =()=>{
    if(props.type==="building"){
			return {
        top: props.size + 25,
        right: -8,
        position: "absolute",
      }
		}
		if(props.type==="solarPanel"){
			return {
        top: props.size-50,
        right: -8,
        position: 'absolute'
      }
		}
		if(props.type==="grid"){
			return {
        top: props.size ,
        left: -10,
        position: 'absolute'
      }
		}
		if(props.type==="battery"){
			return {
        bottom: props.size-40 ,
        left: -8,
        position: 'absolute',
        
      }
		}
  }

    return (
      <div
        style={{
          position: "relative",
          width: 200,
          height: 180
        }}
      >
        <div
          className="relative border-[1px] border-black z-10 p-2 w-fit h-fit bg-slate-50">
          <div className=" text-black "></div>
          {props.type === "solarPanel" && (
            <div>
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
                loading?(<div>
                  <div>Loading...</div>
                </div>):(<div>{buildingValue}</div>)
              }
              <img
                src={buliding}
                alt="udshj"
                className="pointer-events-none z-20"
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

        {/* {buliding} */}
        <PortWidget
          style={getPosition()}
          // className="z-30"
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

 
  

