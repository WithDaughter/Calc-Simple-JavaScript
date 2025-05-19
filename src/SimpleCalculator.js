const print = console.log

const plus = src => {
    return src.split('+').map(Number).reduce((acc, cur) => acc + cur, 0)
}

const calculate = src => {
    const val = plus(src)
    return val
}
////////////////////////
export default calculate

;(() => {
    const src = '1+2+3'
    const val = calculate(src)
    print(val)
})()
