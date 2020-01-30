//SERIALIZE DATA FUNCTION
function objectifyForm(formArray) {
  const returnArray = {};
  for (let i = 0; i < formArray.length; i++) {
    returnArray[formArray[i]["name"]] = formArray[i]["value"];
  }
  return returnArray;
}

// CREATE AJAX GET REQUEST THAT RENDERS INITIAL TWEETS
$(function() {
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
    const myFormArray = $(this).serializeArray();
    const myFormObject = objectifyForm(myFormArray);

    if (myFormObject["text"] === "") {
      alert("It's Canada! You cannot plead the fifth!");
    } else if (myFormObject["text"].length > 140) {
      alert("TLDR");
    } else {
      $.ajax("/tweets", {
        method: "POST",
        data: $(this).serialize()
      }).then(function() {
        loadTweets();
      });
    }
  });
  /* CALL LOAD TWEETS WHICH WILL RENDER ORIGINAL TWEETS, THEN ON SUBMIT
  ADDITIONAL POSTED TWEETS GET RENDERED */

  loadTweets();

  $("#toggle").click(function() {
    console.log("HI");
    $(".new-tweet").slideToggle("fast");
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
  ${escape(tweet.content.created_at)}
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
