import { useAuth } from '@contexts/AuthContext';
import { useEffect } from 'react';
import { Loading } from '@components/Loading';

export const Logout = () => {
  const { signOut } = useAuth();
  useEffect(() => {
    const getOut = async () => {
      await signOut();
    };
    
    getOut();
  }, []);
  
  return <Loading />;
};
