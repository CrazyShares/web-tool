console.log('babel');
// 测试 ES6 语法是否通过 babel 转译
const array = [1, 2, 3]
const isES6 = () => console.log(...array)

const arr = [new Promise(() => { }), new Promise(() => { })]

arr.map(item => {
    console.log(item)
})

export {
    isES6, arr,
}