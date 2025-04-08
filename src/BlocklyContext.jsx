import React, { useState, useEffect, useContext } from "react";
import { createContext } from "react";

export const BlocklyContext = createContext();

const BlocklyProvider = ( props ) => {

    const [currProgramXml, setCurrProgramXml] = useState('<xml xmlns="https://developers.google.com/blockly/xml"><block type="start" id="@eG%h0R;}_wJ0-j-HB$5" deletable="false" movable="false" x="10" y="50"></block></xml>');
    const [isXmlLoaded, setisXmlLoaded] = useState(false)
    const [initialXml, setInitialXml] = useState('<xml xmlns="https://developers.google.com/blockly/xml"><block type="start" id="@eG%h0R;}_wJ0-j-HB$5" deletable="false" movable="false" x="10" y="50"></block></xml>')
    const [savedTask, setSavedTask] = useState([]); 

    const saveTask = (xmlText) => {
        setSavedTask((prev) => [...prev, xmlText]); 
    };

    const loadTask = (index) => {
      return savedTask[index]; 
    };

    useEffect(() => {
      if (initialXml !== null) {
        setXmlLoaded(true);
      }
    }, [initialXml])
  
    const onUpdateProgramXml = (xml) => {
      setCurrProgramXml(xml)
    }
  
    const onUpdateInitialXml = (xml) => {
      setInitialXml(xml)
    }
  
    const setXmlLoaded = (loaded) => {
      setisXmlLoaded(loaded)
    };
    
    return (
        <BlocklyContext.Provider
        value={{ 
          currProgramXml, 
          initialXml,
          isXmlLoaded, 
          onUpdateProgramXml, 
          onUpdateInitialXml, 
          saveTask,
          loadTask 
        }}>
            {props.children}
        </BlocklyContext.Provider>
    )
}

export default BlocklyProvider