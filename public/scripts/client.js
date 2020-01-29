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
    if ($(this).serialize() === "") {
      alert("It's Canada! You cannot plead the fifth!");
    } else if ($(this).serialize().length > 140) {
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

  loadTweets();
});

/* THIS RETURNS THE TWEET WITH PROPER HTML
USED IN RENDER TWEETS*/

const createTweetElement = function(tweet) {
  const postedtweets = `<article class="postedtweets">
  <div class="tweetheader">
  <img src=${tweet.user.avatars} >
  <h4 class="tweetname">${tweet.user.name}</h4>
  <h4 class="tweethandle">${tweet.user.handle}</h4>
  </div>
  <p class="tweetcontent">
  ${tweet.content.text}
  </p>
  <p class="tweetdate">
  ${tweet.content.created_at}
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
