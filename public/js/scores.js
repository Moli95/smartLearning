function prepareData() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById('good').innerHTML = JSON.parse(this.responseText).good;
        document.getElementById('all').innerHTML = JSON.parse(this.responseText).all;
      };
  }
  var urlToCall = '/api/userscores';
  xhttp.open("GET", urlToCall, true);
  xhttp.send();
}

window.onload = function(){
  prepareData();
};