import {
	
	DefaultPortModel,
	DefaultLinkFactory,
	DefaultLinkModel
} from '@projectstorm/react-diagrams';
import * as React from 'react';



export class AdvancedLinkModel extends DefaultLinkModel {
	constructor() {
		super({
			type: 'advanced',
			width: 10
		});
	}
}

export class AdvancedPortModel extends DefaultPortModel {
	createLinkModel(): AdvancedLinkModel | null {
		return new AdvancedLinkModel();
	}
}

export class AdvancedLinkSegment extends React.Component<{ model: AdvancedLinkModel; path: string }> {
	path: SVGPathElement;
	circle: SVGElement;
	callback: () => any;
	percent: number;
	handle: any;
	mounted: boolean;

	constructor(props) {
		super(props);
		this.percent = 0;
	}

	componentDidMount() {
		this.mounted = true;
		this.callback = () => {
			if (!this.circle || !this.path) {
				return;
			}

			this.percent += 0.5;
			if (this.percent > 100) {
				this.percent = 0;
			}

			let point = this.path.getPointAtLength(this.path.getTotalLength() * (this.percent / 100.0));

			this.circle.setAttribute('cx', '' + point.x);
			this.circle.setAttribute('cy', '' + point.y);

			if (this.mounted) {
				requestAnimationFrame(this.callback);
			}
		};
		requestAnimationFrame(this.callback);
	}

	componentWillUnmount() {
		this.mounted = false;
	}

	render() {
		return (
			<>
				<path
					fill="none"
					ref={(ref) => {
						this.path = ref;
					}}
					strokeWidth={2}
					stroke="rgba(0,0,0)"
                    // color='black'
                    // className=' border border-black'
					d={this.props.path}
				/>
				<circle
					ref={(ref) => {
						this.circle = ref;
					}}
					r={4}
					fill=" black"
                    
				/>
			</>
		);
	}
}

export class AdvancedLinkFactory extends DefaultLinkFactory {
	constructor() {
		super('advanced');
	}

	generateModel(): AdvancedLinkModel {
		return new AdvancedLinkModel();
	}

	generateLinkSegment(model: AdvancedLinkModel, selected: boolean, path: string) {
		return (
			<g>
				<AdvancedLinkSegment model={model} path={path} />
			</g>
		);
	}
}
