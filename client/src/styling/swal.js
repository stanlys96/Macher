import Swal from 'sweetalert2';

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.close)
  }
})

export const swalFire = (message) => {
  return Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: message
  })
}

export const swalOK = (message) => {
  return Swal.fire({
    icon: 'success',
    title: 'Success!',
    text: message
  })
}

export const swalConfirm = () => {
  return Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  })
}

export const toastSuccess = (message) => {
  return Toast.fire({
    icon: 'success',
    title: message
  })
}