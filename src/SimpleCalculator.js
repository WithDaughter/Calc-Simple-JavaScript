const print = console.log

const divide = exp => {
    if (exp.includes('/')) {
        const tokens = exp.split('/')
        const token = tokens.shift()
        return tokens.map(Number).reduce((acc, cur) => acc / cur, token)
    } else
        return Number(exp)
}

const multiply = exp => {
    if (exp.includes('*'))
        return exp.split('*').map(divide).reduce((acc, cur) => acc * cur, 1)
    else
        return divide(exp)
}

const minus = exp => {
    if (exp.includes('-')) {
        const tokens = exp.split('-')
        const token = tokens.shift()
        return tokens.map(multiply).reduce((acc, cur) => acc - cur, token)
    } else
        return multiply(exp)
}

const plus = src => {
    return src.split('+').map(minus).reduce((acc, cur) => acc + cur, 0)
}

const calculate = src => {
    const val = plus(src)
    return val
}
////////////////////////
export default calculate

;(() => {
    const src = '2-2-4+4'
    const val = calculate(src)
    print(val)
})()
