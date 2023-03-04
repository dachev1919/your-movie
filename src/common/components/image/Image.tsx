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
			className={mergeClassName('bg-primary w-full h-full', props.className)}
		>
			<img src={props.src} className='w-full h-full' alt={props.alt} />
		</div>
	);
};

export default Image;
