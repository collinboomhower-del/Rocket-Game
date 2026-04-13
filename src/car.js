export class Car {
  constructor(scene, modelPath) {
    this.mesh = new THREE.Group();
    scene.add(this.mesh);

    const loader = new THREE.GLTFLoader();
    loader.load(modelPath, (gltf)=>{
      this.mesh.add(gltf.scene);
    });

    this.velocity = new THREE.Vector3();
    this.boost = 100;
  }

  update(input){
    if(input.keys["w"]) this.velocity.z -= 0.15;
    if(input.keys["s"]) this.velocity.z += 0.08;
    if(input.keys["a"]) this.mesh.rotation.y += 0.05;
    if(input.keys["d"]) this.mesh.rotation.y -= 0.05;

    if(input.keys[" "] && this.boost>0){
      this.velocity.z -= 0.3;
      this.boost--;
    }

    this.velocity.multiplyScalar(0.96);
    this.mesh.position.add(this.velocity);
  }
}
