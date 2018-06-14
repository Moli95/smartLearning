function prepareQuestion() {
    var url_string = window.location.href;
    var url = new URL(url_string);
    var category = url.searchParams.get("category");
    console.log(category);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("question-text").innerHTML = JSON.parse(this.responseText).questionText;
            document.getElementById("tip").innerHTML = JSON.parse(this.responseText).tip;
            var randomOrder = shuffle(JSON.parse(this.responseText).answears);
            randomOrder.forEach(function(answear, index) {
                document.getElementsByClassName("answear")[index].innerHTML = answear.answear;
                if(answear.isTrue == true) {
                    checkAnswear(answear.answear);
                }
            });
            var hrefToQuestion = '/train?category=' + JSON.parse(this.responseText).category;
            document.getElementById('nextQuestion').href=hrefToQuestion;
        }
    };
    var urlToCall = '/api/randomquestion?category=' + category;
    xhttp.open("GET", urlToCall, true);
    xhttp.send();
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
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


function showTip() {
    document.getElementById('tip').style.display="block";
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
  prepareQuestion();


  document.getElementById('showTip').addEventListener('click', function() {
    showTip();
  });

};
