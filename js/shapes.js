function finishAndStoreShape(type) {
  if (lines.length >= 2) {
    const first = lines[0].start;
    const last = lines[lines.length - 1].end;
    if (first.x !== last.x || first.y !== last.y) lines.push({ start: last, end: first });
    shapes.push([...lines]);
    shapeTypes.push(type);
    lines = [];
    startPoint = null;
    currentEnd = null;
    isDrawing = false;
    redraw();
  }
}

function skipAddingNewShape() {
  if (lines.length >= 2) {
    const first = lines[0].start;
    const last = lines[lines.length - 1].end;
    if (first.x !== last.x || first.y !== last.y) lines.push({ start: last, end: first });
    shapes.push([...lines]);
    shapeTypes.push('outside');
  }
  lines = [];
  startPoint = null;
  currentEnd = null;
  isDrawing = false;
  redraw();
}

function clearAll() {
  lines = [];
  shapes.length = 0;
  shapeTypes.length = 0;
  startPoint = null;
  currentEnd = null;
  isDrawing = false;
  if (logDiv) logDiv.innerHTML = '';
  redraw();
}
