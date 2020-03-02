import * as THREE from 'three';
import { OrbitControls } from 'three-orbitcontrols-ts';

// windowサイズを画面サイズに合わせる
const width = window.innerWidth;
const height = window.innerHeight - 100;

var element;
var scene, camera, renderer, controls;

window.addEventListener("DOMContentLoaded", () => {
    // シーンの作成
    scene = new THREE.Scene();

    // リサイズイベントを検知してリサイズ処理を実行
    window.addEventListener("resize", handleResize, false);

    // カメラの作成
    camera = new THREE.PerspectiveCamera(35, width / height, 1, 1000);
    camera.position.set(0, 0, 0);
    // シーンに追加
    scene.add(camera);

    // 球体の形状を作成（円柱）
    var geometry = new THREE.CylinderGeometry(15, 15, 10, 32, 1, true);
    geometry.scale(-1, 1, 1);

    //　マテリアルの作成
    var material = new THREE.MeshBasicMaterial({
        // 画像をテクスチャとして読み込み
        map: THREE.ImageUtils.loadTexture("6443.jpg")
    });

    // 円柱にマテリアルを貼り付けて物体を作成
    var sphere = new THREE.Mesh(geometry, material);

    //　シーンに追加
    scene.add(sphere);

    setRenderer();

    setOrbitControls();

    render();
});

// レンダラーの設定
const setRenderer = () => {
    renderer = new THREE.WebGLRenderer();

    // レンダラーをwindowサイズに合わせる
    renderer.setSize(width, height);
    
    renderer.setClearColor({ color: 0x000000 });
    element = renderer.domElement;
    document.querySelector('main').appendChild(element);
    renderer.render(scene, camera);
}

// OrbitControlsの設定
const setOrbitControls = () => {
    // マウスドラッグで視点操作する
    controls = new OrbitControls(camera, element);

    // 視点変更の速さ
    controls.rotateSpeed = 0.2;

    // ズームを禁止にする
    controls.enableZoom = false;

    // 垂直方向にドラッグしないようにする
    controls.maxPolarAngle = Math.PI / 2;
    controls.minPolarAngle = Math.PI / 2;

    controls.target.set(camera.position.x + 0.15, 0, 0);
}

// リサイズ処理
const handleResize = () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

const render = () => {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
    controls.update();
}

