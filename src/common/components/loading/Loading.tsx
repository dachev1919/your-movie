import {FC, useEffect, useRef, useState} from 'react';
import {FaSpinner} from 'react-icons/fa'

const Loading: FC = () => {
  const [text, setText] = useState<string>('Loading');
  const countRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (countRef.current !== 3) {
        setText(prevState => prevState + '.');
        countRef.current++;
      } else {
        setText('Loading');
        countRef.current = 0;
      }
    }, 500);

    return () => {
      clearInterval(interval);
    }
  }, []);

  return (
    <div className='flex items-center gap-3'>
      <FaSpinner className='animate-spin' size={18}/>
      <span>{text}</span>
    </div>
  );
};

export default Loading;
