import { CustomNodeWidget } from './CustomNodeWidget';
import { CustomNodeModel } from './CustomNodeModel';
import * as React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { useDispatch } from 'react-redux';
import { setPosY } from '../../slices/solarSlice';
import { Application } from '../../Application';
import { CustomType } from './CustomType';

export class CustomNodeFactory extends AbstractReactFactory<CustomNodeModel, DiagramEngine> {
	type:CustomType
	number
	constructor(type:CustomType) {
		super(type);
		this.type=type;
	}

	generateReactWidget(event): JSX.Element {

		const xyz = new Application()

		// console.log(this.engine)
		return <CustomNodeWidget engine={this.engine} size={50} node={event.model} app={xyz} type={this.type} />;
	}

	generateModel(event) {
		return new CustomNodeModel("",this.type);
	}
}