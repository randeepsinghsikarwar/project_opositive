import { Link } from 'react-router-dom'
import './logo.css'
export default function Logo() {
    
    return(
            <Link to='/' className='logo-parent' > 
            <p className='logo-o'>O</p>
            <p className='logo-rest'>POSITIVE</p>
        </Link>

    )
}