function convertAndDownload() {
    const fileInput = document.getElementById('fileInput');
    const preview = document.getElementById('preview');
  
    if (fileInput.files.length === 0) {
      alert('Please select at least one image file.');
      return;
    }
  
    preview.innerHTML = '';
  
    Array.from(fileInput.files).forEach(convertImage);
  }
  
  function handleDrop(event) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    
    if (files.length === 0) {
      alert('Please drop at least one image file.');
      return;
    }
    
    const fileInput = document.getElementById('fileInput');
    fileInput.files = files;
    convertAndDownload();
  }
  
  function handleDragOver(event) {
    event.preventDefault();
  }
  
  function convertImage(file) {
    const reader = new FileReader();
  
    reader.onload = function(event) {
      const image = new Image();
      image.src = event.target.result;
  
      image.onload = function() {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);
  
        canvas.toBlob(function(blob) {
          const url = URL.createObjectURL(blob);
          const convertedImage = new Image();
          convertedImage.src = url;
          convertedImage.className = 'converted-image';
          preview.appendChild(convertedImage);
          
          const downloadButton = document.createElement('a');
          downloadButton.textContent = 'Download';
          downloadButton.href = url;
          downloadButton.download = `${file.name.split('.')[0]}_converted.webp`;
          preview.appendChild(downloadButton);
        }, 'image/webp');
      };
    };
  
    reader.readAsDataURL(file);
  }
  
  const dropArea = document.getElementById('dropArea');
  dropArea.addEventListener('drop', handleDrop);
  dropArea.addEventListener('dragover', handleDragOver);
  