import {
  DefaultPortModel,
  DefaultLinkFactory,
  RightAngleLinkModel,
} from "@projectstorm/react-diagrams";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "..";
import { setModel } from "../slices/solarSlice";

export class AdvancedLinkModel extends RightAngleLinkModel {
  constructor() {
    super({
      type: "advanced",
      // width: 10
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
    return port instanceof GridPortModel || port instanceof BatteryPortModel;
  }
}

export const AdvancedLinkSegment = ({ model, path }) => {
  const dispatch = useDispatch();
  const pathRef = React.useRef(null);
  const circleRef = React.useRef(null);
  const percentRef = React.useRef(0);
  const animationFrameIdRef = React.useRef(null);

  const solarValue = useSelector((state: RootState) => state.solar.solarEnergy);
  const buildingValue = useSelector(
    (state: RootState) => state.solar.buildingEnergy
  );
  const [radius, setRadius] = React.useState(0);
  const [strokeWidth, setStrokeWidth] = React.useState(0);

  const targetPort = model.getTargetPort();
  const targetPortName = targetPort ? targetPort.getName() : null;

  const sourcePortName = model.getSourcePort().getName();
  React.useEffect(() => {
    dispatch(setModel(model));
    if (targetPortName === null) {
      setRadius(0);
      setStrokeWidth(2);
    } else if (solarValue == 0 && (sourcePortName === "solarPanel" || targetPortName === "solarPanel")) {
      setRadius(0);
      setStrokeWidth(2);
    } else if (buildingValue == 0 && (sourcePortName === "building" || targetPortName === "building")) {
      setRadius(0);
      setStrokeWidth(2);
    }else {
      setRadius(5);
      setStrokeWidth(2);
    }
  }, [solarValue, buildingValue, sourcePortName, dispatch, targetPortName]);

  const getDirection = (sourcePortName,targetPortName)=>{
	let direction = "outward"
	if(sourcePortName==="building"){
		direction ="inward"
	}else if(targetPortName === "building"){
		direction = "outward"
	}else if(sourcePortName === "solarPanel"){
		direction = "outward"
	}else if(targetPortName === "solarPanel" ){
		direction = "inward"
	}

	return direction
  }

  const animate = () => {
    if (!circleRef.current || !pathRef.current) {
      return;
    } 
	const direction = getDirection(sourcePortName,targetPortName)
	if (direction === "inward") {
      percentRef.current -= 0.5;
      if (percentRef.current < 0) {
        percentRef.current = 100;
      }
    } else {
      percentRef.current += 0.5;
      if (percentRef.current > 100) {
        percentRef.current = 0;
      }
    }

    const point = pathRef.current.getPointAtLength(
      pathRef.current.getTotalLength() * (percentRef.current / 100.0)
    );

    circleRef.current.setAttribute("cx", "" + point.x);
    circleRef.current.setAttribute("cy", "" + point.y);

    animationFrameIdRef.current = requestAnimationFrame(animate);
  };

  React.useEffect(() => {
    animate();
    return () => {
      cancelAnimationFrame(animationFrameIdRef.current);
    };
  }, [buildingValue, animate]);

  React.useEffect(() => {
    if (pathRef.current) {
      const initialPoint = pathRef.current.getPointAtLength(0);
      circleRef.current.setAttribute("cx", "" + initialPoint.x);
      circleRef.current.setAttribute("cy", "" + initialPoint.y);
      circleRef.current.setAttribute("r", radius);
    }
  }, [radius]);

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
    super("advanced");
  }

  generateModel(): AdvancedLinkModel {
    return new AdvancedLinkModel();
  }

  generateLinkSegment(
    model: AdvancedLinkModel,
    selected: boolean,
    path: string
  ) {
    return (
      <g>
        <AdvancedLinkSegment model={model} path={path} />
      </g>
    );
  }
}
