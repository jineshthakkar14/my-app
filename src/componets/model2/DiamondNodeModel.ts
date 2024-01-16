import { DefaultNodeModel, DefaultNodeModelOptions, NodeModel, NodeModelGenerics, PortModelAlignment } from '@projectstorm/react-diagrams';
import { DiamondPortModel1 } from './DiamondPortModel';


export interface DiamondNodeModelGenerics {
    PORT: DiamondPortModel1;
}

// this can be further extended for more complicated node types
export class DiamondNodeModel1 extends NodeModel<NodeModelGenerics & DiamondNodeModelGenerics & DefaultNodeModel> {
    constructor(name: string,options?: DefaultNodeModelOptions) {
        super({
            type: 'diamond1'
        });
        this.addPort(new DiamondPortModel1(PortModelAlignment.TOP));
        this.addPort(new DiamondPortModel1(PortModelAlignment.LEFT));
        this.addPort(new DiamondPortModel1(PortModelAlignment.BOTTOM));
        this.addPort(new DiamondPortModel1(PortModelAlignment.RIGHT));
    }
}