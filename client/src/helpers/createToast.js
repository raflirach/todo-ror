import Swal from 'sweetalert2'

export const createToast = (msg, icon = 'success') => {
  Swal.fire({
    toast: true,
    timer: 2000,
    title: msg,
    icon,
    showConfirmButton: false,
    position: 'top'
  })
}
