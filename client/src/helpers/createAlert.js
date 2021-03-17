import Swal from 'sweetalert2'

export const createAlert = (msg, icon = 'success') => {
  Swal.fire({
    title: icon,
    text: msg,
    icon,
    showConfirmButton: true
  })
}
