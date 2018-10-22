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
    addAppeal(appeal);
  }
}

function addAppeal(appeal) {
  var newAppeal = document.createElement('article');
  var aText = document.createElement('p');
  aText.innerHTML = appeal;
  var newHr = document.createElement('hr');
  var dateTime = new Date();
  var aDate = document.createElement('p');
  aDate.className = "fans_subtext";
  aDate.innerHTML = dateTime.getDate() + '.'
    + (dateTime.getMonth()+1) + '.'
    + dateTime.getFullYear() + ', '
    + dateTime.getHours() + ':'
    + dateTime.getMinutes();
  var aSignature = document.createElement('p');
  aSignature.className = "fans_subtext";
  aSignature.innerHTML = "US Wushu fans";
  var newDiv = document.createElement('div');
  newDiv.className = "fans_under_article";
  newDiv.appendChild(aDate);
  newDiv.appendChild(aSignature);
  newAppeal.appendChild(aText);
  newAppeal.appendChild(newDiv);
  newAppeal.appendChild(newHr);
  document.getElementById("appeals_section").appendChild(newAppeal);
}

//CHECK NEWS FUNCTIONS------------------------------------------------------

function checkNews() {
  if (checkNewsTitle() && checkNewsText()) {
    document.getElementById("news_image").src = "resources/admin_add_image.jpg";
    document.getElementById("news_title").value = "News title";
    document.getElementById("news_text").value = "New article";
    send()
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

