;(function () {
    const main = document.querySelector('main')

    const dateNow = document.getElementById('date-now')
    const input = document.getElementById('date')
    
    const h2 = document.createElement('h2')

    const getDate = (str) => {
        if (typeof str === 'undefined') return new Date()

        const [day, month, year] = str.split('/')
        return new Date(year, month - 1, day)
    }

    const setValues = () => {
        const today = getDate()

        let dd = today.getDate()
        let mm = today.getMonth() + 1
        let yyyy = today.getFullYear()

        if (dd < 10) dd = '0' + dd
        if (mm < 10) mm = '0' + mm

        input.setAttribute('min', `${yyyy}-${mm}-${dd}`)
        input.setAttribute('value', `${yyyy}-${mm}-${dd}`)
    }
    setValues()

    const msSeconds = 1000
    const msMinutes = 60 * msSeconds
    const msHours = 60 * msMinutes
    const msDays = 24 * msHours

    const update = () => {
        if (dateNow.textContent === '') return

        const today = getDate()
        const later = getDate(dateNow.textContent)

        later.setHours(0)
        later.setMinutes(0)
        later.setSeconds(0)
        later.setMilliseconds(0)

        let left = later.getTime() - today.getTime()

        const daysLeft = parseInt(left / msDays)
        left = left - daysLeft * msDays

        const hoursLeft = parseInt(left / msHours)
        left = left - hoursLeft * msHours

        const minutesLeft = parseInt(left / msMinutes)
        left = left - minutesLeft * msMinutes

        const secondsLeft = parseInt(left / msSeconds)

        h2.textContent = `Faltam: ${daysLeft} dias, ${hoursLeft} horas, ${minutesLeft} minutos e ${secondsLeft} segundos`
    }
    setInterval(update, msSeconds)

    const handle = () => {
        const [year, month, day] = input.value.split('-')

        dateNow.textContent = `${day}/${month}/${year}`
        main.appendChild(h2)
    }
    input.addEventListener('input', handle)
})()
