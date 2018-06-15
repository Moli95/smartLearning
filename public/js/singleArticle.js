function prepareData() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          JSON.parse(this.responseText).forEach(function(item, index) {
            var tagshtml = "";
            for(var i = 0; i<item.tags.length; i++) {
              tagshtml += `<a href="/articles?tags=` + item.tags[i] + `">` + item.tags[i] + `</a>`;
            }
          var articleBox = `
                <div class="single-card">
        <img src="` + item.image + `" width='100%' style='max-height: 400px;'/>
        <h3>
          ` + item.title + `
        </h3>
        <p>` + item.text + `
        </p>
        <div class="bottom-of-card">
        <div class="tags-container">` +
          tagshtml +
        `</div>
        </div>
      </div>
      `;
          document.getElementById('allarticles').insertAdjacentHTML('beforeend', articleBox);
        });
        }
    };
    var currentUrl = new URL(window.location.href);
    var urlToCall = 'api/allarticles';
    if(currentUrl.searchParams.get("id")) {
      urlToCall = urlToCall + '?id=' + currentUrl.searchParams.get("id");
    }

    xhttp.open("GET", urlToCall, true);
    xhttp.send();
}




window.onload = function(){
  prepareData();

};
