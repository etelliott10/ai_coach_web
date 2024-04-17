import React, { useState, useRef } from 'react';

const AiAssistance = () => {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [userText, setUserText] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [aiAudio, setAiAudio] = useState(null);
  const [aiRole, setAiRole] = useState('judge'); // Initialize with 'judge'
  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (e) => {
          chunksRef.current.push(e.data);
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: 'audio/wav' });
          setAudioBlob(blob);
        };

        mediaRecorder.start();
        setRecording(true);
      })
      .catch(error => {
        console.error('Error accessing microphone:', error);
      });
  };

  const stopRecording = () => {
    const mediaRecorder = mediaRecorderRef.current;
    if (mediaRecorder && mediaRecorder.state === 'recording') {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  const sendRecording = async () => {
    if (!audioBlob) return;

    const formData = new FormData();
    formData.append('file', audioBlob);

    try {
      const response = await fetch('http://localhost:8000/ai-assistance/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Recording sent successfully');
        const data = await response.json();
        setUserText(data.user_text_response);
        setAiResponse(data.ai_text_response);
        setAiAudio(data.ai_audio_response);
      } else {
        console.error('Failed to send recording:', response.statusText);
      }
    } catch (error) {
      console.error('Error sending recording:', error);
    }
  };

  const downloadAudio = async () => {
    try {
      const response = await fetch('http://localhost:8000/download', {
        method: 'GET',
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'audio_file.wav'; // Specify the default file name
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        console.error('Failed to download audio:', response.statusText);
      }
    } catch (error) {
      console.error('Error downloading audio:', error);
    }
  };

  return (
    <div>
      <select value={aiRole} onChange={(e) => setAiRole(e.target.value)}>
        <option value="judge">Judge</option>
        <option value="stay_home_mother">Stay Home Mother</option>
        <option value="sassy_woman">Sassy Woman</option>
      </select>
      <button onClick={startRecording} disabled={recording}>Start Recording</button>
      <button onClick={stopRecording} disabled={!recording}>Stop Recording</button>
      <button onClick={sendRecording} disabled={!audioBlob}>Send Recording</button>
      <button onClick={downloadAudio}>Download Audio</button>
      <div>
        <h3>User's Audio Text:</h3>
        <p>{userText}</p>
      </div>
      <div>
        <h3>AI Response:</h3>
        <p>{aiResponse}</p>
      </div>
      {/* {aiAudio && <audio ref={audioRef} src={`data:audio/wav;base64,${aiAudio}`} controls />} */}
      {aiAudio && <audio ref={audioRef} src={`data:audio/mp3;base64,${aiAudio}`} controls />}
      {/* {aiAudio && <audio src={`data:audio/mp3;base64,${aiAudio}`} controls />} */}

    </div>
  );
};

export default AiAssistance;
