import './Contact.css'
import Navbar from '../navbar/Navbar'
export default function Contact(){

    return(
        <div className="contact-parent">
            <div className='contact-left-panel'>
                    <form> 
                        <input type='text' placeholder='name' className='contact-name'/>
                        <textarea cols="50" rows="5" className='constact-text-area' placeholder='Enter your message here...'/>
                    </form>
            </div>
            <div>
                <Navbar/>
            </div>
        </div>
    )
}