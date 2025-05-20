// File system handling
const fileDropZone = document.getElementById('fileDropZone');
const fileInput = document.getElementById('fileInput');

// Prevent default drag behaviors
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  fileDropZone.addEventListener(eventName, preventDefaults, false);
  document.body.addEventListener(eventName, preventDefaults, false);
});

// Highlight drop zone when item is dragged over it
['dragenter', 'dragover'].forEach(eventName => {
  fileDropZone.addEventListener(eventName, highlight, false);
});

['dragleave', 'drop'].forEach(eventName => {
  fileDropZone.addEventListener(eventName, unhighlight, false);
});

// Handle dropped files
fileDropZone.addEventListener('drop', handleDrop, false);
fileInput.addEventListener('change', handleFiles, false);

function preventDefaults(e) {
  e.preventDefault();
  e.stopPropagation();
}

function highlight(e) {
  fileDropZone.classList.add('dragover');
}

function unhighlight(e) {
  fileDropZone.classList.remove('dragover');
}

function handleDrop(e) {
  const dt = e.dataTransfer;
  const files = dt.files;
  handleFiles({ target: { files: files } });
}

function handleFiles(e) {
  const files = [...e.target.files];
  files.forEach(uploadFile);
}

function parseCSVSegments(csvContent) {
  const lines = csvContent.split('\n');
  const segments = [];
  // Skip header
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    const parts = line.split(',');
    if (parts.length < 8) continue; // Not enough columns
    const endX = parseFloat(parts[2]);
    const endY = parseFloat(parts[3]);
    const startX = parseFloat(parts[5]);
    const startY = parseFloat(parts[6]);
    if ([endX, endY, startX, startY].some(isNaN)) continue;
    segments.push({
      start: { x: startX, y: startY },
      end: { x: endX, y: endY }
    });
  }
  return segments;
}

function uploadFile(file) {
  // Create a new FileReader
  const reader = new FileReader();
  
  reader.onload = function(e) {
    // Handle the file content here
    console.log('File loaded:', file.name);
    
    if (file.name.endsWith('.csv')) {
      try {
        const segments = parseCSVSegments(e.target.result);
        console.log('Parsed line segments:', segments);
        // Optionally, add to global shapes and redraw
        if (typeof shapes !== 'undefined') {
          segments.forEach(seg => shapes.push([seg.start, seg.end]));
          if (typeof redrawCanvas === 'function') {
            redrawCanvas();
          }
        }
      } catch (error) {
        console.error('Error parsing CSV:', error);
      }
    } else {
      console.log('Please upload a CSV file with line segments');
    }
  };
  
  reader.onerror = function() {
    console.error('Error reading file:', file.name);
  };
  
  // Read the file as text
  reader.readAsText(file);
}

// Function to save points to a CSV file
function savePointsToCSV(points, filename) {
  const csvContent = points.map(point => `${point.x},${point.y}`).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || 'points.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
} 