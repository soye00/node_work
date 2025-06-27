class Human{
    // new 연산자 사용해서 객체 생성시 호출
    constructor(type='human') {
        this.type = type;
    }
    // 정적 메서드인 isHuman 은 객체 생성 X
    static isHuman(a) {
        console.log('인간이다'+a)
    }

    // 내부 메서드 prototype
    // 객체 생성하면 prototype 체인룰에서 생성
    // 객체 생성해서 사용
    br(){
        alert('아ㅏ아')
    }
}

class AA extends Human{

}


const human = new Human();
console.dir(human);
Human.isHuman(human);
AA.isHuman(human);