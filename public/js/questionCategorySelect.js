function prepareData() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          JSON.parse(this.responseText).forEach(function(item, index) {
          var categoryBox = `<div class="single-category">
                  <h3>Category: ` +
                    item +
                  `</h3>
                  <div class="bottom-of-category">
                  <a class="btn btn-lg btn-primary start" href="/train?category=` + item + `"role="button">Start &raquo;</a>
                </div>
                </div>`;
          document.getElementById('allQuestionCategories').insertAdjacentHTML('beforeend', categoryBox);
        });
        }
    };
    var urlToCall = '/api/questioncategories';
    xhttp.open("GET", urlToCall, true);
    xhttp.send();
}



window.onload = function(){
  prepareData();

};
