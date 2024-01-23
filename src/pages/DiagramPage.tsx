import * as React from 'react';
import { Application } from '../Application';
import { BodyWidget } from '../componets/Drag and Drop/BodyWidget';
import { useSelector } from 'react-redux';
import { RootState } from '..';


export interface BodyWidgetProps1 {
	app: Application;
}


export const DiagramPage = () =>  {

  let appilcation = new Application()

  const value = useSelector((state:RootState)=>state.solar.solarEnergy)
  return (
    <div className=' ' >
        <div className='h-[100vh]'>
          <BodyWidget app={appilcation} value={value} />
          <div className=' text-red-300 mt-[500px] ml-[600px]'>duhudi</div>
        </div>
    </div>
  )
  
}
