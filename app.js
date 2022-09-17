function setLike(articleID) {
  document.cookie = articleID + "=y; expires=2147483647 ";
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
}
