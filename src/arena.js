export class Arena {
  constructor(scene){
    const loader = new THREE.GLTFLoader();
    loader.load("assets/stadium.glb",(gltf)=>{
      scene.add(gltf.scene);
    });
  }
}
