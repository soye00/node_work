// 방법 1
// class AA{
//     constructor(){
//         this.aa = 10;
//         this.bb = {
//             c:20,
//             ddd(){
//                 console.log('ddd');
//             }
//         }
//     }
// }


// 방법 2

module.exports = {
    aa:10,
    bb: {
        c: 20,
        ddd(){
            console.log('ddd');
        },
    },
};


