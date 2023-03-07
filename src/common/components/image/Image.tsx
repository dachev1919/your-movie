import { FC } from 'react';
import { ICustomComponentProps } from '../../../@types/interfaces';
import { mergeClassName } from '../../../utils/merge-class-name';

interface IImageProps extends ICustomComponentProps {
	src: string;
  alt: string;
}

const Image: FC<IImageProps> = props => {
	return (
		<div
			className={mergeClassName('overflow-hidden bg-primary', props.className ? props.className : '')}
		>
			<img src={props.src} className='w-full h-full object-cover' alt={props.alt} />
		</div>
	);
};

export default Image;
