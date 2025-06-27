import dns from 'dns/promises';

const ip = await dns.lookup("gilbut.co.kr",{all:true}); // 도메인 -> ip 확인
console.log(ip);

