import { FC } from 'react';
import Image from '../../../../common/components/image/Image';
import { ICustomComponentProps } from '../../../../@types/interfaces';

interface ICardProps extends ICustomComponentProps {
	imageSrc: string;
	title?: string;
	onClick?: Function;
	cursor?: boolean;
}

const Card: FC<ICardProps> = ({imageSrc, title, onClick, cursor = true, children }) => {
	return (
		<div
			className={`mx-3 my-1.5 ${cursor ? 'cursor-pointer' : ''}`}
			onClick={() => (onClick ? onClick() : '')}
		>
			<Image
				className='min-h-[18rem] h-[18rem] overflow-hidden rounded-lg'
				src={imageSrc}
				alt='card cover'
			/>
			<p className='py-1.5 line-clamp-2'>{title}</p>
			{children}
		</div>
	);
};

export default Card;
