export class Ball {
  constructor(scene){
    this.mesh = new THREE.Mesh(
      new THREE.SphereGeometry(1,32,32),
      new THREE.MeshStandardMaterial({color:0xffffff})
    );
    scene.add(this.mesh);
    this.vel = new THREE.Vector3();
  }

  update(){
    this.mesh.position.add(this.vel);
    this.vel.multiplyScalar(0.98);
  }
}
