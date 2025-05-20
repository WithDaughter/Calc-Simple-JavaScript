const print = console.log

const divide = exp => {
    const tokens = exp.split('/').map(t => t.trim())
    const token = Number(tokens.shift())
    return tokens.map(Number).reduce((acc, cur) => acc / cur, token)
}

const multiply = exp => {
    return exp.split('*').map(divide)
        .reduce((acc, cur) => acc * cur, 1)
}

const minus = exp => {
    const tokens = exp.split('-')
    const token = multiply(tokens.shift().trim())
    return tokens.map(multiply).reduce((acc, cur) => acc - cur, token)
}

const plus = src => {
    return src.split('+').map(minus)
        .reduce((acc, cur) => acc + cur, 0)
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
    return plus(parened)
}

export default calculate

const assert = (src, expected) => {
    const val = calculate(src)
    if (val === expected) {
        print(`성공: ${src} == ${expected}`)
    } else
        print(`실패: ${src} => ${val} != ${expected}`)
}

const tests = [
    {code: '1 + 2', expected: 3},
    {code: '1 + 2 + 3', expected: 6},
    {code: '2 * 3', expected: 6},
    {code: '1 + 2 * 3', expected: 7},
    {code: '2 * 3 + 3', expected: 9},
    {code: '1 - 3 - 3', expected: -5},
    {code: '1 - 3 + 5', expected: 3},
    {code: '1 + 3 - 3', expected: 1},
    {code: '8 / 2 - 1', expected: 3},
    {code: '9 / 3 - 2', expected: 1},
    {code: '(1 + 2) * 3', expected: 9},
    {code: '2 - (1 - 5)', expected: 6},
    {code: '( 100 - (100 - 200) ) * 30', expected: 6000},
    {code: '4 *(1 + ((2 * 5) /  (2 + 3))) * 3', expected: 36},
    {code: '((10 - (3 *3)) + 2) * ((10 / 5) +2)', expected: 12},
]

;(() => {
    try {
        tests.forEach(test => assert(test.code, test.expected))
    } catch (e) {
        print(e)
    }
})()
