import React, { createContext, useState } from 'react'

export const addProjectResponseContext=createContext()
export const editProjectResponseContext=createContext()

function ContextShares({children}) {
    const[addProjectResponse,setAddProjectResponse]=useState("")
    const[editProjectResponse,setEditProjecResponse]=useState("")

  return (
    <>
    <addProjectResponseContext.Provider value={{addProjectResponse,setAddProjectResponse}}>
      <editProjectResponseContext.Provider value={{editProjectResponse,setEditProjecResponse}}>
        {children}
      </editProjectResponseContext.Provider>
      </addProjectResponseContext.Provider>
    </>
  )
}

export default ContextShares
