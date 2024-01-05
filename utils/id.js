export function getUniqId() {
  const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let id = ''

  for (let i = 0; i < 4; i++) {
    const indiceAleatorio = Math.floor(Math.random() * letras.length)
    id += letras.charAt(indiceAleatorio)
  }

  return id
}
