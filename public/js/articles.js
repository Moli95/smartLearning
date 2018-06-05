function prepareData() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          JSON.parse(this.responseText).forEach(function(item, index) {
          var articleBox = `
                <div class="single-card">
        <img src="` + item.image + `"/>
        <h3>
          ` + item.title + `
        </h3>
        <p>` + item.text + `
        </p>
        <div class="bottom-of-card">
        <div class="tags-container">
          <a href="/name/">Pierwszy tag</a>
        </div>
        <a class="btn btn-lg btn-primary read-more" href="/article?id=` + item.articleID +`" role="button">Read More! &raquo;</a>
      </div>
      </div>
      `;
          document.getElementById('allarticles').insertAdjacentHTML('beforeend', articleBox);
        });
        }
    };
    var urlToCall = '/api/allarticles';
    xhttp.open("GET", urlToCall, true);
    xhttp.send();
}

function getCategories() {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            JSON.parse(this.responseText).forEach(function(item, index) {
              //CONSOLE.LOG(item);
              var categoryBox = `<option value="` + item + `">` + item + `</option>`;
              document.getElementById('categoryselect').insertAdjacentHTML('beforeend', categoryBox);
            });
          }
      };
      var urlToCall = '/api/articlecategories';
      xhttp.open("GET", urlToCall, true);
      xhttp.send();
    }


      


window.onload = function(){
  prepareData();
  getCategories();
};
