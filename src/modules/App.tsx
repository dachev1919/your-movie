import React, { FunctionComponent } from 'react';
import Layout from '../common/components/layout/Layout';
import { Routers } from '../routes/Routers';

interface IAppProps {}

const App: FunctionComponent<IAppProps> = () => {
	return (
		<>
			<Layout>
				<Routers />
			</Layout>
		</>
	);
};

export default App;
