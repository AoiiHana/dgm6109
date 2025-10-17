"use strict";

/**
 * Draws Hao Li's Caterpillar Drawing (#4)
 * 
 * @param {object} drawing - An existing D3 SVG drawing area (e.g., a selection created with d3.select("svg")).
 * @param {number} x - Horizontal position of the caterpillar’s origin (center of the head).
 * @param {number} y - Vertical position of the caterpillar’s origin (center of the head).
 * @param {boolean} showOrigin - Whether to display the origin point (small pink circle).
 * @returns {object} The same SVG drawing area with the caterpillar added.
 *
 * Example use:
 *   let svg = d3.select("#canvas").append("svg").attr("width",600).attr("height",600);
 *   caterpillar(svg, 200, 300, true);
 */
function caterpillar(drawing, x, y, showOrigin) {

  // === Body (10 ellipses) ===
  drawing.append('ellipse').attr('cx', x + 0).attr('cy', y + 0)
    .attr('rx', 45).attr('ry', 45).attr('fill', 'palegreen');
  drawing.append('ellipse').attr('cx', x + 70).attr('cy', y + 30)
    .attr('rx', 45).attr('ry', 45).attr('fill', 'seagreen');
  drawing.append('ellipse').attr('cx', x + 130).attr('cy', y - 15)
    .attr('rx', 45).attr('ry', 45).attr('fill', 'lightgreen');
  drawing.append('ellipse').attr('cx', x + 180).attr('cy', y + 30)
    .attr('rx', 45).attr('ry', 45).attr('fill', 'seagreen');
  drawing.append('ellipse').attr('cx', x + 230).attr('cy', y + 5)
    .attr('rx', 45).attr('ry', 45).attr('fill', 'lightgreen');
  drawing.append('ellipse').attr('cx', x + 270).attr('cy', y - 35)
    .attr('rx', 45).attr('ry', 45).attr('fill', 'seagreen');
  drawing.append('ellipse').attr('cx', x + 330).attr('cy', y + 5)
    .attr('rx', 45).attr('ry', 45).attr('fill', 'lightgreen');
  drawing.append('ellipse').attr('cx', x + 360).attr('cy', y + 45)
    .attr('rx', 45).attr('ry', 45).attr('fill', 'seagreen');
  drawing.append('ellipse').attr('cx', x + 400).attr('cy', y + 25)
    .attr('rx', 20).attr('ry', 20).attr('fill', 'lightgreen');
  drawing.append('ellipse').attr('cx', x + 415).attr('cy', y + 10)
    .attr('rx', 12).attr('ry', 12).attr('fill', 'seagreen');

  // === Face ===
  drawing.append('ellipse').attr('cx', x - 40).attr('cy', y - 20)
    .attr('rx', 8).attr('ry', 8).attr('fill', 'black');
  drawing.append('ellipse').attr('cx', x - 15).attr('cy', y - 20)
    .attr('rx', 8).attr('ry', 8).attr('fill', 'black');

  // === Eyebrows + Mouth ===
  drawing.append('line')
    .attr('x1', x - 60).attr('y1', y - 65)
    .attr('x2', x - 30).attr('y2', y - 65)
    .attr('stroke', 'black');
  drawing.append('line')
    .attr('x1', x - 30).attr('y1', y - 65)
    .attr('x2', x - 20).attr('y2', y - 35)
    .attr('stroke', 'black');
  drawing.append('line')
    .attr('x1', x - 50).attr('y1', y - 75)
    .attr('x2', x - 20).attr('y2', y - 75)
    .attr('stroke', 'black');
  drawing.append('line')
    .attr('x1', x - 20).attr('y1', y - 75)
    .attr('x2', x - 5).attr('y2', y - 35)
    .attr('stroke', 'black');
  drawing.append('line')
    .attr('x1', x - 40).attr('y1', y + 10)
    .attr('x2', x - 20).attr('y2', y + 10)
    .attr('stroke', 'black');

  // === Enhanced details: Legs ===
  const segments = [
    { cx: x + 70,  cy: y + 30 },
    { cx: x + 130, cy: y - 15 },
    { cx: x + 180, cy: y + 30 },
    { cx: x + 230, cy: y + 5  },
    { cx: x + 360, cy: y + 45  },
  ];
  segments.forEach(s => {
    const legX = s.cx;
    const legYStart = s.cy + 45;
    const legYEnd = legYStart + 20;
    drawing.append('line')
      .attr('x1', legX).attr('y1', legYStart)
      .attr('x2', legX).attr('y2', legYEnd)
      .attr('stroke', 'darkslategray')
      .attr('stroke-width', 3);
  });

  // === Optional Origin Marker ===
  if (showOrigin === true) {
    drawing.append('circle')
      .attr('cx', x)
      .attr('cy', y)
      .attr('r', 3)
      .attr('fill', 'deeppink');
  }

  return drawing;
}
