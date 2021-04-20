import { swalFire } from '../styling/swal';

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function validateInput(full_name, email, password) {
  if (!full_name || !email || !password) {
    return 'fill_input'
  } else if (password.length < 6) {
    return 'password_length'
  } else if (validateEmail(email) === false) {
    return 'email_validation'
  }
}