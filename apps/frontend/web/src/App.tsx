import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import NewGame from './pages/NewGame';
import Overview from './pages/Overview';
import Room from './pages/Room';
import GameSettings from './pages/GameSettings';
import AccountSettings from './pages/AccountSettings';
import About from './pages/About';
import Assistance from './pages/Assistance';
import Page404 from './pages/Page404';
import Leaderboard from './pages/Leaderboard';
import AuthContext from './contexts/AuthContext';
import { useContext, useEffect } from 'react';
import Protected from './components/Protected';
import { Box } from '@chakra-ui/react';
import { GameFrame } from './components/GameFrame';

const App = () => {
  const { setUser, setIsLoadingUser } = useContext(AuthContext);

  useEffect(() => {
    const abortController = new AbortController();
    const userLogin = async () => {
      try {
        const userLogged = await fetch('/api/auth/me', {
          method: 'GET',
          signal: abortController.signal,
        });

        const jsonResponse = await userLogged.json();

        if (jsonResponse.message !== 'Unauthorized') {
          setUser(jsonResponse);
        }
      } catch (err) {
        console.error(err);
      }
    };
    userLogin();
    setIsLoadingUser(false);
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <Box w="100vw" h="100vh">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/new-game"
          element={
            <Protected>
              <NewGame />
            </Protected>
          }
        />
        <Route
          path="/game/overview"
          element={
            <Protected>
              <Overview />
            </Protected>
          }
        />
        <Route
          path="/game/:label"
          element={
            <Protected>
              <Room />
            </Protected>
          }
        />
        <Route
          path="/game-settings"
          element={
            <Protected>
              <GameSettings />
            </Protected>
          }
        />
        <Route
          path="/account-settings"
          element={
            <Protected>
              <AccountSettings />
            </Protected>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/assistance" element={<Assistance />} />
        <Route path="*" element={<Page404 />} />

        <Route path="/game-frame" element={<GameFrame />} />
      </Routes>
    </Box>
  );
};

export default App;
