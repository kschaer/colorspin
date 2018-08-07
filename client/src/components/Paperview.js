import React, { Component } from "react";
import paper, { Color } from "paper";
import Immutable from "immutable";
import { connect } from "react-redux";
import { css } from "emotion";
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}
class Circle {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }
}

class Paperview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      seconds: 0,
      xS: 0,
      yS: 0,
      xC: 0,
      yC: 0
    };
    // why don't we need to bind here?
    // this.onMouseDown = this.onMouseDown.bind(this);
    // this.onFrame = this.onFrame.bind(this);
  }

  relativeCoordinatesForEvent(mouseEvent) {
    const boundingRect = this.refs.drawArea.getBoundingClientRect();

    this.setState({
      xS: mouseEvent.clientX - boundingRect.left,
      yS: mouseEvent.clientY - boundingRect.top
    });

    return new Immutable.Map({
      x: mouseEvent.clientX - boundingRect.left,
      y: mouseEvent.clientY - boundingRect.top
    });
  }

  onMouseMove(e) {
    const point = this.relativeCoordinatesForEvent(e);

    this.setState({ xC: e.clientX, yC: e.clientY });
    // console.log(
    //   `xS:${this.state.xS}, yS:${this.state.yS}, xC:${this.state.xC}, yC:${
    //     this.state.yC
    //   }`
    //);
  }

  onMouseDown(e) {
    // Add a segment to the path at the position of the mouse:
    this.setState({ xC: e.clientX, yC: e.clientY });
    console.log("MOUSE DOWN");
    this.setState(prevState => ({
      seconds: prevState.seconds + 1,
      path: prevState.path
    }));
  }

  componentDidMount() {
    var myCanvas = document.getElementById("myCanvas");

    paper.setup(myCanvas);
    const gray = new Color(0.4, 0.3);
    paper.project.currentStyle = {
      fillColor: gray
    };

    //---- Blobs

    var ballPositions = [[100, 100], [200, 200], [300, 300], [400, 400]];

    var handle_len_rate = 2.4;
    var circles = [];
    var radius = 200;
    // Define a circle centered at (x,y) with radius r
    function Circle(x, y, r) {
      this.x = x;
      this.y = y;
      this.r = r;
    }
    for (var i = 0, l = ballPositions.length; i < l; i++) {
      var circle = new Circle(ballPositions[i][0], ballPositions[i][1], radius);
      circles.push(circle);
    }

    //console.log(circles[0].x);

    var EPS = 0.0000001;
    const props = this.props;
    // Given two circles this method finds the intersection
    // point(s) of the two circles (if any exists)
    const CircleCircleIntersectionPoints = (c1, c2) => {
      console.log(props);
      var r, R, d, dx, dy, cx, cy, Cx, Cy;

      if (c1.r < c2.r) {
        r = c1.r;
        R = c2.r;
        cx = c1.x;
        cy = c1.y;
        Cx = c2.x;
        Cy = c2.y;
      } else {
        r = c2.r;
        R = c1.r;
        Cx = c1.x;
        Cy = c1.y;
        cx = c2.x;
        cy = c2.y;
      }

      // Compute the vector <dx, dy>
      dx = cx - Cx;
      dy = cy - Cy;

      //console.log(c1.x + "," + c2);

      // Find the distance between two points.
      d = Math.sqrt(dx * dx + dy * dy);

      // There are an infinite number of solutions
      // Seems appropriate to also return null
      if (d < EPS && Math.abs(R - r) < EPS) return [];
      // No intersection (circles centered at the
      // same place with different size)
      else if (d < EPS) return [];

      var x = (dx / d) * R + Cx;
      var y = (dy / d) * R + Cy;
      var P = new Point(x, y);

      // Single intersection (kissing circles)
      if (Math.abs(R + r - d) < EPS || Math.abs(R - (r + d)) < EPS) return [P];

      // No intersection. Either the small circle contained within
      // big circle or circles are simply disjoint.
      if (d + r < R || R + r < d) return [];

      var C = new Point(Cx, Cy);
      var angle = acossafe((r * r - d * d - R * R) / (-2.0 * d * R));
      var pt1 = rotatePoint(C, P, +angle);
      var pt2 = rotatePoint(C, P, -angle);
      return [pt1, pt2];
      //----------------------------------------------------------
    };

    // Let a point be a pair: (x, y)
    function Point(x, y) {
      this.x = x;
      this.y = y;
    }

    // Due to double rounding precision the value passed into the Math.acos
    // function may be outside its domain of [-1, +1] which would return
    // the value NaN which we do not want.
    const acossafe = x => {
      if (x >= +1.0) return 0;
      if (x <= -1.0) return Math.PI;
      return Math.acos(x);
    };

    const displayPoint = (
      p,
      size,
      color = { rgb: { r: 30, g: 30, b: 30, a: 0.2 } }
    ) => {
      const { rgb } = color;

      const pointColor = new Color(
        rgb.r / 255,
        rgb.g / 255,
        rgb.b / 255,
        rgb.a
      );
      const rad = size || 10;
      var circlePath = new paper.Path.Circle({
        center: p,
        radius: rad,
        strokeColor: "black",
        fillColor: pointColor
      });
    };

    // Rotates a point about a fixed point at some angle 'a'
    const rotatePoint = (fp, pt, a) => {
      var x = pt.x - fp.x;
      var y = pt.y - fp.y;
      var xRot = x * Math.cos(a) + y * Math.sin(a);
      var yRot = y * Math.cos(a) - x * Math.sin(a);
      return new Point(fp.x + xRot, fp.y + yRot);
    };

    paper.view.onMouseMove = function onMouseMove(event) {
      circles[0].x = event.point.x;
      circles[0].y = event.point.y;
    };

    paper.view.onFrame = event => {
      paper.project.activeLayer.removeChildren();

      //console.log("Cs" + circles[0].x);
      var points = [];
      for (i = 0; i < circles.length; i++) {
        let circleSizeMod = 200 + 100 * Math.sin(0.02 * event.count - 40 * i);
        //need to update the circle objects
        circles[i].r = circleSizeMod;
        var circlePath = new paper.Path.Circle({
          center: new paper.Point(circles[i].x, circles[i].y),
          radius: circleSizeMod,
          strokeColor: "white"
        });

        for (var j = 0; j < circles.length; j++) {
          points = CircleCircleIntersectionPoints(circles[i], circles[j]);
          for (var k = 0; k < points.length; k++) {
            let sizeMod = 20 + 10 * Math.sin(0.02 * event.count - 40 * k);
            displayPoint(
              points[k],
              sizeMod,
              props.curColors[props.curColors.length % k]
            );
          }
        }
      }
    };

    // render
    paper.view.draw();
  }

  render() {
    return (
      <div
        id="wrapper"
        ref="drawArea"
        className="drawArea"
        onMouseMove={this.onMouseMove.bind(this)}
        onMouseDown={this.onMouseDown.bind(this)}
      >
        <canvas
          id="myCanvas"
          className={css`
            height: 100%;
          `}
        >
          {" "}
        </canvas>
      </div>
    );
  }
}

const mapState = state => {
  return {
    curColors: state.color.curColors,
    lastColor: state.color.lastColor
  };
};
export default connect(mapState)(Paperview);
