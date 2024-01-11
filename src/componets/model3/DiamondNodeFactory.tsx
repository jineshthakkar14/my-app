import { DiamondNodeWidget2 } from './DiamondNodeWidget';
import { DiamondNodeModel2} from './DiamondNodeModel';
import * as React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

export class DiamondNodeFactory2 extends AbstractReactFactory<DiamondNodeModel2, DiagramEngine> {
	constructor() {
		super('diamond2');
	}

	generateReactWidget(event): JSX.Element {
		return <DiamondNodeWidget2 engine={this.engine} size={50} node={event.model} />;
	}

	generateModel(event) {
		return new DiamondNodeModel2();
	}
}