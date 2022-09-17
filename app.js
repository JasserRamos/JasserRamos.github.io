function cookieDate(d) {
  function d2(n) {
    return n < 10 ? "0" + n : n;
  }
  var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

  return (
    "" +
    days[d.getUTCDay()] +
    ", " +
    d2(d.getUTCDate()) +
    "-" +
    months[d.getUTCMonth()] +
    "-" +
    d.getUTCFullYear() +
    " " +
    d2(d.getUTCHours()) +
    ":" +
    d2(d.getUTCMinutes()) +
    ":" +
    d2(d.getUTCSeconds()) +
    " GMT"
  );
}
function setLike(articleID) {
  var CookieDate = new Date();
  const daysToExpire = new Date(2147483647 * 1000).toGMTString();
  document.cookie =
    articleID +
    "=like; expires= Fri, 1 Jan 2038" +
    ";max-age=" +
    500 * 24 * 60 * 60 +
    ";path=/";
  alert(document.cookie);
}

function printCookies() {
  alert(document.cookie.split(";"));
}
function resetCookies() {
  var allCookies = document.cookie.split(";");

  // The "expire" attribute of every cookie is
  // Set to "Thu, 01 Jan 1970 00:00:00 GMT"
  for (var i = 0; i < allCookies.length; i++)
    document.cookie = allCookies[i] + "=;expires=" + new Date(0).toUTCString();
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
/*
getListItemsForView(
  _spPageContextInfo.webAbsoluteUrl,
  "BECAS",
  "VistaAnioActual"
)
  .done(function (data) {
    var itemsCount = data.d.results.length;
    alert(itemsCount);
  })
  .fail(function (error) {
    console.log(JSON.stringify(error));
  });
function getListItemsForView(webUrl, listTitle, viewTitle) {
  var viewQueryUrl =
    webUrl +
    "/_api/web/lists/getByTitle('" +
    listTitle +
    "')/Views/getbytitle('" +
    viewTitle +
    "')/ViewQuery";
  return getJson(viewQueryUrl).then(function (data) {
    var viewQuery = data.d.ViewQuery;
    return getListItems(webUrl, listTitle, viewQuery);
  });
}

function getJson(url) {
  return $.ajax({
    url: url,
    type: "GET",
    contentType: "application/json;odata=verbose",
    headers: {
      Accept: "application/json;odata=verbose",
    },
  });
}

function getListItems(webUrl, listTitle, queryText) {
  var viewXml = "<View><Query>" + queryText + "</Query></View>";
  var url = webUrl + "/_api/web/lists/getbytitle('" + listTitle + "')/getitems";
  var queryPayload = {
    query: {
      __metadata: { type: "SP.CamlQuery" },
      ViewXml: viewXml,
    },
  };

  return $.ajax({
    url: url,
    method: "POST",
    data: JSON.stringify(queryPayload),
    headers: {
      "X-RequestDigest": $("#__REQUESTDIGEST").val(),
      Accept: "application/json; odata=verbose",
      "content-type": "application/json; odata=verbose",
    },
  });
  
}*/
