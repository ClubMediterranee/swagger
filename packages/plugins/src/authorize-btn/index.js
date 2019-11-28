import AuthorizeBtn from './authorize-btn.component'

export const AuthorizeBtnPlugin = () => {
  return {
    wrapComponents: {
      authorizeBtn: (Original, system) => {
        return AuthorizeBtn
      }
    }
  }
}
