import { LinkModel, PortModel, DefaultLinkModel, PortModelAlignment, DefaultPortModel } from '@projectstorm/react-diagrams';

export class DiamondPortModel extends DefaultPortModel {
	constructor(alignment: PortModelAlignment) {
		super({
			type: 'diamond',
			name: alignment,
			alignment: alignment,
		});
	}

	createLinkModel(): LinkModel {
		return new DefaultLinkModel();
	}
}