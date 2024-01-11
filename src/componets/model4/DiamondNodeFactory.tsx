import { DiamondNodeWidget3 } from './DiamondNodeWidget';
import { DiamondNodeModel3} from './DiamondNodeModel';
import * as React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class DiamondNodeFactory3 extends AbstractReactFactory<DiamondNodeModel3, DiagramEngine> {
	constructor() {
		super('diamond3');
	}

	generateReactWidget(event): JSX.Element {
		return <DiamondNodeWidget3 engine={this.engine} size={50} node={event.model} />;
	}

	generateModel(event) {
		return new DiamondNodeModel3();
	}
}