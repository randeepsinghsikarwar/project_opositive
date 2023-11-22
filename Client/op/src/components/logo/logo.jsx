import { Link } from 'react-router-dom'
import './logo.css'
export default function Logo() {
    
    return(
            <div className='logo-parent'>
                <Link to='/' > 
            <p className='logo-o'>O</p>
            <p className='logo-rest'>POSITIVE</p>
        </Link>
            </div>

    )
}