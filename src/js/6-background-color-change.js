const inputSectionEL = document.getElementById("input-section");
const btnsEl = document.getElementsByClassName('btn');

// console.dir([...btnsEl]);
[...btnsEl].forEach((btn) => console.log(btn));
[...btnsEl].map(btn => btn.addEventListener('click',themeChangeFn));

function themeChangeFn(event) {
//   console.dir(event.target)
// console.log(event.target.value);
removeBorderClass()
event.target.classList.add("border-2")
// clear
document.body.classList = "";
document.body.classList.add(`bg-${event.target.value}`);
if (!document.body.classList.contains("bg-green-50")) {
    document.body.classList.add(`text-white`);
}else{
  document.body.classList.remove(`text-white`);
}
  // event.target.classlist
}

function removeBorderClass() {
  [...btnsEl].map((btn) => btn.classList.remove("border-2"));
}