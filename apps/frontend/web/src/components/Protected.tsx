import { useContext, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import VerifyGame from './VerifyGame';

const Protected = ({ children }: { children: ReactNode }) => {
  const { user, isLoadingUser } = useContext(AuthContext);
  const location = useLocation();
  if (isLoadingUser) {
    return null;
  }

  if (!user) {
    return <Navigate to={'/login'} state={{ redirectTo: location.pathname }} />;
  }
  return (
    <VerifyGame gameRequired={location.pathname !== '/new-game'}>
      {children}
    </VerifyGame>
  );
};

export default Protected;
