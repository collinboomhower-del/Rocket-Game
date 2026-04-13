export class CameraSystem {
  constructor(camera){
    this.camera = camera;
  }

  update(player, ball){
    const offset = new THREE.Vector3(0,6,12)
      .applyAxisAngle(new THREE.Vector3(0,1,0), player.mesh.rotation.y);

    this.camera.position.lerp(player.mesh.position.clone().add(offset),0.1);
    this.camera.lookAt(ball.mesh.position);
  }
}
