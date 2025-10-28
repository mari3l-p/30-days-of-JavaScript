const secondsHand = document.querySelector('.seconds')
const minutesHand = document.querySelector('.minutes')
const hoursHand = document.querySelector('.hours')


const setDate = setInterval(() => {
    const now = new Date()

    // seconds
    const seconds = now.getSeconds();
    const secondsDeg = ((seconds / 60) * 360) + 90;
    secondsHand.style.transform = `rotate(${secondsDeg}deg)`

    // minutes
    const minutes = now.getMinutes();
    const minutesDeg = ((minutes / 60) * 360) + 90;
    minutesHand.style.transform = `rotate(${minutesDeg}deg)`

    // hours
    const hours = now.getHours();
    const hoursDeg = ((hours / 24) * 360) + 90;
    hoursHand.style.transform = `rotate(${hoursDeg}deg)`
}, 1000)