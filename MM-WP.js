let request = require('request');
/* global Module */

/* Magic Mirror
 * Module: MM Reddit Posts
 *
 * By Mike Truax
 * MIT Licensed.
 */

Module.register("MM-WP", {

	// Default module config.
	defaults: {
		numPosts: 5,
		startPost: 15
	},


	// Define start sequence.
	start: function () {
		Log.info("Starting module: " + this.name);
		if (!config.numPosts) {
			config.numPosts = this.defaults.numPosts;
		}
		if (!config.startPost) {
			config.startPost = this.defaults.startPost;
		}
	},
	getStyles: function () {
		return ["MMM-WP.css"];
	},


	// Override dom generator.
	getDom: function () {
		let wrapper = document.createElement("div");
		let list = document.createElement('ul');

		
		let wrapper = document.createElement('div');
		let list = document.createElement('ul');
		wrapper.appendChild(list);
		let self = this;
		request('https://www.reddit.com/r/writingprompts/hot.json', (err, res) => {
			let posts = JSON.parse(res.body).data.children
			posts = posts.slice(self.config.startPost, self.config.startPost + self.config.numPosts)
			posts.forEach((v, i) => {
				let listItem = document.createElement('li');
				v.replace(/\[WP\]/gi, "")
				listItem.innerText = `${i + 1}: ${v.data.title}`
				list.appendChild(listItem);
			})
		})
		return wrapper;
	}

});
