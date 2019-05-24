/* global Module */

/* Magic Mirror
 * Module: MM Reddit Posts
 *
 * By Mike Truax
 * MIT Licensed.
 */

Module.register("MMM-RedditWritingPrompts", {

	// Default module config.
	defaults: {
		numPosts: 5,
		startPost: 15
	},
	posts: [],

	// Define start sequence.
	start: function () {
		Log.info("Starting module:" + this.name);
		if (!config.numPosts) {
			config.numPosts = this.defaults.numPosts;
		}
		if (!config.startPost) {
			config.startPost = this.defaults.startPost;
		}
		let self = this;
		fetch('https://www.reddit.com/r/writingprompts/hot.json')
		.then(res=> res.json())
		.then(json=> json.data.children)
		.then(posts=> posts.slice(self.config.startPost, self.config.startPost + self.config.numPosts))
		.then(posts=>{
			posts.forEach((v, i) => {
				let title = v.data.title;
				title = title.replace(/\[WP\]/gi, "")
				self.posts.push(title);
			})
			self.updateDom();
		})
	},
	getStyles: function () {
		return ["MM-WP.css"];
	},


	// Override dom generator.
	getDom: function () {
		Log.info(this.posts);
		let wrapper = document.createElement("div");
		wrapper.classList.add("WP-container");
		this.posts.forEach((v,i)=>{
			let listItem = document.createElement('div');
			listItem.classList.add("list-item");
			listItem.innerText = `${i+1}: ${v}`
			wrapper.appendChild(listItem);
		})
		return wrapper;
	}

});
