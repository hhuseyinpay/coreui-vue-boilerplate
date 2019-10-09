// burası düzenlenecek
import Swal from 'sweetalert2/src/sweetalert2.js'


export function ErrorMessage(message, title = '', duration = 5 * 1000) {
  Swal.fire({
    position: 'top',
    type: 'error',
    title: title,
    text: message,
    timer: duration,
    confirmButtonText: 'Tamam'
  })
}


export function SuccessMessage(message, title = '', duration = 5 * 1000) {
  Swal.fire({
    type: 'success',
    title: title,
    text: message,
    timer: duration,
    confirmButtonText: 'Tamam'
  })
}

export function ConfirmationMessage(message, title = 'Emin misiniz?', sonucMessage = "Başarılı", sonucTitle = "Başarılı", confirmButtonText = "Evet", cancelButtonText = "Vazgeç", duration = 5 * 1000) {
  Swal.fire({
    type: 'warning',

    title: title,
    text: message,
    showCancelButton: true,
    cancelButtonColor: '#d33',
    cancelButtonText: cancelButtonText,
    confirmButtonColor: '#3085d6',

    confirmButtonText: confirmButtonText
  }).then((result) => {
    if (result.value) {
      Swal.fire(
        sonucTitle,
        sonucMessage,
        'success'
      )
    }
  })
}
