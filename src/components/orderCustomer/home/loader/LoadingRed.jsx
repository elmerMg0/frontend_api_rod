import { BeatLoader } from 'react-spinners';
import './loader.css'
function LoadingRed() {
  return (
    <div className='loader-red'>
    <BeatLoader color="#b6003b" />
    </div>
  );
}

export default LoadingRed;