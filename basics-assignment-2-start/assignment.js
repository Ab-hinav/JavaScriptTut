const task3Element = document.getElementById('task-3');

function fun1() {
    alert('fun1');
}

function fun2(name) {
    alert(name);
}

fun1();
fun2('fun2');

task3Element.addEventListener('click', fun1);

function fun3(str1, str2, str3) {
    return str1 + str2 + str3;
}
