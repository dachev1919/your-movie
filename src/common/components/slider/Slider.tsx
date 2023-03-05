import { FC } from 'react';
import Slick, { Settings } from 'react-slick';
import './slider.scss';

interface ISliderProps extends Settings {
	isMovieCard?: boolean;
	isSeasonCard?: boolean;
}

const Slider: FC<ISliderProps> = props => {
	let settings: Settings = {...props};

	if (props.isMovieCard) {
		settings = {
			...settings,
			slidesToShow: 5,
			infinite: true,
			slidesToScroll: 1,
			swipe: false,
			responsive: [
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
					}
				},
				{
					breakpoint: 400,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
					}
				},
			]
		}
	}

	return (
		<Slick {...settings} autoplaySpeed={5000}>
			{props.children}
		</Slick>
	);
};

export default Slider;
