import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { UserDTO } from '@dtos/userDTO';
import { api } from '@services/api';
import { storageUserGet, storageUserRemove, storageUserSave } from '@storage/storageUser';
import { storageAuthTokenGet, storageAuthTokenRemove, storageAuthTokenSave } from '@storage/storageAuthToken';

export type AuthContextDataProps = {
  user: UserDTO;
  isLoadingUserStoreData: boolean;
  updateUserProfile: (user: UserDTO) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}
export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);

type AuthContextProviderProps = {
  children: ReactNode;
}
export const AuthContextProvider = ({children}: AuthContextProviderProps) => {
  
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [isLoadingUserStoreData, setIsLoadingUserStoreData] = useState(true);
  
  const userAndTokenUpdate = ({userData, token}: {
    userData: UserDTO,
    token: string
  }) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setUser(userData);
  };
  
  const loadUser = async () => {
    setIsLoadingUserStoreData(true);
    
    const userLogged = await storageUserGet();
    const tokenLogged = await storageAuthTokenGet();
    
    if (userLogged && tokenLogged) {
      userAndTokenUpdate({
        userData: userLogged,
        token: tokenLogged.token
      });
    }
    
    setIsLoadingUserStoreData(false);
  };
  
  const signIn = async (email: string, password: string) => {
    await api.post('/sessions', {email, password})
      .then(async ({data}) => {
        if (data.user && data.token && data.refresh_token) {
          setIsLoadingUserStoreData(true);
          
          await storageUserSave(data.user);
          await storageAuthTokenSave(data.token, data.refresh_token);
          
          userAndTokenUpdate({
            userData: data.user,
            token: data.token
          });
          
        }
        
      }).catch(e => {
        
        throw e;
      }).finally(() => {
        setIsLoadingUserStoreData(false);
      });
  };
  const signOut = async () => {
    try {
      setIsLoadingUserStoreData(true);
      
      setUser({} as UserDTO);
      
      await storageUserRemove();
      await storageAuthTokenRemove();
      
      setIsLoadingUserStoreData(false);
      
    } catch (e) {
    
    }
  };
  
  const updateUserProfile = async (userUpdated: UserDTO) => {
    setUser(userUpdated);
    await storageUserSave(userUpdated);
  };
  
  useEffect(() => {
    loadUser();
  }, []);
  
  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut);
    return () => {
      subscribe();
    };
  }, [signOut]);
  
  return (
    <AuthContext.Provider value={{
      user,
      isLoadingUserStoreData,
      updateUserProfile,
      signIn,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
