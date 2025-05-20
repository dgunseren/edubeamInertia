function calculateRotationCenter(shapes) {
  let areas = [], centers = [], totalArea = 0;
  let allPoints = [], maxFound = false;
  let totX = 0, totY = 0;

  shapes.forEach(shape => {
    let points = []

    shape.forEach(line => {
      allPoints.push(line.start.x, line.start.y);
    });

   

  });
  maxes = PolyK.GetAABB(allPoints);

  return maxes;
}

function finishAll(shapes, shapeTypes) {
  Returned = calculateRotationCenter(shapes);
  let RotationCenter = {x: Returned.x+Returned.width/2, y: Returned.y+Returned.height/2}
  let totalInertia = 0;
  console.log('RotationCenter', Returned);
  shapeTypes[0] = 'outside';
  
  shapes.forEach((shape, i) => {
  let inertiaSum = 0;
    
    let gridPoints = generateGridInsideShape(shape, 0.1);

    gridPoints.forEach(p => {
      //let d2 = (p.x - RotationCenter.x) ** 2 + (p.y - RotationCenter.y) ** 2;
      let d2 = 0.01*(p.y - RotationCenter.y) ** 2;
      
      inertiaSum += d2;
    });

    totalInertia += shapeTypes[i] === 'inside' ? -1 * inertiaSum : inertiaSum;
    console.log('Partial Inertia:', inertiaSum);
  });

  TotalInertia = totalInertia * 1e-12;
  console.log('Total Inertia:', TotalInertia);
  document.getElementById('momentPopup').style.display = 'block';
}

function closeMomentPopup() {
  document.getElementById('momentPopup').style.display = 'none';
}

function calculateMoment() {
  const maxMoment = parseFloat(document.getElementById('maxMoment').value);
  console.log('Height', Returned.height);
  const result = (maxMoment * 9.81 * 1000 * 0.5*Returned.height * 1e-3) / TotalInertia;

  const resultMessage = `Total Inertia: ${TotalInertia.toFixed(4)} m4\n` +
                        `Maximum Moment: ${maxMoment} tonMeter\n` +
                        `Result: ${result.toFixed(4)} Pa\n` +
                        `Result: ${(result * 1e-6).toFixed(4)} MPa`;

  console.log(resultMessage);
  alert(resultMessage);
  closeMomentPopup();
}
