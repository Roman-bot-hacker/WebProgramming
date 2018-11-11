//BUTTON'S LISTENERS----------------------------------------------------------------

function nav_burger_click() {
    if (document.getElementById("nav_menu").style.display === "none") {
        document.getElementById("nav_menu").style.display = "inline-block";
    }
    else {document.getElementById("nav_menu").style.display = "none";}
}

//MAP'S INITIALISATION-------------------------------------------------------

// Initialize and add the map
function initMap() {
  // The location of Uluru
  var uluru = {lat: 50.4914036, lng: 30.6002492};
  // The map, centered at Uluru
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 16, center: uluru});
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({position: uluru, map: map});
}

//CHECK APPEAL FUNCTIONS----------------------------------------------------

function checkAppeal() {
  if (document.getElementById('appeal_form').value === "" || 
      document.getElementById('appeal_form').value === "Write an appeal...") {
    document.getElementById('appeal_form').style.borderColor = 'red';
  }
  else {
    document.getElementById('appeal_form').style.borderColor = 'black';
    var appeal = document.getElementById('appeal_form').value;
    document.getElementById('appeal_form').value = "Write an appeal...";
    sendAppeal(appeal);
    alert("Your appeal added successfully!");
  }
}

const feedbackTemplateAppeal = (text, date, nickname) => ` 
    <article>
      <p>${text}</p>
      <div class="fans_under_article">
        <p class="fans_subtext">${date}</p>
        <p class="fans_subtext" align="right">${nickname}</p>
      </div>
      <hr>
    </article>
`

function addAppeal(appeal) {
  if (page == "fans.html") {
    var aText = appeal;
    var dateTime = new Date();
    var aDate = dateTime.getDate() + '.'
      + (dateTime.getMonth()+1) + '.'
      + dateTime.getFullYear() + ', '
      + dateTime.getHours() + ':'
      + dateTime.getMinutes();
    var aSignature = "US Wushu fans";
    var node = feedbackTemplateAppeal(aText, aDate, aSignature);
    document.getElementById("appeals_section").innerHTML += node;
  }
}

//CHECK NEWS FUNCTIONS------------------------------------------------------

function checkNews() {
  if (checkNewsTitle() && checkNewsText()) {
    var title = document.getElementById("news_title").value;
    var article = document.getElementById("news_text").value;
    document.getElementById("news_image").src = "resources/admin_add_image.jpg";
    document.getElementById("news_title").value = "News title";
    document.getElementById("news_text").value = "New article";
    sendNews(title, article);
    alert("Your news has added successfully!")
  } 
}

function checkNewsTitle() {
  var newsTitle = document.getElementById('news_title');
  if (newsTitle.value === "" || newsTitle.value === "News title" || newsTitle.value.length > 256) {
    newsTitle.style.borderColor = "red";
    return false;
  }
  else {
    newsTitle.style.borderColor = "black";
    return true;
  }
}

function checkNewsText() {
  var newsText = document.getElementById('news_text');
  if (newsText.value === "" || newsText.value.length < 25) {
    newsText.style.borderColor = "red";
    return false;
  }
  else {
    newsText.style.borderColor = "black";
    return true;
  }
}

function checkNewsImage() {
  if (document.getElementById('news_image').src !== "resources/admin_add_image.jpg") {
    return true;
  }
  else {return false;}
}

const feedbackTemplateNews = (title, text) =>`
    <div class="col-md-3" style="display: inline-block;">
      <a href="#">${title}</a>
      <img class="cup_poster" src="resources/trad_cup_1.jpg", alt="cup_poster" align="bottom">
      <div class="news_text">
        <p>${text}</p>
      </div>
    </div>
`

function addNews(title, text) {
  if (page == "news.html") {
    var aText = text;
    var aTitle = title;
    var node = feedbackTemplateNews(aTitle, aText);
    document.getElementById("news_conteiner").innerHTML += node;
  }
}


//IMAGE UPLOAD--------------------------------------------------------
function uploadNewsImage() {
  var newsImage = document.getElementById('news_image');
  var reader = new FileReader();
  reader.onload = function(event) {
    var imageUri = event.target.result;
    var format = imageUri.slice(-3);
    if (format === "jpg" || format === "peg" || format === "png") {
      newsImage.src = imageUri;
    }
    else {
      alert("Sorry, we need only jpg of png formats!");
    }
  };
  reader.onerror = function(event) {
    alert("File could not be read!" + event.target.error.code);
  };
}

