
import React, { Component } from 'react';
import * as BABYLON from 'babylonjs';
import "babylonjs-loaders";
import "@babylonjs/controls"
import ship from "./assets/Models/ship2.glb";
import { Tools } from 'babylonjs';
import { Grid, Paper, ButtonBase } from '@mui/material';


import BlackSky from "./assets/02-34-11-741_512.gif";
import MetalColor from "./assets/Metal/MetalPlates001_1K-JPG_Color.jpg";
import MetalBumpGL from "./assets/Metal/MetalPlates001_1K-JPG_NormalGL.jpg";
import FoilColor from "./assets/Foil/Foil002_1K-JPG_Color.jpg";
import FoilBumpGL from "./assets/Foil/Foil002_1K-JPG_NormalGL.jpg";
var scene;
var boxMesh;
var hk;
/**
 * Example temnplate of using Babylon JS with React
 */
class SpaceGame extends Component {
  constructor(props) {
    super(props);
    this.state = { useWireFrame: false, shouldAnimate: false };
  }

  componentDidMount = () => {
    // start ENGINE
    this.engine = new BABYLON.Engine(this.canvas, true);
    scene = new BABYLON.Scene(this.engine);
    scene.collisionsEnabled = true;
    scene.debugLayer.show();    //Light and Camera
    this.addLight();
    //this.addCamera();
    const movementspeed = 0.5;
    //--Meshes---
    boxMesh = BABYLON.MeshBuilder.CreateBox(
      "box",
      { height: 1, width: 1, depth: 1 },
      scene
    );
    boxMesh.position.y = -0.5;

    var woodMaterial = new BABYLON.StandardMaterial("wood", scene);
    woodMaterial.diffuseTexture = new BABYLON.Texture(FoilColor, scene);
    woodMaterial.bumpTexture = new BABYLON.Texture(FoilBumpGL, scene);
    boxMesh.material = woodMaterial;
    const camera = new BABYLON.FollowCamera("FollowCam", new BABYLON.Vector3(0, 10, -10), scene);

    // The goal distance of camera from target
    camera.radius = 30;
    
    // The goal height of camera above local origin (centre) of target
    camera.heightOffset = 10;
    
    // The goal rotation of camera around local origin (centre) of target in x y plane
    camera.rotationOffset = 0;
    
    // Acceleration of camera in moving from current to goal position
    camera.cameraAcceleration = 0.005;
    
    // The speed at which acceleration is halted
    camera.maxCameraSpeed = 10;
    camera.upperRadiusLimit = 15;
    camera.upperHeightOffsetLimit = 10;
    camera.lowerHeightOffsetLimit = 0;
    camera.upperBetaLimit = BABYLON.Angle.FromDegrees(90).radians();  
    camera.lowerBetaLimit = BABYLON.Angle.FromDegrees(90).radians();

    
    // This attaches the camera to the canvas
    camera.attachControl(this.canvas, true);
    
    // NOTE:: SET CAMERA TARGET AFTER THE TARGET'S CREATION AND NOTE CHANGE FROM BABYLONJS V 2.5
    // targetMesh created here.
    camera.lockedTarget = boxMesh;
    
    boxMesh.checkCollisions = true;
    //boxMesh.parent = camera;
    window.addEventListener("keydown", function (event) {
      if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
      }
    
      switch (event.key) {
        case "ArrowDown":
          camera.alpha = Math.PI/2;
          boxMesh.position.z-=movementspeed;
          break;
        case "ArrowUp":
          camera.alpha = -Math.PI/2;
          boxMesh.position.z+=movementspeed;
          break;
        case "ArrowLeft":
          camera.alpha = Math.PI/4;
          boxMesh.position.x-=movementspeed;
          break;
        case "ArrowRight":
          camera.alpha = -Math.PI/4;
          boxMesh.position.x+=movementspeed;
          break;
        default:
          return; // Quit when this doesn't handle the key event.
      }
    
      // Cancel the default action to avoid it being handled twice
      event.preventDefault();
    }, true);

    //this.addGround();
    this.addSkyBox();
    // Add Events
    var fileName = Tools.GetFilename(ship);
    var filePath = Tools.GetFolderPath(ship);
    var mesh = BABYLON.AbstractMesh;
    mesh = BABYLON.SceneLoader.ImportMeshAsync( "", filePath, fileName, scene, function(meshes){
    });
    window.addEventListener("resize", this.onWindowResize, false);
    window.addEventListener('Wheel', evt => evt.preventDefault());
    scene.enablePhysics();
    // Render Loop
    this.engine.runRenderLoop(() => {
      boxMesh.x +=1;
      scene.render();
    });

    //Animation
    scene.registerBeforeRender(() => {
      
    });
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.onWindowResize, false);
  }

  onWindowResize = event => {
    this.engine.resize();
    
  };

  /**
   * Add Lights
   */
  addLight = () => {
    //---------- LIGHT---------------------
    // Create a basic light, aiming 0,1,0 - meaning, to the sky.
    var light = new BABYLON.HemisphericLight(
      "light1",
      new BABYLON.Vector3(0, 10, 0),
      scene
    );
  };

  /**
   * Add Camera
   */
  addCamera = () => {
    // ---------------ArcRotateCamera or Orbit Control----------
    var camera = new BABYLON.ArcRotateCamera(
      "Camera",
      Math.PI / 2,
      Math.PI / 4,
      4,
      BABYLON.Vector3.Zero(),
      scene
    );
    camera.inertia = 0;
    camera.angularSensibilityX = 250;
    camera.angularSensibilityY = 250;

    // This attaches the camera to the canvas
    camera.attachControl(this.canvas, true);
    camera.setPosition(new BABYLON.Vector3(5, 5, 5));
  };

  /**
   * Create Stage and Skybox
   */
  addGround = () => {
    // Create a built-in "ground" shape.
    var ground = BABYLON.MeshBuilder.CreateGround(
      "ground1",
      { height: 6, width: 6, subdivisions: 2 },
      scene
    );
    var groundMaterial = new BABYLON.StandardMaterial("floor0", scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture(MetalColor, scene);
    groundMaterial.bumpTexture = new BABYLON.Texture(MetalBumpGL, scene);
    ground.material = groundMaterial;


  };

  addSkyBox = () => {
    var photoSphere = BABYLON.Mesh.CreateSphere("skyBox", 32.0, 150.0, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial(BlackSky, scene);
    skyboxMaterial.emissiveTexture = new BABYLON.Texture(BlackSky, scene, 1, 0);
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.emissiveTexture.uOffset = -Math.PI / 2; // left-right
    skyboxMaterial.emissiveTexture.uOffset = 0.1; // up-down
    skyboxMaterial.backFaceCulling = false;
    photoSphere.material = skyboxMaterial;
  };
  /**
   * Add Models
   */
  addBox = () => {
    // Add BOX
    boxMesh = BABYLON.MeshBuilder.CreateBox(
      "box",
      { height: 1, width: 1, depth: 1 },
      scene
    );
    boxMesh.position.y = -0.5;

    var woodMaterial = new BABYLON.StandardMaterial("wood", scene);
    woodMaterial.diffuseTexture = new BABYLON.Texture(FoilColor, scene);
    woodMaterial.bumpTexture = new BABYLON.Texture(FoilBumpGL, scene);
    boxMesh.material = woodMaterial;
    var camera = new BABYLON.ArcRotateCamera(
      "Camera",
      Math.PI / 2,
      Math.PI / 4,
      2,
      boxMesh,
      scene
    );
    camera.upperRadiusLimit = 6;
    camera.inertia = 0;
    camera.angularSensibilityX = 250;
    camera.angularSensibilityY = 250;

    // This attaches the camera to the canvas
    camera.attachControl(this.canvas, true);
    camera.setPosition(new BABYLON.Vector3(5, 5, 5));
  };

  render() {
    return (
      <div style={{font: 'none'}}>
          <Grid container spacing={{ xs: 2, md: 8}} columns={{ xs: 4, sm: 4, md: 8 }}>
            <Grid item class='app' xs= {2} style={{marginTop: "7%", marginLeft: "10%", width: "80%",height: "80%"}}>
                <Paper square={false} style={{height:"100%", display: 'flex', backgroundColor: "#fff6e6"}}>
                    <ButtonBase sx={{ width: '25%', height: '10%' }} style={{flexDirection: 'column'}}>   
                        <a class="paneltitle">ABOUT: </a>
                        <a class="panelContent">This is a game for the 2024 scripto game jam.</a>   
                    </ButtonBase>
                    <ButtonBase sx={{ width: '25%', height: '10%'}} style={{flexDirection: 'column'}}>   
                        <a class="paneltitle">UPDATES: </a>
                        <a class="panelContent">1/26/24: Updated meshes and added basic controls</a>    
                    </ButtonBase>
                    <ButtonBase sx={{ width: '25%', height: '10%'}} style={{flexDirection: 'column'}}>   
                        <a class="paneltitle">CONTROLS: </a>
                        <a class="panelContent">Use arrow keys to move player</a>  
                        <a class="panelContent">Use mouse to move camera</a>    
                    </ButtonBase>
                </Paper>
            </Grid>
        </Grid>
        <canvas
          style={{ font: 'none', width: "90%", height: "90%", alignSelf: "center", marginLeft: "5%"}}
          ref={canvas => {
            this.canvas = canvas;
          }}
        />
      </div>
    );
    
  }
}
export default SpaceGame;