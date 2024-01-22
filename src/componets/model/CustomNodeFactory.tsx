import { CustomNodeWidget } from './CustomNodeWidget';
import { CustomNodeModel } from './CustomNodeModel';
import * as React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { CustomType } from './CustomType';

export class CustomNodeFactory extends AbstractReactFactory<CustomNodeModel, DiagramEngine> {
	type:CustomType
	constructor(type:CustomType) {
		super(type);
		this.type=type;
	}

	generateReactWidget(event): JSX.Element {

		// console.log(this.engine)
		return <CustomNodeWidget engine={this.engine} size={50} node={event.model} type={this.type} />;
	}

	generateModel(event) {
		return new CustomNodeModel("",this.type);
	}
}