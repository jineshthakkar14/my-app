import { LinkModel, PortModel, DefaultLinkModel, PortModelAlignment } from '@projectstorm/react-diagrams';

export class DiamondPortModel3 extends PortModel {
	constructor(alignment: PortModelAlignment) {
		super({
			type: 'diamond3',
			name: alignment,
			alignment: alignment,
		});
	}

	createLinkModel(): LinkModel {
		return new DefaultLinkModel();
	}
}