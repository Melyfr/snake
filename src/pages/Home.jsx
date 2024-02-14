import { Link } from 'react-router-dom';
import snake_banner from '../img/snake-banner.png';
import '../css/Home.css';

export default function Home() {
  return (
    <div className='home__container'>
      <img className='home__banner' src={snake_banner} alt="Snake" />
      <Link to='/snake' className='link'>Play</Link>
    </div>
  )
}
