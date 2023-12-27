// ----------> sphere animation script

renderer.setAnimationLoop(animate);

function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.x += 0.002;
  mesh.rotation.y += 0.002;
  renderer.render(scene, camera);
}
