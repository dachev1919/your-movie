import { FC, PropsWithChildren } from 'react';
import Header from './header/Header';
import Footer from "./footer/Footer";

interface ILayout {}

const Layout: FC<PropsWithChildren<ILayout>> = ({ children }) => {
	return (
		<>
			<div>
				<main className='min-h-screen flex flex-col'>
					<Header />
					{children}
					<Footer />
				</main>
			</div>
		</>
	);
};

export default Layout;