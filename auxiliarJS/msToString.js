export default (time) => {
    let rawSeconds = Math.floor(time / 1000);
    let hours = Math.floor(rawSeconds / 3600);
    let minutes = Math.floor((rawSeconds - hours * 3600) / 60);
    let seconds = rawSeconds - hours * 3600 - minutes * 60;
    if (hours < 0 || minutes < 0 || seconds < 0) {
        return '00:00:00'
    } else {
        return `${('0' + hours).slice(-2)}:${('0' + minutes).slice(-2)}:${('0' + seconds).slice(-2)}`

    }
}