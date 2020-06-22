module.exports = function (playerAction) {
    if (['rock','scissor','paper','reset'].indexOf(playerAction) == -1) {
        throw new Error('invalid platerAction')
    }
    const random = Math.random() * 3
    let computerAction
    if (random < 1) {
        computerAction = 'rock'
    } else if (random > 2) {
        computerAction = 'scissor'
    } else {
        computerAction = 'paper'
    }
    if (computerAction === playerAction) {
        return 0
    } else if (
        (computerAction === 'rock' && playerAction === 'paper') ||
        (computerAction === 'scissor' && playerAction === 'rock') ||
        (computerAction === 'paper' && playerAction === 'scissor')
    ) {
        return -1
    } else {
        return 1
    }
}
