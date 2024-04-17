import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          {/* <li>
            <Link to="/login">Sign-up</Link>
          </li> */}
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/my-component">My Components</Link>
          </li>
          <li>
            <Link to="/record-audio">Record Audio</Link>
          </li>
          <li>
            <Link to="/speech-recognition">Speech Recognition</Link>
          </li>
          <li>
            <Link to="/text-send">Text Send</Link>
          </li>
          <li> <Link to="/chat">Ai Chat</Link></li>
          <li> <Link to="/wav-upload">Upload Wav</Link></li>
          <li> <Link to="/ai-assistance">AI Assistance</Link></li>
          {/* <li> <Link to="/"></Link></li> */}
          {/* <li> <Link to="/"></Link></li> */}
          {/* <li> <Link to="/"></Link></li> */}
          {/* <li> <Link to="/"></Link></li> */}
          {/* <li> <Link to="/"></Link></li> */}
          {/* <li> <Link to="/"></Link></li> */}
          {/* <li> <Link to="/"></Link></li> */}
          {/* <li> <Link to="/"></Link></li> */}

        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;