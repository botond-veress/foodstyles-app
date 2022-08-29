import React from 'react';
import { useLocalStorage } from 'react-use';
import { createContainer } from 'unstated-next';

import {
  useLoginMutation,
  useRefreshAccessTokenMutation,
  useGetMeQuery,
  AuthToken,
  useSignUpMutation,
  useLogoutMutation
} from '@/hooks/api';
import { authorizedApi } from '@/services/network/authorized-api';

interface Session {
  accessToken: string;
  refreshToken: string;
}

const convertAuthTokenToSession = ({ accessToken, refreshToken }: Partial<AuthToken> = {}) => {
  if (!accessToken || !refreshToken) return;
  return { accessToken, refreshToken };
};

export const useSession = () => {
  const [session, setSession, clearSession] = useLocalStorage<Session>('foodstyle-session');

  const { data: me, loading } = useGetMeQuery({ skip: !session?.accessToken });

  const updateSession = React.useCallback(
    (session?: Session) => {
      authorizedApi.token = session?.accessToken;
      if (!session) return clearSession();
      return setSession(session);
    },
    [clearSession, setSession]
  );

  const [login] = useLoginMutation({ onCompleted: ({ login }) => updateSession(convertAuthTokenToSession(login)) });
  const [signUp] = useSignUpMutation({ onCompleted: ({ signUp }) => updateSession(convertAuthTokenToSession(signUp)) });
  const [refresh] = useRefreshAccessTokenMutation({
    onCompleted: ({ refreshAccessToken }) => updateSession(convertAuthTokenToSession(refreshAccessToken))
  });
  const [logout] = useLogoutMutation();

  React.useEffect(() => {
    authorizedApi.token = session?.accessToken;

    authorizedApi.configure({
      onAccessTokenExpired: async () => {
        if (!session) throw new Error('Cannot renew unauthenticated session.');

        await refresh({ variables: { refreshToken: session.refreshToken } });
      },
      onUnauthorized: async () => updateSession()
    });
  }, [session, refresh, updateSession]);

  return React.useMemo(
    () => ({
      authenticated: !!session,
      loading,
      me: me?.me,
      login: async (email: string, password: string) => {
        return login({ variables: { email, password } });
      },
      signUp: async (name: string, email: string, password: string) => {
        return signUp({ variables: { name, email, password } });
      },
      logout: async () => {
        updateSession();

        if (!session) return;

        await logout({ variables: { refreshToken: session.refreshToken } });
      }
    }),
    [session, me, loading, updateSession, login, signUp, logout]
  );
};

export const Session = createContainer(useSession);
