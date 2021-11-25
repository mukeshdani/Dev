
const fs = require('fs')

fs.writeFileSync('f1.txt','hello from f1')

fs.unlinkSync('f1.txt')

fs.writeFileSync('f1.txt','hello from f1')


fs.appendFileSync('f1.txt' , ' hello i am mukesh dani')



