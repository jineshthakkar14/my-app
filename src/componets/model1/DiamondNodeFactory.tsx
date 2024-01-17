import { DiamondNodeWidget } from './DiamondNodeWidget';
import { SolarNodeModel } from './DiamondNodeModel';
import * as React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { useDispatch } from 'react-redux';
import { setPosY } from '../../slices/solarSlice';
import { Application } from '../../Application';

export class DiamondNodeFactory extends AbstractReactFactory<SolarNodeModel, DiagramEngine> {
	number
	constructor() {
		super('diamond');
	}

	generateReactWidget(event): JSX.Element {

		const xyz = new Application()

		// console.log(this.engine)
		return <DiamondNodeWidget engine={this.engine} size={50} node={event.model} app={xyz} />;
	}

	generateModel(event) {
		return new SolarNodeModel("Diamond");
	}
}