import * as React from 'react';
import { Application } from '../Application';
import { BodyWidget } from '../componets/Drag and Drop/BodyWidget';
import { RootState } from '..';
import { useSelector } from 'react-redux';


export interface BodyWidgetProps1 {
	app: Application;
}


export class Page2 extends React.Component<any,BodyWidgetProps1> {
  
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
