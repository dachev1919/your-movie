import { FC } from 'react';

const Footer: FC = () => {
	const date = new Date();
	const currentYear = date.getFullYear();

	return (
		<footer className='p-6 text-center mt-auto'>
			<p className='select-none text-sm opacity-90'>&#169; {currentYear} Developed by Oleh Dachev. All right reserved.</p>
		</footer>
	);
};

export default Footer;
