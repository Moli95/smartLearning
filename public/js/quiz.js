function prepareQuestion() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var category = url.searchParams.get("category");
    console.log(category);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("question-text").innerHTML = JSON.parse(this.responseText).questionText;
            JSON.parse(this.responseText).answears.forEach(function(answear, index) {
                document.getElementsByClassName("answear")[index].innerHTML = answear.answear;
                if(answear.isTrue == true) {
                    checkAnswear(answear.answear);
                }
            });
            var hrefToQuestion = '/quiz?category=' + answear.category;
            document.getElementById('nextQuestion').href=hrefToQuestion;
        }
    };
    var urlToCall = '/api/randomquestion?category=' + category;
    xhttp.open("GET", urlToCall, true);
    xhttp.send();
}

function checkAnswear(goodAnswear) {
    var classname = document.getElementsByClassName("answear");

    for (var i = 0; i < classname.length; i++) {
        classname[i].addEventListener('click', function(event) {
            if(event.target.innerHTML == goodAnswear) {

                alert("great!");
            } else {
                alert("bad answear!");
                event.target.style.background = 'red';
            }
            showCorrectAnswear(goodAnswear);
            console.log(event.target.innerHTML);
        }, false);
    }
}

function sendResult(result) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          document.getElementById("question-text").innerHTML = JSON.parse(this.responseText).questionText;
          JSON.parse(this.responseText).answears.forEach(function(answear, index) {
              document.getElementsByClassName("answear")[index].innerHTML = answear.answear;
              if(answear.isTrue == true) {
                  checkAnswear(answear.answear);
              }
          });
          var hrefToQuestion = '/quiz?category=' + answear.category;
          document.getElementById('nextQuestion').href=hrefToQuestion;
      }
  };
  var urlToCall = '/api/randomquestion?category=' + category;
  xhttp.open("GET", urlToCall, true);
  xhttp.send();
}


function move() {
    var elem = document.getElementById("myBar");
    var width = 100;
    var id = setInterval(frame, 100);
    var classname = document.getElementsByClassName("answear");
    function frame() {
        if (width <= 0) {
            clearInterval(id);
            alert("To late for answear");
            // run function that will show good answear;
            for (var i = 0; i < classname.length; i++) {
                classname[i].style.pointerEvents= 'none';
            };
        } else {
            width--;
            elem.style.width = width + '%';
        }
    }


    for (var i = 0; i < classname.length; i++) {
        classname[i].addEventListener('click', function(event) {
            clearInterval(id);
        });
    };

}

function showCorrectAnswear(correct, ) {
    console.log(correct);
    var classname = document.getElementsByClassName("answear");

    for (var i = 0; i < classname.length; i++) {
        if(classname[i].innerHTML == correct) {
            classname[i].style.background = 'green';
        }
        classname[i].style.pointerEvents= 'none';
    }
}

window.onload = function(){
  move();
  prepareQuestion();
};