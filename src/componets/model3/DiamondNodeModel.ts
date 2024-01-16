import { DefaultNodeModel, DefaultNodeModelOptions, NodeModel, NodeModelGenerics, PortModelAlignment } from '@projectstorm/react-diagrams';
import { DiamondPortModel2 } from './DiamondPortModel';

export interface DiamondNodeModelGenerics {
    PORT: DiamondPortModel2;
}

// this can be further extended for more complicated node types
export class DiamondNodeModel2 extends NodeModel<NodeModelGenerics & DiamondNodeModelGenerics & DefaultNodeModel> {
    constructor(name?: string,options?: DefaultNodeModelOptions) {
        super({
            type: 'diamond2'
        });
        this.addPort(new DiamondPortModel2(PortModelAlignment.TOP));
        this.addPort(new DiamondPortModel2(PortModelAlignment.LEFT));
        this.addPort(new DiamondPortModel2(PortModelAlignment.BOTTOM));
        this.addPort(new DiamondPortModel2(PortModelAlignment.RIGHT));
    }
}