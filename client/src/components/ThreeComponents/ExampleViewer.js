import React from "react";
import sizeMe from "react-sizeme";
import PhysicsMousePick from "./MousePick";

const ExampleViewer = ({ size }) => {
  const exampleContent = (
    <PhysicsMousePick width={size.width} height={size.height} />
  );

  return <div id="viewer">{exampleContent}</div>;
};

ExampleViewer.propTypes = {
  example: React.PropTypes.object,
  size: React.PropTypes.object
};

export default sizeMe({ monitorHeight: true, refreshRate: 200 })(ExampleViewer);
