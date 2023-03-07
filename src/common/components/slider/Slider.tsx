import { FC, ReactNode, useState } from 'react';
import Slick, { Settings } from 'react-slick';
import './slider.scss';

interface ISliderProps extends Omit<Settings, 'children'> {
	isMovieCard?: boolean;
	isSeasonCard?: boolean;
	children?: (onSwipe: boolean) => ReactNode;
}

const Slider: FC<ISliderProps> = props => {
	let settings: Omit<Settings, 'children'> = { ...props };

	if (props.isMovieCard) {
		settings = {
			autoplay: false,
			...settings,
			slidesToShow: props.slidesToShow ? props.slidesToShow : 5,
			slidesToScroll: 1,
			infinite: true,
			swipe: false,
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 4,
						slidesToScroll: 4
					}
				},
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3
					}
				},
				{
					breakpoint: 576,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2
					}
				},
				{
					breakpoint: 400,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					}
				}
			]
		};
	}

	const [onSwipe, setOnSwipe] = useState(false);

	return (
		<Slick
			{...settings}
			autoplaySpeed={5000}
			onSwipe={() => setOnSwipe(true)}
			afterChange={() => setOnSwipe(false)}
		>
			{props.children ? props.children(onSwipe) : ''}
		</Slick>
	);
};

export default Slider;
