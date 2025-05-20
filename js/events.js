canvas.addEventListener('mousedown', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  if (e.button === 2) {
    if (lines.length > 0) lines.pop();
    startPoint = lines.length > 0 ? lines[lines.length - 1].end : { x, y };
    redraw();
    return;
  }

  if (!startPoint) startPoint = { x, y };
  isDrawing = true;
});

canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  if (isDrawing && startPoint) {
    let snappedX = Math.abs(x - startPoint.x) < Math.abs(y - startPoint.y) ? startPoint.x : x;
    let snappedY = Math.abs(x - startPoint.x) < Math.abs(y - startPoint.y) ? y : startPoint.y;
    currentEnd = { x: snappedX, y: snappedY };
    redraw();
  }

  updateDistanceDisplay(x, y);
});

canvas.addEventListener('mouseup', () => {
  if (isDrawing && startPoint && currentEnd) {
    lines.push({ start: startPoint, end: currentEnd });
    startPoint = currentEnd;
    currentEnd = null;
  }
  isDrawing = false;
  redraw();
});

canvas.addEventListener('contextmenu', e => e.preventDefault());
