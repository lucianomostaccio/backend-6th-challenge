const formLogin = document.querySelector('form')

formLogin?.addEventListener('submit', async event => {
  event.preventDefault()
  alert('sesión iniciada correctamente')
  const response = await fetch('/api/sesiones', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    // @ts-ignore
    body: new URLSearchParams(new FormData(formLogin))
  })

  if (response.status === 201) {
    const sesion = await response.json()
    alert(JSON.stringify(sesion))
    window.location.href = '/profile'
  } else {
    const error = await response.json()
    alert(error.message)
  }
})