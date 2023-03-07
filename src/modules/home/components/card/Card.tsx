import { FC } from 'react';
import Image from '../../../../common/components/image/Image';
import { ICustomComponentProps } from '../../../../@types/interfaces';
import { MdPlayCircleFilled } from 'react-icons/md';

interface ICardProps extends ICustomComponentProps {
	imageSrc: string;
	title?: string;
	onClick?: Function;
	cursor?: boolean;
	withPlay?: boolean;
}

const Card: FC<ICardProps> = ({
	withPlay = true,
	imageSrc,
	title,
	onClick,
	cursor = true,
	children,
																className
}) => {
	return (
		<div
			className={`group mx-3 my-1.5 ${cursor ? 'cursor-pointer' : ''}${className ? ' ' + className : ''}`}
			onClick={() => (onClick ? onClick() : '')}
		>
			<div className='h-[24rem] relative overflow-hidden rounded-lg'>
				{withPlay && (
					<div className='group-hover:before:opacity-70 absolute left-0 flex items-center justify-center right-0 top-0 bottom-0 before:absolute before:left-0 before:right-0 before:top-0 before:bottom-0 before:content-[""] before:bg-black before:opacity-0 before:transition'>
						<button className='relative z-[2] scale-0 transition group-hover:scale-100'>
							<MdPlayCircleFilled size={36} />
						</button>
					</div>
				)}
				<Image className='h-full w-full' src={imageSrc} alt='card cover' />
			</div>
			<p className='py-1.5 line-clamp-2'>{title}</p>
			{children}
		</div>
	);
};

export default Card;
