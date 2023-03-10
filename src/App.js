import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Dialogs from './components/dialogs/dialogs';
import Header from './components/header/header';
import Nav from './components/nav/nav';
import Profile from './components/profile/profile';
import News from './components/news/news';
import Music from './components/music/music';
import Settings from './components/settings/settings';

function App(props) {
	return (
		<BrowserRouter>
			<div className='app-wrapper'>
				<Header />
				<Nav />
				<div className='app-wrapper-content'>
					<Routes>
						<Route path="/dialogs/*" element={<Dialogs dialogsData={props.dialogsData} messagesData={props.messagesData}/>} />
						<Route path="/profile" element={<Profile postsData={props.postsData}/>} />
						<Route path="/news" element={<News />} />
						<Route path="/music" element={<Music />} />
						<Route path="/settings" element={<Settings />} />
					</Routes>
				</div>
			</div>
		</BrowserRouter>
	);
}


export default App;
