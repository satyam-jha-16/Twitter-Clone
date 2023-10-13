import { tweetsData } from "./data.js";
const tweetInput = document.getElementById("tweet-input")
const tweetBtn = document.getElementById("tweet-btn") 

tweetBtn.addEventListener("click", function(){
    console.log(tweetInput.value)

})
document.addEventListener("click", function(event){
        if(event.target.dataset.like){
            handleLikeClick(event.target.dataset.like)
        }
        else if(event.target.dataset.retweet){
            handleRetweet(event.target.dataset.retweet)
        }
        else if(event.target.dataset.replies){
            handleReplyClick(event.target.dataset.replies)
        }

})

function handleLikeClick(tweetId){
    // console.log(tweetId)

    //.filter() function to return to return a single array of object with the unique uuid mentioned
    const targetTweetObj = tweetsData.filter(function(tweet){
        return (tweet.uuid === tweetId)
    })[0]
    if(targetTweetObj.isLiked === false){
        targetTweetObj.likes++
    }else{
        targetTweetObj.likes --
    }
    //refactoring the code to flip the boolean bit so as to prevent multiple likes by a single user
    targetTweetObj.isLiked = !targetTweetObj.isLiked
    console.log(targetTweetObj)
    render()
}
function handleRetweet(tweetId){
    const targetTweetObj = tweetsData.filter(function(tweet){
        return (tweet.uuid === tweetId)
    })[0]

    if(targetTweetObj.isRetweeted === false){
        targetTweetObj.retweets ++
    }else{
        targetTweetObj.retweets --
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
    render()
}

function handleReplyClick(tweetId){
    document.getElementById(`replies-${tweetId}`).classList.toggle("hidden")
}

function getFeedHtml(){
    let feedHtml = ``
    //for each is a refactor version of for-of loop 
    tweetsData.forEach(function(tweet){
        //to add the color changing feature 
        let likeIconClass = ""
        let retweetedIconClass = ""
        if(tweet.isLiked){
            likeIconClass = "liked"
        }
        if(tweet.isRetweeted){
            retweetedIconClass = "retweeted"
        }
        let repliesHtml = ''

        if(tweet.replies.length > 0){
            // console.log(tweet.uuid)
            tweet.replies.forEach(function(reply){
                repliesHtml += `
                <div class="tweet-reply">
                <div class="tweet-inner">
                    <img src="${reply.profilePic}" class="profile-pic">
                        <div>
                            <p class="handle">${reply.handle}</p>
                            <p class="tweet-text">${reply.tweetText}</p>
                        </div>
                    </div>
            </div>
            `
            })

        }


        feedHtml += `
        <div class="tweet">
            <div class="tweet-inner">
                <img src="${tweet.profilePic}" class="profile-pic">
                <div>
                    <p class="handle">${tweet.handle}</p>
                    <p class="tweet-text">${tweet.tweetText}</p>
                    <div class="tweet-details">
                        <span class="tweet-detail">
                            <i 
                            class="fa-regular fa-comment-dots"
                            data-replies = "${tweet.uuid}"
                            ></i>
                            ${tweet.replies.length}
                        </span>
                        <span class="tweet-detail">
                            <i 
                            class="fa-solid fa-heart ${likeIconClass}"
                            data-like="${tweet.uuid}"
                            
                            ></i>
                            ${tweet.likes}
                        </span>
                        <span class="tweet-detail">
                            <i 
                            class="fa-solid fa-retweet ${retweetedIconClass}"
                            data-retweet="${tweet.uuid}"
                            ></i>
                            ${tweet.retweets}
                        </span>
                    </div>   
                </div>            
            </div>
            <div class="hidden" id="replies-${tweet.uuid}">
                ${repliesHtml}
            </div>

        </div>
        `
    } )
    return feedHtml
    
}

function render(){
    document.getElementById("feed").innerHTML = getFeedHtml();
}
render()