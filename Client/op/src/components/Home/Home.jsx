
import { Typewriter } from 'react-simple-typewriter'

import Navbar from '../../components/navbar/Navbar';

function Home() {

 
  return (
    <div className="parent-panel">
      <div className="main-panel">
        <div className="brand-panel">{'OPositive'}</div>
        {/* <p className="slogan-panel1">{'Not just a typical "TALK TO STRANGER" platform...'}</p> */}
        <div className="slogan-fixed" id="slogan-fixed1">
          {"Not a typical"}
        </div>
        <span className="slogan-variable">
          <Typewriter
          words={['Talk to Stranger', 'Random Chat', 'Stranger Chat', 'Digital Mingling', 'Connect with new people']}
          cursor
          cursorColor="black"
          delaySpeed={2000}
          typeSpeed={180}
          loop={0}
          />  
        </span>
        <div className="slogan-fixed">
          {"Platform..."}
        </div>
      </div>
      <Navbar/>
    </div>
  );
}

export default Home;
