function sayHello(name) {
  console.log('Hi ' + name);
}

let saySay = (name) => {
  console.log('Hi ' + name);
}

let saySaySay = (name = 'default') => console.log('Hi ' + name);

function checkInput(cb,...strings) {
  let hasEmptyText = false;
  for (const text of strings) {
    if (text==='') {
      hasEmptyText = true;
      break;
    }
  }
  if (!hasEmptyText) {
    cb();
  }

}

const cb = () => {
  console.log('All not empty');
}

sayHello();
saySay();
saySaySay();
checkInput(cb,'Hello','World','!');