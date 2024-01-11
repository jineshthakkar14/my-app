import { NodeModel, NodeModelGenerics, PortModelAlignment } from '@projectstorm/react-diagrams';
import { DiamondPortModel3 } from './DiamondPortModel';

export interface DiamondNodeModelGenerics {
    PORT: DiamondPortModel3;
}

// this can be further extended for more complicated node types
export class DiamondNodeModel3 extends NodeModel<NodeModelGenerics & DiamondNodeModelGenerics> {
    constructor() {
        super({
            type: 'diamond3'
        });
        this.addPort(new DiamondPortModel3(PortModelAlignment.TOP));
        this.addPort(new DiamondPortModel3(PortModelAlignment.LEFT));
        this.addPort(new DiamondPortModel3(PortModelAlignment.BOTTOM));
        this.addPort(new DiamondPortModel3(PortModelAlignment.RIGHT));
    }
}