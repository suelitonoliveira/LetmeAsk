import { useHistory } from 'react-router-dom'

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleImage from '../assets/images/google-icon.svg';

import '../styles/auth.scss';
import { Button } from '../components/Button';

import { useAuth } from '../hooks/useAuth';
import { FormEvent } from 'react';
import { useState } from 'react';
import { database } from '../service/firebase';



export function Home() {

    const history = useHistory();
    const { user, sigInWithGoogle } = useAuth();
    const [roomCode, setRoomCode] = useState('');

    async function handleCreateRoom() {
        if (!user) {
            await sigInWithGoogle()
        }

        history.push('/rooms/new');
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if (roomCode.trim() === '') {
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if (!roomRef.exists()) {
            alert('Room does not exists.')
            return;
        }

        history.push(`rooms/${roomCode}`);

    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Illustação simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A  ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="letmeask" />

                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleImage} alt="Logo do Google" />
                        Crie sua sala com o google
                    </button>

                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}