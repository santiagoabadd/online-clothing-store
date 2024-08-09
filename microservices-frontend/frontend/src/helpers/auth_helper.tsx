import { UserManager, UserManagerSettings, User, WebStorageStateStore  } from 'oidc-client';


const settings: UserManagerSettings = {
  authority: "http://localhost:8181/realms/microservices-realm/",
  client_id: "microservices-realm",
  redirect_uri: "http://localhost:3000/callback",
  response_type: 'code',
  scope: "openid profile",

};


export const userManager = new UserManager(settings);


export const getUser = (): Promise<User | null> => {
  return userManager.getUser();
}

export const isAuthenticated = async () => {
    const user = await getUser();
    return user !== null && !user.expired;
  }


export const login = (): Promise<void> => {
  return userManager.signinRedirect();
}


export const logout = (): Promise<void> => {
  return userManager.signoutRedirect();
}