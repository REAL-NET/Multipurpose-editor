import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHotkeys } from 'react-hotkeys-hook';
import { OnLoadParams, ReactFlowProvider } from 'react-flow-renderer';

import PropertyBar from './PropertyBar'
import Palette from './Palette';
import Scene from './Scene';
import { initialElements } from './initialElements';

import './App.css'

document.addEventListener('click', e => (e.target));

const OverviewFlow = () => {
    const [reactFlowInstance, setReactFlowInstance] = useState<OnLoadParams>();
    const [elements, setElements] = useState(initialElements);
    const [captureElementClick, setCaptureElementClick] = useState<boolean>(true);
    const [currentElementId, setCurrentElementId] = useState<string>("");
	
    useHotkeys('delete', () => console.log("Delete pressed"));

    useEffect(() => {
        axios
            .get("http://localhost:9000/test")
            .then(response => console.log(response.data));
    }, []);

    return (
        <div className="OverviewFlow">
            <ReactFlowProvider>
                <PropertyBar id={currentElementId} setElements={setElements} elements={elements}></PropertyBar>
                <Scene
                    elements={elements}
                    setElements={setElements}
                    reactFlowInstance={reactFlowInstance}
                    setReactFlowInstance={setReactFlowInstance}
                    setCurrentElementId={setCurrentElementId}
                    captureElementClick={captureElementClick}
                />
                <Palette/>
            </ReactFlowProvider>
        </div>
    );
};


export default OverviewFlow;