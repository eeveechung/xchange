function comment(itemid) {
    var commentContent = document.getElementById("comment-content-" + itemid);
    console.log(commentContent.value);
    var contentData = encodeURIComponent(commentContent.value);
    commentContent.value = "";
    if (window.XMLHttpRequest) {
        req = new XMLHttpRequest();
    } else {
        req = new ActiveXObject("Microsoft.XMLHTTP");
    }

    req.onreadystatechange = function(){handleCommentResponse(itemid);}; //works
    req.open("POST","/comment/" + itemid ,true);
    req.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    req.send("content=" + contentData);
}

function handleCommentResponse(itemid) {
    if (req.readyState != 4 || req.status != 200) {
        return;
    }

    var list = document.getElementById("comment-" + itemid);
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }

    // Parses the response to get a list of JavaScript objects for 
    // the items.
   var items = JSON.parse(req.responseText);

    // Adds each new todo-list item to the list
    for (var i = 0; i < items.length; i++) {
        // Extracts the item id and text from the response
        var itemid = items[i]["itemid"];
        var userid = items[i]["userid"];
        var username = items[i]["username"];
        var created = items[i]["created"];
        var text = items[i]["text"];
  
        // Builds a new HTML list item for the todo-list item

        var newItem = document.createElement("div");
        newItem.innerHTML = "<hr><div ><p><img src=\""
              + "/photo/" + userid
              + "\" width=\"40px\"> Commented By <a href=\"/profile/" + userid
              + "\">" + username + "</a> on " + created + "</p></div><div><p class=\"post\">" + text + "</p></div>";
        // Adds the todo-list item to the HTML list
        list.appendChild(newItem);
    }
}