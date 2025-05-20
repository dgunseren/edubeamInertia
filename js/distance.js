function updateDistanceDisplay(x, y) {
  let minDistance = Infinity;
  let displayText = 'Distances to lines:<br>';
  let lineCounter = 0;

  shapes.forEach(shape => {
    shape.forEach(line => {
      const dist = distanceToSegment(x, y, line.start, line.end);
      displayText += `Line ${lineCounter++}: ${(dist / 10).toFixed(2)} units<br>`;
      if (dist < minDistance) minDistance = dist;
    });
  });

  document.getElementById('distanceDisplay').innerHTML = displayText;
  document.getElementById('cursorPosition').innerHTML = `X: ${Math.round(x)}<br>Y: ${Math.round(y)}`;
}

function distanceToSegment(px, py, p1, p2) {
  const A = px - p1.x;
  const B = py - p1.y;
  const C = p2.x - p1.x;
  const D = p2.y - p1.y;

  const dot = A * C + B * D;
  const len_sq = C * C + D * D;
  const param = len_sq ? dot / len_sq : -1;

  let xx, yy;
  if (param < 0) {
    xx = p1.x; yy = p1.y;
  } else if (param > 1) {
    xx = p2.x; yy = p2.y;
  } else {
    xx = p1.x + param * C;
    yy = p1.y + param * D;
  }

  const dx = px - xx;
  const dy = py - yy;
  return Math.sqrt(dx * dx + dy * dy);
}
