const print = console.log

const multiply = exp => {
    if (exp.includes('*'))
        return exp.split('*').map(Number).reduce((acc, cur) => acc * cur, 1)
    else
        return Number(exp)
}

const plus = src => {
    return src.split('+').map(multiply).reduce((acc, cur) => acc + cur, 0)
}

const calculate = src => {
    const val = plus(src)
    return val
}
////////////////////////
export default calculate

;(() => {
    const src = '2*2+4+4'
    const val = calculate(src)
    print(val)
})()
