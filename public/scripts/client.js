//SERIALIZE DATA FUNCTION
function objectifyForm(formArray) {
  const resultsObject = {};
  for (let i = 0; i < formArray.length; i++) {
    resultsObject[formArray[i]["name"]] = formArray[i]["value"];
  }
  return resultsObject;
}

// CREATE AJAX GET REQUEST THAT RENDERS INITIAL TWEETS
$(function() {
  $("#errormessage").hide();
  $("#errormessage2").hide();
  $("#jump").hide();
  $(".new-tweet").hide();

  const loadTweets = function() {
    $.ajax("/tweets", {
      method: "GET"
    }).then(function(data) {
      $(".tweets-container").empty();
      renderTweets(data);
    });
  };
  // CREATES AJAX POST TWEETS THAT RENDERS POSTED TWEETS
  const $form = $("#form");
  $form.submit(function(event) {
    event.preventDefault();

    // CHECKS ARTICLE FOR ERRORS, IF NONE > AJAX
    const myFormArray = $(".composemessage").serializeArray();
    let myFormObject = objectifyForm(myFormArray);

    if (myFormObject["text"].length === 0) {
      $("#errormessage").show();
      $("#errormessage2").hide();
    } else if (myFormObject["text"].length > 140) {
      $("#errormessage").hide();
      $("#errormessage2").show();
    } else {
      $.ajax("/tweets", {
        method: "POST",
        data: myFormArray
      }).then(function() {
        loadTweets();
        $(".composemessage").val("");
        $("#counter").text("140");
      });
    }
  });
  /* CALL LOAD TWEETS WHICH WILL RENDER ORIGINAL TWEETS, THEN ON SUBMIT
  ADDITIONAL POSTED TWEETS GET RENDERED */

  loadTweets();

  // TOGGLE BUTTON
  $("#toggle").click(function() {
    $(".new-tweet").slideToggle("fast");
  });

  // ERASE ERRORS ON CLICK
  $(".composemessage").click(function() {
    $("#errormessage").hide();
    $("#errormessage2").hide();
  });

  // BACK TO TOP BUTTON
  mybutton = document.getElementById("jump");

  window.onscroll = function() {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 600 ||
      document.documentElement.scrollTop > 600
    ) {
      mybutton.style.display = "block";
      $("#toggle").hide();
    } else {
      mybutton.style.display = "none";
      $("#toggle").show();
    }
  }
  $("#jump").click(function topFunction() {
    document.documentElement.scrollTop = 0;
  });
});

/* THIS RETURNS THE TWEET WITH PROPER HTML
USED IN RENDER TWEETS*/

const createTweetElement = function(tweet) {
  const postedtweets = `<article class="postedtweets">
  <div class="tweetheader">
    <img src=${escape(tweet.user.avatars)} >
    <h4 class="tweetname">${escape(tweet.user.name)}</h4>
    <h4 class="tweethandle">${escape(tweet.user.handle)}</h4>
  </div>
    <p class="tweetcontent">
      ${escape(tweet.content.text)}
    </p>
    <p class="tweetdate">
      ${moment(tweet.created_at).fromNow()}
    </p>
  </article>`;
  return postedtweets;
};

// RENDERS TWEETS INTO DIV IN HTML AND PREPENDS ALL TWEETS
const renderTweets = function(tweets) {
  tweets.forEach(element => {
    $(".tweets-container").prepend(createTweetElement(element));
  });
};

// ESCAPE XSS
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
