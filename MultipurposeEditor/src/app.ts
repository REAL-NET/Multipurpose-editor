﻿import { PaletteModel } from "./model/PaletteModel";
import { PaletteController } from "./controller/PaletteController";
import { SceneController } from "./controller/SceneController";
import './../src/app.css';
import { Model } from "./model/Model";
import { Requests } from "./Requests";
import { NodeType } from "./model/NodeType";
import {UndoRedoController} from "./controller/UndoRedoController";

var mxgraph = require("mxgraph")({
    mxImageBasePath: "./src/images",
    mxBasePath: "./src"
});

class Editor {
    public undoRedoController: UndoRedoController;
    private timerToken: number;
    private paletteController: PaletteController;
    private sceneController: SceneController;
    private graph: any;
    private model: any;
    private metamodel: Model;

    constructor() {
        this.undoRedoController = new UndoRedoController();
        
        //this.metamodel = Requests.RequestMetamodel("SHMetamodelForGraphEditor");
        //this.model = Requests.CreateModel("SHMetamodelForGraphEditor", "SHModel2");
        this.metamodel = Model.createTestMetamodel();
        this.model = Model.createTestModel();

        this.sceneController = new SceneController(this.model);
        this.sceneController.InitGraph();
        this.sceneController.AddPropertiesListeners();
        
        this.paletteController = new PaletteController(this.sceneController.graph, this.metamodel, this.sceneController);

        //document.getElementById('generate').addEventListener('click', this.gener);
    }

    start() {
    }
    
    stop() {
        clearTimeout(this.timerToken);
    }
}

window.onload = () => {
    var editor = new Editor();
    
    document.addEventListener("keydown", function (event) {
        if (event.code == "KeyZ" && (event.ctrlKey || event.metaKey)) {
            editor.undoRedoController.Undo();
        }
        else if (event.code == "KeyY" && (event.ctrlKey || event.metaKey)) {
            editor.undoRedoController.Redo();
        }
    });
    
    editor.start();
};