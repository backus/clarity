export const types = {
  SIGN_IN: 'sign-in/set-facebookId',
  SIGN_OUT: 'sign-out/rm-user',
}

export type IAction = {
  type: string
  facebookId: string | null
  displayName: string | null
}

export interface IActions {
  signIn(facebookId: string | null, displayName: string | null): IAction
  signOut(): null
}

export const actions = {
  signIn: (facebookId: string | null, displayName: string | null) => ({
    type: types.SIGN_IN,
    facebookId,
    displayName,
  }),

  signOut: () => ({
    type: types.SIGN_OUT,
  }),
}
