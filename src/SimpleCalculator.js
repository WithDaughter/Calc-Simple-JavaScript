const print = console.log

const divide = exp => {
    if (exp.includes('/')) {
        const tokens = exp.split('/').map(t => t.trim())
        const token = tokens.shift()
        return tokens.map(Number).reduce((acc, cur) => acc / cur, token)
    } else
        return Number(exp.trim())
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
        const token = tokens.shift().trim()
        return tokens.map(multiply).reduce((acc, cur) => acc - cur, token)
    } else
        return multiply(exp)
}

const plus = src => {
    return src.split('+').map(minus).reduce((acc, cur) => acc + cur, 0)
}

const parenthesis = src => {
    const mixSign = src => src.replace(/\+-/, '-').replace(/--/, '+')
    if (src.includes('(')) {
        const start = src.indexOf('(')
        const val = parenthesis(src.slice(start + 1).trim())
        return parenthesis(mixSign(src.slice(0, start).trim() + val))
    } else if (src.includes(')')) {
        const end = src.indexOf(')')
        const val = plus(src.slice(0, end))
        return mixSign(String(val) + src.slice(end + 1).trim())
    } else
        return src
}

const calculate = src => {
    const parened = parenthesis(src)
    const val = plus(parened)
    return val
}
////////////////////////
export default calculate

;(() => {
    // const src = '2 - (1 - 5)'
    const src = '( 100 - (100 - 200) ) * 30'
    const val = calculate(src)
    print(val)
})()
