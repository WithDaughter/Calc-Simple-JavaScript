const print = console.log
const calculate = src => {
    return src
}
////////////////////////
export default calculate

;(() => {
    let src = '1+2'
    // src = '1+2+3'
    const val = calculate(src)
    print(val)
})()
