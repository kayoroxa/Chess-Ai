export function newObserver() {
  let observers = []

  function on(tag, callback) {
    if (typeof callback === 'function') {
      const alreadyExist = observers.some(
        observer =>
          JSON.stringify([observer[0], observer[1].toString()]) ===
          JSON.stringify([tag, callback.toString()])
      )

      if (alreadyExist) {
        return
      }
      observers.push([tag, callback])
    }
  }

  function notify(tag, data) {
    const allListening = observers.filter(observer => {
      const isString = typeof observer[0] === 'string'
      return isString ? observer[0] === tag : observer[0].includes(tag)
    })
    allListening.forEach(observer => {
      observer[1](data)
    })
  }

  function unsubscribe(tag) {
    const index = observers.findIndex(observer => observer[0] === tag)
    if (index !== -1) {
      observers.splice(index, 1)
    }
  }

  function reset() {
    //delete all but obs-reset
    observers = observers.filter(observer => {
      if (observer[0] === 'obs-reset') return true
      return false
    })

    notify('obs-reset')
  }

  return { on, unsubscribe, notify, reset }
}
