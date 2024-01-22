/// <reference types="firebase" />

export { };

declare global {
  namespace Firebase {
    type Instance = typeof firebase.default;
    type App = firebase.default.app.App;
    type UserCredential = firebase.auth.UserCredential;
    type UserInfoInterface = firebase.auth.UserInfoInterface
    type User = firebase.default.User;
    type UserInfo = User & {
      email: string;
      isAnonymous: boolean;
    };
    type Error = firebase.default.FirebaseError;
  }

}
