import { FC } from 'react';
import Image from '../../../../common/components/image/Image';
import { ICustomComponentProps } from '../../../../@types/interfaces';

interface ICardProps extends ICustomComponentProps {
	imageSrc: string;
	title: string;
	onClick?: Function;
}

const Card: FC<ICardProps> = props => {
	return (
		<div
			className='mx-3 my-1.5 cursor-pointer'
			onClick={() => props.onClick ? props.onClick() : ''}
		>
			<Image className='min-h-[12.5rem] !h-[12.5rem]' src='' alt='' />
			<p className='py-1.5 line-clamp-2'>{props.title}</p>
		</div>
	);
};

export default Card;
