import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($input: LoginInput) {
    login(user: $input) {
      full_name
      email
      token
      message
    }
  }
`

export const VERIFY_EMAIL = gql`
  query verifyEmail($input: String) {
    verifyEmail(token: $input) {
      email
    }
  }
`

export const GET_USERS = gql`
  query getUsers {
    getUsers {
      email
    }
  }
`

export const REGISTER = gql`
  mutation register($input: RegisterInput) {
    register(user: $input) {
      full_name
      email
      token
      message
    }
  }
`

export const RESET_PASSWORD = gql`
  mutation updatePassword($input: LoginInput) {
    updatePassword(user: $input) {
      email
      message
    }
  }
`

export const FORGOT_PASSWORD = gql`
  mutation forgotPassword($input: String) {
    forgotPassword(email: $input) {
      email
      message
    }
  }
`