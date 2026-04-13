import { Car } from "./car.js";
import { Ball } from "./ball.js";
import { Arena } from "./arena.js";
import { Controls } from "./controls.js";
import { CameraSystem } from "./camera.js";

export class Game {
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(80, innerWidth/innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({canvas: game, antialias:true});
    this.renderer.setSize(innerWidth, innerHeight);

    this.controls = new Controls();
    this.arena = new Arena(this.scene);
    this.player = new Car(this.scene, "assets/car.glb");
    this.ball = new Ball(this.scene);
    this.cameraSystem = new CameraSystem(this.camera);

    this.socket = io();
  }

  start() {
    const loop = () => {
      requestAnimationFrame(loop);

      this.player.update(this.controls);
      this.ball.update();
      this.cameraSystem.update(this.player, this.ball);

      this.socket.emit("queue", { rank: 1000 });

      this.renderer.render(this.scene, this.camera);
    };
    loop();
  }
}
