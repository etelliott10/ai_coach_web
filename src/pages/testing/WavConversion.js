import React, { useState } from 'react';

const UploadAudio = () => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://localhost:8000/process-audio/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to process audio');
      }

      const responseData = await response.json();
      setText(responseData.text);
      setAudioUrl(URL.createObjectURL(await response.blob()));
    } catch (error) {
      console.error('Error processing audio:', error);
    }
  };

  return (
    <div>
      <input type="file" accept=".wav" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {text && <p>{text}</p>}
      {audioUrl && (
        <audio controls>
          <source src={audioUrl} type="audio/wav" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

export default UploadAudio;




// import React, { useState } from 'react';

// const AudioOperations = () => {
//   const [file, setFile] = useState(null);
//   const [audioUrl, setAudioUrl] = useState('');
//   const [fileName, setFileName] = useState('');

//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];
//     setFile(selectedFile);
//     setAudioUrl(URL.createObjectURL(selectedFile));
//   };

//   const handleUpload = async () => {
//     try {
//       const formData = new FormData();
//       formData.append('file', file); // Use 'file' as the field name
  
//       const response = await fetch('http://localhost:8000/upload/', {
//         method: 'POST',
//         body: formData,
//       });
  
//       if (!response.ok) {
//         throw new Error('Failed to upload audio file');
//       }
  
//       console.log('Upload successful');
//     } catch (error) {
//       console.error('Error uploading audio:', error);
//     }
//   };

//   const handleInputChange = (event) => {
//     setFileName(event.target.value);
//   };

//   return (
//     <div>
//       <input type="file" accept=".wav" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload</button>
      
//       {audioUrl && (
//         <div>
//           <audio controls>
//             <source src={audioUrl} type="audio/wav" />
//             Your browser does not support the audio element.
//           </audio>
//         </div>
//       )}

//       <input type="text" placeholder="Enter file name" value={fileName} onChange={handleInputChange} />
//     </div>
//   );
// };

// export default AudioOperations;



// import React, { useState } from 'react';

// const AudioOperations = () => {
//   const [file, setFile] = useState(null);
//   const [fileName, setFileName] = useState('');

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleUpload = async () => {
//     try {
//       const formData = new FormData();
//       formData.append('file', file); // Use 'file' as the field name
  
//       const response = await fetch('http://localhost:8000/upload/', {
//         method: 'POST',
//         body: formData,
//       });
  
//       if (!response.ok) {
//         throw new Error('Failed to upload audio file');
//       }
  
//       console.log('Upload successful');
//     } catch (error) {
//       console.error('Error uploading audio:', error);
//     }
//   };

//   const handleDownload = async () => {
//     try {
//       const response = await fetch(`http://localhost:8000/download/${fileName}`);
      
//       if (!response.ok) {
//         throw new Error('Failed to download audio file');
//       }

//       // Convert the response to a blob
//       const blob = await response.blob();

//       // Create a URL for the blob
//       const url = window.URL.createObjectURL(blob);

//       // Create an anchor element
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = fileName;

//       // Append the anchor element to the body
//       document.body.appendChild(a);

//       // Click the anchor element to trigger the download
//       a.click();

//       // Remove the anchor element from the body
//       document.body.removeChild(a);
//     } catch (error) {
//       console.error('Error downloading audio:', error);
//     }
//   };

//   const handleInputChange = (event) => {
//     setFileName(event.target.value);
//   };

//   return (
//     <div>
//       <input type="file" accept=".wav" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload</button>
      
//       <input type="text" placeholder="Enter file name" value={fileName} onChange={handleInputChange} />
//       <button onClick={handleDownload}>Download</button>
//     </div>
//   );
// };

// export default AudioOperations;




// import React, { useState } from 'react';

// const UploadAudio = () => {
//   const [file, setFile] = useState(null);

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleUpload = async () => {
//     try {
//       const formData = new FormData();
//       formData.append('file', file); // Use 'file' as the field name
  
//       const response = await fetch('http://localhost:8000/upload/', {
//         method: 'POST',
//         body: formData,
        
//       });
  
//       if (!response.ok) {
//         throw new Error('Failed to upload audio file');
//       }
  
//       console.log('Upload successful');
//     } catch (error) {
//       console.error('Error uploading audio:', error);
//     }
//   };

//   return (
//     <div>
//       <input type="file" accept=".wav" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload</button>
//     </div>
//   );
// };

// export default UploadAudio;
