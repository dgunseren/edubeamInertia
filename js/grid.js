function pointInPolygon(point, polygon) {
  let [x, y] = point;
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    let xi = polygon[i].x, yi = polygon[i].y;
    let xj = polygon[j].x, yj = polygon[j].y;
    let intersect = ((yi > y) !== (yj > y)) &&
                    (x < (xj - xi) * (y - yi) / (yj - yi + 0.00001) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

function generateGridInsideShape(shape, cellSize) {
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;

  shape.forEach(line => {
    [line.start, line.end].forEach(p => {
      minX = Math.min(minX, p.x);
      maxX = Math.max(maxX, p.x);
      minY = Math.min(minY, p.y);
      maxY = Math.max(maxY, p.y);
    });
  });

  let polygon = shape.map(line => line.start);
  let gridPoints = [];

  for (let y = minY; y <= maxY; y += cellSize) {
    for (let x = minX; x <= maxX; x += cellSize) {
      if (pointInPolygon([x, y], polygon)) {
        gridPoints.push({ x, y });
      }
    }
  }

  return gridPoints;
}
