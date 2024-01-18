import axios from 'axios'
import React from 'react'
import { apis } from '../services/apis'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '..'
import JsonFileUploader from '../componets/JsonFileUploader'
// import { Sam } from './Sam'

export const Page1 = () => {
  // const {posX} = useSelector((state:RootState)=>state.solar)

  // console.log(posX)
    async function Create() {
        try {
          const res = await axios({
            method:"GET",
            url:apis.CREATE_DB_API,
            withCredentials:true,
          })
          console.log("Database created successfully",res)
        } catch (error) {
          console.log(error)
        }
      }
  return (
    <div className='flex h-[100vh] justify-center items-center gap-3 flex-col'>
        <NavLink to="/diagram" onClick={Create} >
            <button className='button-24' >
                Create New File
            </button>
            
        </NavLink>
        <JsonFileUploader></JsonFileUploader>
    </div>
  )
}
