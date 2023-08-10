import { BeatLoader } from 'react-spinners';
import './loader.css'
function Loading() {
  return (
    <div className='loader'>
    <BeatLoader color="#3C8DBB" />
    </div>
  );
}

export default Loading;