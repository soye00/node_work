console.log('일반함수');
console.log(this);
function aa(){
    console.log(this);
}

aa();



const a = {
    name: "A",
    friend:['b','c','d'],
    logFriend: function (){
        var that = this;
        console.log(this);
        this.friend.forEach(function (f){
            console.log(that.name,f);
        })
    }
}

console.log('화살표함수');
const b = {
    name: "B",
    friend:['e','f','g'],
    logFriend(){
        () => {
            this.friend.forEach((f) => {
                console.log(f);
            });
        };
    }
};

a.logFriend();
b.logFriend();

