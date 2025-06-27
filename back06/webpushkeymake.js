const webpush = require('web-push')

const vapidKeys = webpush.generateVAPIDKeys()
console.log(vapidKeys)

// {
//     publicKey: 'BJxlq4fyngGNbsKP7ekeYqAIzUeA7FPcq7dBxLCUrK-J8y1pxbllsZSXocqhR2JscxcdgO-O7A-6Acac35zEKHg',
//         privateKey: 'YFJJmSU6_mqIMcuSqIDbsnTLbdAUxUYJ7azUmdZNx6o'
// }
