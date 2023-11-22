
import { Typewriter } from 'react-simple-typewriter'

import Navbar from '../../components/navbar/Navbar';
import Logo from '../logo/logo';
function Home() {

 
  return (
    <div className="parent-panel">
      <div className="main-panel">
        {<Logo/>}
      <div className='slogan'>
      <div className="slogan-fixed" id="slogan-fixed1">
          {"Not a typical"}
        </div>
        <span className="slogan-variable">
          <Typewriter
          words={['Talk to Stranger', 'Random Chat', 'Stranger Chat', 'Digital Mingling', 'Connect with new people']}
          cursorStyle = "_"
          cursor
          cursorColor="red"
          delaySpeed={2000}
          typeSpeed={180}
          loop={0}
          />  
        </span>
        <div className="slogan-fixed">
          {"Platform..."}
        </div>
      </div>
      </div>
      <Navbar/>
    </div>
  );
}

export default Home;
