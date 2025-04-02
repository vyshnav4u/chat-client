import { useState } from 'react';
import classes from './Home.module.css';
import { useChatContext } from '../../context/ChatContext';
import Button from '../../ui/Button';

const Home = () => {
	const [name, setName] = useState('Yash');
	const [room, setRoom] = useState('Sample_Room');

	const { setDisplayName } = useChatContext();

	const createChatRoom = () => {
		if (!name) return;

		setDisplayName(name);
		setName('');
	};

	const joinRoom = () => {
		if (!name || !room) return;

		setDisplayName(name, room);
		setName('');
	};

	return (
		<section className={classes.homeWrap}>
			<h1> Chat Instantly! </h1>
			<input
				type="text"
				placeholder="Nick Name"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<div style={{ display: 'flex', gap: 12 }}>
				<input
					type="text"
					placeholder="Room Id"
					value={room}
					onChange={(e) => setRoom(e.target.value)}
				/>
				<Button onClick={joinRoom}>Join a Room</Button>
			</div>
			<Button onClick={createChatRoom}>Create A Room</Button>
		</section>
	);
};

export default Home;
