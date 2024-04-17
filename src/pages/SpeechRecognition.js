import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Dictaphone = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  
  const [transcriptSent, setTranscriptSent] = useState(false);
  const [transcriptFailed, setTranscriptFailed] = useState(false);

  const sendTranscriptToBackend = () => {
    fetch('http://localhost:8000/transcript', {
      method: 'POST', // Change method to POST
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ transcript })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to send transcript to backend');
      }
      // Handle successful response
      setTranscriptSent(true);
      setTranscriptFailed(false);
    })
    .catch(error => {
      console.error('Error sending transcript to backend:', error);
      // Handle error
      setTranscriptSent(false);
      setTranscriptFailed(true);
    });
  };
  
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={() => { SpeechRecognition.stopListening(); sendTranscriptToBackend(); }}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
      {transcriptSent && <p>Transcript sent to backend successfully!</p>}
      {transcriptFailed && <p>Failed to send transcript to backend. Please try again.</p>}
    </div>
  );
};

export default Dictaphone;






// import React from 'react';
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

// const Dictaphone = () => {
//   const {
//     transcript,
//     listening,
//     resetTranscript,
//     browserSupportsSpeechRecognition
//   } = useSpeechRecognition();

//   if (!browserSupportsSpeechRecognition) {
//     return <span>Browser doesn't support speech recognition.</span>;
//   }

//   return (
//     <div>
//       <p>Microphone: {listening ? 'on' : 'off'}</p>
//       <button onClick={SpeechRecognition.startListening}>Start</button>
//       <button onClick={SpeechRecognition.stopListening}>Stop</button>
//       <button onClick={resetTranscript}>Reset</button>
//       <p>{transcript}</p>
//     </div>
//   );
// };
// export default Dictaphone;