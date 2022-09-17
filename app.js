function setLike(articleID) {
  document.cookie = articleID + "=y; expires=Fri, 31 Dec 9999 23:59:59 GMT";
}

function printCookies() {
  alert(document.cookie);
}
function resetCookies() {
  var allCookies = document.cookie.split(";");

  // The "expire" attribute of every cookie is
  // Set to "Thu, 01 Jan 1970 00:00:00 GMT"
  for (var i = 0; i < allCookies.length; i++)
    document.cookie = allCookies[i] + "=;expires=" + new Date(0).toUTCString();

  displayCookies.innerHTML = document.cookie;
}
function hasLiked(articleID) {
  var cookies = document.cookie.split(";");
  var result = false;
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].split("=");
    if (cookie[0].trim() == articleID) {
      result = true;
    }
  }
  return result;
}
var likecount = document.cookie.split(";").length;
function awesomeClick(articleID) {
  if (!hasLiked(articleID)) {
    setLike(articleID);
    likecount++;
    alert("se dio like ");
  } else {
    alert("No puedes darle like dos veces");
  }
}
