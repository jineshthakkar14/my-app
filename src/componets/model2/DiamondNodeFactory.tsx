import { DiamondNodeWidget1 } from './DiamondNodeWidget';
import { DiamondNodeModel1} from './DiamondNodeModel';
import * as React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class DiamondNodeFactory1 extends AbstractReactFactory<DiamondNodeModel1, DiagramEngine> {
	constructor() {
		super('diamond1');
	}

	generateReactWidget(event): JSX.Element {
		return <DiamondNodeWidget1 engine={this.engine} size={50} node={event.model} />;
	}

	generateModel(event) {
		return new DiamondNodeModel1();
	}
}