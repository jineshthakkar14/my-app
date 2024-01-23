import {
	
	DefaultPortModel,
	DefaultLinkFactory,
	DefaultLinkModel,
	AbstractModelFactory,
	RightAngleLinkModel,
	LinkModel,
} from '@projectstorm/react-diagrams';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '..';
import { setLoading } from '../slices/solarSlice';


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

export class SolarPortModel extends AdvancedPortModel {
	canLinkToPort(port: DefaultPortModel): boolean {
	  return port instanceof GridPortModel || port instanceof BatteryPortModel;
	}
  }

  export class BatteryPortModel extends AdvancedPortModel {
	canLinkToPort(port: DefaultPortModel): boolean {
	  return port instanceof BuildingPortModel || port instanceof SolarPortModel;
	}
  }
  
  export class GridPortModel extends AdvancedPortModel {
	canLinkToPort(port: DefaultPortModel): boolean {
	  return port instanceof SolarPortModel || port instanceof BuildingPortModel;
	}
  }

  export class BuildingPortModel extends AdvancedPortModel {
	canLinkToPort(port: DefaultPortModel): boolean {
		return port instanceof GridPortModel;
	}
  }
  

  export const AdvancedLinkSegment = ({ model, path }) => {
	const pathRef = React.useRef(null);
	const circleRef = React.useRef(null);
	const percentRef = React.useRef(0);
	const animationFrameIdRef = React.useRef(null);
  
	const solarValue = useSelector((state:RootState) => state.solar.solarEnergy);
	const buildingValue = useSelector((state:RootState) => state.solar.buildingEnergy);
	const [radius, setRadius] = React.useState(0)
	const [strokeWidth, setStrokeWidth] = React.useState(0)

	  const targetPort = model.getTargetPort();
	  const targetPortName = targetPort ? targetPort.getName() : null;

	  React.useEffect(() => {
		
		if((solarValue - buildingValue) > 0 && (model.getSourcePort().getName()==="out" || model.getSourcePort().getName()==="in-2")){
			setRadius(0)
			setStrokeWidth(2)
		}else if(solarValue===0 && model.getSourcePort().getName()==="in-1"){
			setRadius(0)
			setStrokeWidth(2)
		}else{
			setRadius(5)
			setStrokeWidth(2)
		}
	  }, [solarValue, buildingValue, model.getSourcePort().getName()]);

	  
	 
	
	const animate = () => {
		if (!circleRef.current || !pathRef.current) {
		  return;
		}else if(((model.getSourcePort().getName()==="out" && targetPortName==="in-2"))){
			
			percentRef.current -= 0.5	 ; 
			if (percentRef.current < 0) {
			percentRef.current = 100;
			}
			
		}
		else{
			percentRef.current += 0.5;
			if (percentRef.current > 100) {
			percentRef.current = 0;
			}
		}

		const point = pathRef.current.getPointAtLength(pathRef.current.getTotalLength() * (percentRef.current / 100.0));
	
		circleRef.current.setAttribute('cx', '' + (point.x));
		circleRef.current.setAttribute('cy', '' + (point.y));
	
		animationFrameIdRef.current = requestAnimationFrame(animate);
	  };
	
	  React.useEffect(() => {
		animate();
		return () => {
		  cancelAnimationFrame(animationFrameIdRef.current);
		};
	  },[buildingValue,animate] );
	
	  React.useEffect(() => {
		if (pathRef.current) {
		  const initialPoint = pathRef.current.getPointAtLength(0);
		  circleRef.current.setAttribute('cx', '' + initialPoint.x);
		  circleRef.current.setAttribute('cy', '' + initialPoint.y);
		  circleRef.current.setAttribute('r', radius);
		}
	  },[radius]);
  
	return (
	  <>
		<path
		  fill="none"
		  ref={(ref) => {
			pathRef.current = ref;
		  }}
		  strokeWidth={strokeWidth}
		  stroke="rgba(0,0,0)"
		  d={path}
		/>
		<circle
		  ref={(ref) => {
			circleRef.current = ref;
		  }}
		//   r= {radius}
		  fill="black"
		/>
	  </>
	);
  };

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
