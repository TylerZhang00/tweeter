/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  const tweetData = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac"
      },
      content: {
        text:
          "If I have seen further it is by standing on the shoulders of midgets"
      },
      created_at: 1461116232227
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd"
      },
      content: {
        text: "I shop , therefore I am"
      },
      created_at: 1461113959088
    }
  ];
  renderTweets(tweetData);
});

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

const renderTweets = function(tweets) {
  tweets.forEach(element => {
    $(".tweets-container").append(createTweetElement(element));
  });
};
