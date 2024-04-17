import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigationbar from "./components/Navbar";

import Home from "./pages/Home";
import MyComponent from "./pages/MyComponent";
import RecordAudio from "./pages/RecordAudio";
import NoPage from "./pages/NoPage";
import SpeechRecognition from "./pages/SpeechRecognition";

import Login from "./pages/authentication/Login"

import TextSend from "./pages/testing/TextSender"
import OpenAiRespnse from "./pages/testing/OpenAiResponse"
import WavConversion from "./pages/testing/WavConversion"
import AiResponse from "./pages/testing/Conversation"
// import from "./pages/"
// import from "./pages/"
// import from "./pages/"
// import from "./pages/"
// import from "./pages/"
// import from "./pages/"
// import from "./pages/"
// import from "./pages/"
// import from "./pages/"
// import from "./pages/"
// import from "./pages/"
// import from "./pages/"
// import from "./pages/"
// import from "./pages/"



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigationbar />}>
          <Route index element={<Home />} />
          <Route path="my-component" element={<MyComponent />} />
          <Route path="record-audio" element={<RecordAudio />} />
          <Route path="speech-recognition" element={<SpeechRecognition />} />
          <Route path="login" element={<Login />} />
          <Route path="text-send" element={<TextSend />} />
          <Route path="chat" element={<OpenAiRespnse/>} />
          <Route path="wav-upload" element={<WavConversion />} />
          <Route path="ai-assistance" element={<AiResponse />} />
          {/* <Route path="" element={< />} /> */}
          {/* <Route path="" element={< />} /> */}
          {/* <Route path="" element={< />} /> */}
          {/* <Route path="" element={< />} /> */}
          {/* <Route path="" element={< />} /> */}
          {/* <Route path="" element={< />} /> */}
          {/* <Route path="" element={< />} /> */}
          {/* <Route path="" element={< />} /> */}
          {/* <Route path="" element={< />} /> */}
          {/* <Route path="" element={< />} /> */}
          {/* <Route path="" element={< />} /> */}
          {/* <Route path="" element={< />} /> */}

          
          <Route path="*" element={<NoPage />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
