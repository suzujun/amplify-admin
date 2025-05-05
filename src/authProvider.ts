import { CognitoAuthProvider } from 'ra-auth-cognito';
import { CognitoUserPool, CognitoUserSession, CognitoUser } from 'amazon-cognito-identity-js';
import outputs from "../amplify_outputs.json";

const userPool = new CognitoUserPool({
    UserPoolId: outputs.auth.user_pool_id,
    ClientId: outputs.auth.user_pool_client_id,
});

const originalAuthProvider = CognitoAuthProvider(userPool, {
    handleNewPassword: async (
        user: CognitoUser,
        setUserState: (state: { status: string }) => void
    ) => {
        // 保存して新パスワード入力画面に誘導
        localStorage.setItem('newPasswordUser', JSON.stringify(user));
        setUserState({ status: 'newPasswordRequired' });
        window.location.href = '/new-password';  // Optional: react-router 経由でも可
    }
} as any);

export const getJWTToken = () => {
    return new Promise((resolve, reject) => {
        // First check localStorage
        const cachedToken = localStorage.getItem('jwtToken');
        const tokenExpiry = localStorage.getItem('jwtTokenExpiry');

        // If we have a cached token that hasn't expired, use it
        if (cachedToken && tokenExpiry && Number(tokenExpiry) > Date.now()) {
            return resolve(cachedToken);
        }

        const currentUser = userPool.getCurrentUser();
        if (!currentUser) {
            reject('No current user');
            return;
        }

        currentUser.getSession((err: Error | null, session: CognitoUserSession) => {
            if (err) {
                reject(err);
                return;
            }
            const token = session.getAccessToken().getJwtToken();

            // Cache the token and its expiry time (e.g. 1 hour from now)
            localStorage.setItem('jwtToken', token);
            localStorage.setItem('jwtTokenExpiry', String(Date.now() + 600000)); // 10 minutes

            resolve(token);
        });
    });
};

export type Identifier = string | number;

export interface UserIdentity {
    id: Identifier;
    fullName?: string;
    avatar?: string;
    [key: string]: unknown;
}

export const getIdentity = (): Promise<UserIdentity> => {
    return new Promise((resolve, reject) => {
        const user = userPool.getCurrentUser();
        if (!user) {
            return reject();
        }
        interface Error {
            name: string;
            message: string;
            stack?: string;
        }
        user.getSession((err: Error, session: CognitoUserSession | null) => {
            if (err) {
                return reject(err);
            }
            if (!session?.isValid()) {
                return reject();
            }
            user.getUserAttributes((err, attributes) => {
                if (err) {
                    return reject(err);
                }
                resolve({
                    id: user.getUsername(),
                    fullName: attributes?.find(
                        attribute => attribute.Name === 'email'
                    )?.Value,
                    avatar: attributes?.find(
                        attribute => attribute.Name === 'picture'
                    )?.Value,
                    cognitoUser: user, // Pass the cognito user object if you need to add authenticator or other features
                });
            });
        });
    });
};

export const authProvider = {
    ...originalAuthProvider,
    getJWTToken,
    getIdentity,
};
