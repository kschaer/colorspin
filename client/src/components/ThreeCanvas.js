import React from "react";
import React3 from "react-three-renderer";
import * as THREE from "three";
import { connect } from "react-redux";

class ThreeCanvas extends React.Component {
  constructor(props, context) {
    super(props, context);

    // construct the position vector here, because if we use 'new' within render,
    // React will think that things have changed when they have not.
    this.cameraPosition = new THREE.Vector3(0, 0, 5);

    this.state = {
      cubeRotation: new THREE.Euler()
    };

    this._onAnimate = () => {
      // we will get this callback every frame

      // pretend cubeRotation is immutable.
      // this helps with updates and pure rendering.
      // React will be sure that the rotation has now updated.
      this.setState({
        cubeRotation: new THREE.Euler(
          this.state.cubeRotation.x + 0.1,
          this.state.cubeRotation.y + 0.1,
          0
        )
      });
    };
  }

  render() {
    const width = window.innerWidth * 0.8; // canvas width
    const height = window.innerHeight * 0.8; // canvas height
    const lastColor = this.props.lastColor.hex || "#FFCCAA";

    return (
      <React3
        mainCamera="camera" // this points to the perspectiveCamera which has the name set to "camera" below
        width={width}
        height={height}
        onAnimate={this._onAnimate}
      >
        <scene>
          <perspectiveCamera
            name="camera"
            fov={75}
            aspect={width / height}
            near={0.1}
            far={1000}
            position={this.cameraPosition}
          />
          <mesh rotation={this.state.cubeRotation}>
            <boxGeometry width={1} height={1} depth={1} />
            <meshBasicMaterial color={lastColor} />
          </mesh>
        </scene>
      </React3>
    );
  }
}
const mapState = state => {
  return {
    curColors: state.color.curColors,
    bgColor: state.color.curColors[state.color.curColors.length - 1],
    lastColor: state.color.lastColor
  };
};
export default connect(mapState)(ThreeCanvas);
