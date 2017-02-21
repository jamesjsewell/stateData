//global variables
var legislators = {}
var sourceData = {}
var names = []

//takes data recieved from request and passes it off to be processed
function handle_response(apiResponse){

	var dataObj = apiResponse
	process_data(dataObj)

}

//takes data from the source and repackages it
function process_data(dataObj) {
	
	var legislatorsArray = dataObj.results
	sourceData = dataObj.results

	var currentLegislator = {}

	for(var i = 0; i < legislatorsArray.length; i++){

		var attributes = legislatorsArray[i], 
		name = {name: attributes.first_name + " " + attributes.last_name, content: {first: attributes.first_name, last: attributes.last_name}, tag:"h1", class: "title"}, 
		position = {content: attributes.chamber + " " + attributes.party + " " + attributes.state, tag: "h2", class: "subtitle"}, 
		email = {content: "email: " + attributes.oc_email, tag: "li", class: "list"}, 
		website = {content: "website: " + attributes.website, tag: "li", class: "list"}, 
		twitter = {content: "twitter: " + attributes.twitter_id, tag: "li", class: "list"}, 
		phone = {content: "phone: " + attributes.phone, tag: "li", class: "list"}, 
		term = {content: "term end " + attributes.term_end, tag: "p", class: "term"}
		
		var entry = name.content.first+"_"+name.content.last

		var currentLegislator = {name: name, position: position, email: email, website: website, twitter: twitter, phone: phone, term: term}
		legislators[entry] = currentLegislator
		names.push(currentLegislator.name.content.first + "_" + currentLegislator.name.content.last)

	}

	build_html()

}

//takes re-packaged data and applies is it to the page
function build_html(){

	var legislatorNode = "<div class = 'legislator'>"

	var objProperties = ["name", "position", "email", "website", "twitter", "phone", "term"]

	var allLegislatorNodes = "<div class = 'container'>"

	for(var i in names){	

		var theLegislator = legislators[names[i]]
		var nodes = ""
		var ulNode = ""
		var lastNode = ""

		for(var property in objProperties){
			
			var attribute = theLegislator[objProperties[property]]

			if(attribute.content){

				if (attribute.class === "title"){
					var legislatorAttributeNode = create_node(attribute.tag, attribute.class, attribute.content, attribute.name)
				}
				else{
					var legislatorAttributeNode = create_node(attribute.tag, attribute.class, attribute.content, "")
				}

				if (attribute.class === "list"){
	
					ulNode += legislatorAttributeNode
					}

				if (attribute.class === "name"){
	
					nodes += legislatorAttributeNode
					}

				if (attribute.class === "term"){

					lastNode += legislatorAttributeNode
					}

				if (attribute.class != "term" && attribute.class != "list"){
					
					nodes += legislatorAttributeNode
					}

				}

			}	
		allLegislatorNodes += legislatorNode + nodes + "<ul class = attributesList>" + ulNode + "</ul>" + lastNode + "</div>"

		}
	
	var fullHTML = allLegislatorNodes + "</div>"
	modify_page(fullHTML)

	}


//creates an html string 
function create_node(tag, selector, content, name){
	
	if(name){
		var newNode = "<" + tag + " " + "class = " + "'" + selector + "'" + ">" + name + "</" + tag + ">"
	}
	else{
		var newNode = "<" + tag + " " + "class = " + "'" + selector + "'" + ">" + content + "</" + tag + ">"
	}

	return newNode
}

//adds the generated html to the page
function modify_page(fullHTML){

	var bodyNode = document.querySelector("body")
	var legislatorsContainer = document.createElement("div")
	legislatorsContainer.innerHTML = fullHTML
	bodyNode.appendChild(legislatorsContainer)
}

//request data from congress.api and do something with it
var promise = $.getJSON('https://congress.api.sunlightfoundation.com/legislators') 
promise.then(handle_response)
