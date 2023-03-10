import { createContext, useState } from "react";

export const Context=createContext()


export const Contextprovider=({children})=>{
    const[email,setemail]=useState("")
    const emailstore=(value)=>{
          setemail(value)
    }

    return <Context.Provider value={{emailstore,email}}>{children}</Context.Provider>

}