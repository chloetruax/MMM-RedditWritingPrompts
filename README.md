# Reddit Writing Prompts Module

Simple magic mirror module that pulls a set number of posts from r/WritingPrompts. This was written to allow ideally 5 posts but could show more to get your creating brain going.



## Example With 5 Posts
![ExamplePosts](./MMM-RedditWritingPrompts.PNG)

## Configuration

``` javascript
{
    module: "MMM-RedditWritingPrompts",
    position: "top-left", //position,
    numPosts: 5, // number of posts to show. Defaults to 5
    startPost: 15 // Post to start with, defaults to 15. Bear in mind any stickied posts
},
```