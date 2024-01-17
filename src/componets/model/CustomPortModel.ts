import { LinkModel, PortModel, DefaultLinkModel, PortModelAlignment, DefaultPortModel } from '@projectstorm/react-diagrams';
import { CustomType } from './CustomType';

export class CustomPortModel extends DefaultPortModel {
	constructor(alignment: PortModelAlignment, portModelType:CustomType)
	 {
		super({
			type: portModelType,
			name: alignment,
			alignment: alignment,
		});
	}

	createLinkModel(): LinkModel {
		return new DefaultLinkModel();
	}
}