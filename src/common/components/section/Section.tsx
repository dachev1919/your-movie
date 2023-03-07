import React, { FC } from 'react';
import { ICustomComponentProps } from '../../../@types/interfaces';
import Container from '../layout/container/Container';
import { mergeClassName } from '../../../utils/merge-class-name';

interface ISectionProps extends ICustomComponentProps {
	title?: string;
	onTitleClick?: () => void;
	hidden?: boolean;
}

const Section: FC<ISectionProps> = props => {
	if (props.hidden) {

		return <></>;
	}

	return (
		<section className='last:pb-20'>
			<Container className={props.className}>
				{props.title ? (
					<h1
						onClick={props.onTitleClick}
						className={mergeClassName(
							'text-xl px-3 py-1.5 transition',
							props.onTitleClick ? 'cursor-pointer hover:opacity-80' : ''
						)}
					>
						{props.title}
					</h1>
				) : (
					''
				)}
				{props.children}
			</Container>
		</section>
	);
};

export default Section;
