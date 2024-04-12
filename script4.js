const value = document.getElementById('value');
const btn1 = document.querySelector('.decrease');
const btn2 = document.querySelector('reset');
const btn3 = document.querySelector('increase');
const btnmode=document.querySelector('changemode')

let number = 0;
btn1.addEventListener('click', function(){
    value.textContent = --number; value.style.color = "red";
});
btn2.3.addEventListener