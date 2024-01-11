import { LinkModel, PortModel, DefaultLinkModel, PortModelAlignment } from '@projectstorm/react-diagrams';

export class DiamondPortModel1 extends PortModel {
	constructor(alignment: PortModelAlignment) {
		super({
			type: 'diamond1',
			name: alignment,
			alignment: alignment,
		});
	}

	createLinkModel(): LinkModel {
		return new DefaultLinkModel();
	}
}