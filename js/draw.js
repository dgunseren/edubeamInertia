function drawLine(p1, p2, preview = false, vertexNumber = null) {
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.strokeStyle = preview ? 'gray' : 'black';
  ctx.setLineDash(preview ? [5, 5] : []);
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.setLineDash([]);

  if (vertexNumber !== null) {
    ctx.fillStyle = 'red';
    ctx.font = '14px sans-serif';
    ctx.fillText(vertexNumber.toString(), p1.x - 10, p1.y - 10);
  }

  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const length = Math.sqrt(dx * dx + dy * dy) * scale;
  const midX = (p1.x + p2.x) / 2;
  const midY = (p1.y + p2.y) / 2;
  ctx.fillStyle = preview ? 'gray' : 'blue';
  ctx.font = '14px sans-serif';
  ctx.fillText((length / 10).toFixed(2) + ' units', midX + 5, midY - 5);
}

function redraw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  shapes.forEach(shape => shape.forEach((line, i) => drawLine(line.start, line.end, false, i)));
  lines.forEach((line, i) => drawLine(line.start, line.end, false, i));
  if (isDrawing && startPoint && currentEnd) drawLine(startPoint, currentEnd, true);
}
