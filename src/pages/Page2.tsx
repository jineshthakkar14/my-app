import * as React from 'react';
import { Application } from '../Application';
import { BodyWidget } from '../componets/Drag and Drop/BodyWidget';
import { RootState } from '..';
import { useSelector } from 'react-redux';


export interface BodyWidgetProps1 {
	app: Application;
}

const json  = {
  obj1:{
    x:500,
    y:400
  },
  obj2:{
    x:500,
    y:400
  },
  obj3:{
    x:500,
    y:400
  }
}


export class Page2 extends React.Component<any,BodyWidgetProps1> {
 
      
      
      render(){

        let xyz = new Application()
        console.log(xyz)
        return (
          <div className=' ' >
              <div className='h-[100vh]'>
                <BodyWidget app={xyz} />
              </div>
          </div>
        )
      }
  
}
