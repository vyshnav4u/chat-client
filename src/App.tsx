import './App.css';
import { ChatContextProvider } from './context/ChatContextProvider';
import Router from './route/Router';

const App = () => {
	return (
		<ChatContextProvider>
			<Router />
		</ChatContextProvider>
	);
};

export default App;
