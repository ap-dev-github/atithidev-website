
var text = "Welcome to Atithidev!";
var index = 0;
function typeWriter() {
  var div = document.getElementById('text');
  if (index < text.length) {
    div.innerHTML += text.charAt(index);
    index++;
    setTimeout(typeWriter, 100);
  }
}
typeWriter();
