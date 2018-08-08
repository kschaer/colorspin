import React from "react";
import * as THREE from "three";
const MovingMesh = WrappedComponent => {
  class HOC extends React.Component {
    constructor() {
      super();
      this.state = {
        position: new THREE.Vector3(2, 2, 0)
      };
      this._onAnimate = () => {
        this.setState({
          position: new THREE.Vector3(
            this.state.position.x + 0.1,
            this.state.position.y + 0.1,
            -30
          )
        });
        console.log("ANIMATOR");
      };
    }
    render() {
      return (
        <WrappedComponent
          onAnimate={this._onAnimate}
          {...this.props}
          position={this.state.position}
        />
      );
    }
  }
  return HOC;
};

const SphereMesh = props => {
  return (
    <mesh position={props.position}>
      <sphereGeometry radius={2} />
      <meshBasicMaterial color={"#FFCCAA"} />
    </mesh>
  );
};

export default MovingMesh(SphereMesh);
