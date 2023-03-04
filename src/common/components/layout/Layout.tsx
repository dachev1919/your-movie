import { FC, PropsWithChildren } from 'react';
import styles from './Layout.module.scss';
import Header from './header/Header';
import Footer from "./footer/Footer";

interface ILayout {}

const Layout: FC<PropsWithChildren<ILayout>> = ({ children }) => {
	return (
		<>
			<div className={styles.layout}>
				<main>
					<Header />
						<div className={styles.content}>{children}</div>
					<Footer />
				</main>
			</div>
		</>
	);
};

export default Layout;