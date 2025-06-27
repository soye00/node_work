console.log('import 구문이 밑에 있음 => err')

if(true){
    import AA, {aa, bb, ccFunc} from './var.mjs'
}


console.log(AA)
console.log(aa);
console.log(bb);
console.log(ccFunc(0));


