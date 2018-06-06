function prepareData() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          JSON.parse(this.responseText).forEach(function(item, index) {
            var tagshtml = "";
            for(var i = 0; i<item.tags.length; i++) {
              tagshtml += `<a href="/articles?tags=` + item.tags[i] + `">` + item.tags[i] + `</a>`;
            }
          console.log(item.tags);
          var shortDescription = item.text.split(" ").slice(0,50).join(" ");

          var articleBox = `
                <div class="single-card">
        <img src="` + item.image + `" width='100%' style='max-height: 400px;'/>
        <h3>
          ` + item.title + `
        </h3>
        <p>` + shortDescription + `
        </p>
        <div class="bottom-of-card">
        <div class="tags-container">` +
          tagshtml +
        `</div>
        <a class="btn btn-lg btn-primary read-more" href="/article?id=` + item.articleID +`" role="button">Read More! &raquo;</a>
      </div>
      </div>
      `;
          document.getElementById('allarticles').insertAdjacentHTML('beforeend', articleBox);
        });
        }
    };
    var currentUrl = new URL(window.location.href);
    var urlToCall = 'api/allarticles';
    if(currentUrl.searchParams.get("category")) {
      urlToCall = urlToCall + '?category=' + currentUrl.searchParams.get("category");
    }
    if(currentUrl.searchParams.get("title") && currentUrl.searchParams.get("title").length>0) {
      urlToCall = urlToCall + '&title=' + currentUrl.searchParams.get("title");
    }
    if(currentUrl.searchParams.get("tags") && currentUrl.searchParams.get("tags").length>0) {
      urlToCall = urlToCall + '?tags=' + currentUrl.searchParams.get("tags");
    }

    console.log(urlToCall);
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
