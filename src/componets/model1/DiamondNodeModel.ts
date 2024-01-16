import { BasePositionModelOptions, DefaultNodeModel, DefaultNodeModelOptions, NodeModel, NodeModelGenerics, PortModelAlignment } from '@projectstorm/react-diagrams';
import { DiamondPortModel } from './DiamondPortModel';

export interface DiamondNodeModelGenerics {
    PORT: DiamondPortModel;
}

// export interface DefaultNodeModelOptions extends BasePositionModelOptions {
//     name?: string;
//     color?: string;
// }
// export interface DefaultNodeModelGenerics extends NodeModelGenerics {
//     OPTIONS: DefaultNodeModelOptions;
// }

// this can be further extended for more complicated node types
export class DiamondNodeModel extends NodeModel<NodeModelGenerics & DiamondNodeModelGenerics & DefaultNodeModel> {
    // constructor(name: string, color: string);
    constructor(name: string,options?: DefaultNodeModelOptions)
    {
        super({
            type: 'diamond'
        });
        this.addPort(new DiamondPortModel(PortModelAlignment.TOP));
        this.addPort(new DiamondPortModel(PortModelAlignment.LEFT));
        this.addPort(new DiamondPortModel(PortModelAlignment.BOTTOM));
        this.addPort(new DiamondPortModel(PortModelAlignment.RIGHT));
    }
}