//I think it would be cool to write a function that can act as a reference for the developer.  As I imagine it, during the development the developer puts a Four.Help function in global scope, and can then pass different strings to it to find out different things about the particular scene being worked on or the frameworks in general.

Four.Help.prototype = {
	generic: function() {
		var s = "I'm sorry, but the query you have entered does not seem to be valid.  Try 'help' for details."

		console.log(s)
	},
	help: function() {
		var s = "Here are the currently supported queries:\n\n"
		for(var prop in this.__proto__) {
			if(prop === 'generic') continue
			s += prop + "\n"
		}
		console.log(s)
	},
	scene: function() {
		var s = 'The children in this scene are: '
		s += Four.Arrangement.scene
		console.log(s)
	}

}
