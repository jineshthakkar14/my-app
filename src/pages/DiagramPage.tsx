import * as React from 'react';
import { Application } from '../Application';
import { BodyWidget } from '../componets/Drag and Drop/BodyWidget';


export interface BodyWidgetProps1 {
	app: Application;
}


export class DiagramPage extends React.Component<any,BodyWidgetProps1> {
  
      render(){

        let appilcation = new Application()
        return (
          <div className=' ' >
              <div className='h-[100vh]'>
                <BodyWidget app={appilcation} />
              </div>
          </div>
        )
      }
  
}
