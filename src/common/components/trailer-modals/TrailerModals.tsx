import { FC, useEffect, useState } from 'react';
import Container from '../layout/container/Container';
import { IoIosClose } from 'react-icons/io';

interface ITrailerModals {
	src: string | null;
	onHide: () => void;
}

const TrailerModals: FC<ITrailerModals> = props => {
	const [show, setShow] = useState(false);

	const hideHandler = () => {
		setShow(false);
		props.onHide();
	};

	useEffect(() => {
		if (props.src) setShow(true);
	}, [props.src]);

	return (
		<div
			onClick={() => hideHandler()}
			className={`${
				show ? 'opacity-100 ' : 'opacity-0 pointer-events-none '
			}fixed duration-300 top-0 bottom-0 left-0 right-0 z-50 after:absolute after:content-[""] after:top-0 after:bottom-0 after:left-0 after:right-0 after:bg-black after:opacity-90`}
		>
			<Container
				className={`relative z-10 transition-[margin, opacity] duration-300 ease-in-out ${
					show ? 'mt-0 opacity-100' : '-mt-[15rem] opacity-0'
				}`}
			>
				<div
					className='bg-header rounded-lg'
					onClick={e => e.stopPropagation()}
				>
					<div className='p-3 text-right'>
						<button
							className='transition hover:opacity-80'
							onClick={() => hideHandler()}
						>
							<IoIosClose size={25} />
						</button>
					</div>
					{show ? (
						<iframe
							title='trailer'
							src={props.src as string}
							className='w-full h-[50rem] mobile:h-[25rem] max-h-[80vh]'
						/>
					) : (
						''
					)}
				</div>
			</Container>
		</div>
	);
};

export default TrailerModals;
