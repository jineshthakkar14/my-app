import { LinkModel, PortModel, DefaultLinkModel, PortModelAlignment } from '@projectstorm/react-diagrams';

export class DiamondPortModel2 extends PortModel {
	constructor(alignment: PortModelAlignment) {
		super({
			type: 'diamond2',
			name: alignment,
			alignment: alignment,
		});
	}

	createLinkModel(): LinkModel {
		return new DefaultLinkModel();
	}
}