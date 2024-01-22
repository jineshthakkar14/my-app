import { DefaultNodeModel, DefaultNodeModelOptions, NodeModel, NodeModelGenerics, PortModelAlignment } from '@projectstorm/react-diagrams';
import { CustomPortModel } from './CustomPortModel';
import { CustomType } from './CustomType';

export interface CustomNodeModelGenerics {
    PORT: CustomPortModel;
}
export class CustomNodeModel extends NodeModel<NodeModelGenerics & CustomNodeModelGenerics & DefaultNodeModel> {
    constructor(name: string,type:CustomType,options?: DefaultNodeModelOptions,)
    {
        super({
            type:type
        });
        this.addPort(new CustomPortModel(PortModelAlignment.TOP,type));
        this.addPort(new CustomPortModel(PortModelAlignment.LEFT,type));
        this.addPort(new CustomPortModel(PortModelAlignment.BOTTOM,type));
        this.addPort(new CustomPortModel(PortModelAlignment.RIGHT,type));
    }
}