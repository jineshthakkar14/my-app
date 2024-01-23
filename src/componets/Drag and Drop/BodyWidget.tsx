import * as React from "react";
import * as _ from "lodash";
import { TrayWidget } from "./TragWidget";
import { Application } from "../../Application";
import { TrayItemWidget } from "./TragItemWidget";
import { DiagramModel, PortModelAlignment } from "@projectstorm/react-diagrams";
import {  CanvasWidget } from "@projectstorm/react-canvas-core";
import { action } from "@storybook/addon-actions";

import styled from "@emotion/styled";
import { DemoCanvasWidget } from "./DemoCanvasWidget";
import { DemoButton, DemoWorkspaceWidget } from "./DemoWorkspaceWIdget";

import { BatteryPortModel, BuildingPortModel, GridPortModel, SolarPortModel } from "../../pages/Animation";

import { CustomNodeModel } from "../model/CustomNodeModel";
import { RootState } from "../..";
import { connect } from "react-redux";
import { CustomPortModel } from "../model/CustomPortModel";

export interface BodyWidgetProps {
  app: Application;
  value?: number;
  loading?:boolean
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

    var model2 = new DiagramModel();
    return (
      <S.Body>
        <S.Header className=" overflow-auto">
          <div className="title">Storm React Diagrams - DnD demo</div>
        </S.Header>
        <S.Content className="w-[100vw] justify-center mx-auto ">
          <TrayWidget>
            <TrayItemWidget
              model={{ type: "building" }}
              name="Building"
              color="rgb(192,255,0)"
            />
            <TrayItemWidget
              model={{ type: "solarPanel" }}
              name="Solar Panel"
              color="rgb(0,192,255)"
            />
            <TrayItemWidget
              model={{ type: "grid" }}
              name="Grid"
              color="rgb(192,255,0)"
            />
            <TrayItemWidget
              model={{ type: "battery" }}
              name="Battery"
              color="rgb(0,192,255)"
            />
          </TrayWidget>
          <S.Layer
            className="mx-auto  "
            onDrop={(event) => {
              var data = JSON.parse(
                event.dataTransfer.getData("storm-diagram-node")
              );
              var nodesCount = _.keys(
                this.props.app.getDiagramEngine().getModel().getNodes()
              ).length;

              var node: CustomNodeModel = null;

              const x = this.props.app.getActiveDiagram().getLinks();
              

              if (data.type === "building") {
                node = new CustomNodeModel(
                  "Node " + (nodesCount + 1),
                  data.type
                );
                node.addPort(new BuildingPortModel(false, "out"));
              }
              if (data.type === "solarPanel") {
                
                node = new CustomNodeModel(
                  "Node1 " + (nodesCount + 1),
                  data.type
                );
                node.addPort(new SolarPortModel(true, "in-1")); 
              }
              if (data.type === "grid") {
                node = new CustomNodeModel(
                  "Node2 " + (nodesCount + 1),
                  data.type
                );
                node.addPort(new GridPortModel(false, "in-2"));
              }
              if (data.type === "battery") {
                node = new CustomNodeModel(
                  "Node2 " + (nodesCount + 1),
                  data.type
                );
                node.addPort(new BatteryPortModel(false, "in-3"));
              }

              var point = this.props.app
                  .getDiagramEngine()
                  .getRelativeMousePoint(event);
                node.setPosition(point);
                this.props.app.getDiagramEngine().getModel().addNode(node);
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
                    action("Serialized Graph")(model2.serialize());
                    const newModel = this.props.app
                      .getDiagramEngine()
                      .getModel();
					          const data = newModel.serialize()

                    // Convert JSON data to a string
                    const jsonData = JSON.stringify(data, null, 2);

                    // Create a Blob containing the JSON data
                    const blob = new Blob([jsonData], {
                      type: "application/json",
                    });

                    // Create a link element
                    const link = document.createElement("a");

                    // Set the link's attributes
                    link.href = window.URL.createObjectURL(blob);
                    link.download = "widget.json";

                    // Append the link to the document
                    document.body.appendChild(link);

                    // Trigger a click on the link to initiate download
                    link.click();

                    // Remove the link from the document
                    document.body.removeChild(link);

                  }}
                >
                  Download State
                </DemoButton>
              }
            >
              {/* <div> */}
              <DemoCanvasWidget>
                {/* <div className=" h-[100px] ">
                  <label className='w-full'>
                      <p className='text-[0.875rem] text-black mb-1 leading-[1.375rem]'>
                          Email Address
                          <sup className='text-pink-200'>*</sup>
                      </p>
                      <input type='email' required placeholder='Enter your Email' name='email' className='bg-black rounded-[0.75rem] w-full p-[12px] text-white'></input>
                  </label>
                </div> */}
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
