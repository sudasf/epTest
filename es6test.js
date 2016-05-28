var readFile = require('fs-readfile-promise');
var fileA='./data.json'

// readFile(fileA)
// .then(function(data){
//   console.log(data.toString());
//   return data
// }).then(()=>{
// 	console.log('test1');
// })
// console.log('test');


function* hellosf(){
	yield 200;
	console.log('test');
	yield 'haha'
	yield console.log('hello');
	yield console.log('world');

	return 'ending'
}

var hw=hellosf()

hw1=hw.next()
hw2=hw.next()
console.log(hw1);
console.log(hw2);

// hw.next()
// hw.next()
// hw.next()
