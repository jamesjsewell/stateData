//global variables
var legislators = {}

//takes data recieved from request and passes it off to be processed
function handle_response(apiResponse){
	console.log('got data')
	var dataObj = apiResponse
	process_data(dataObj)

}

//takes data from the source and repackages it
function process_data(dataObj) {
	
	var legislatorsArray = dataObj.results

	for(var i = 0; i < legislatorsArray.length; i++){
		


	}

	build_html(processed)

}

//takes re-packaged data and applies is it to the page
function build_html(processed){

	var finalHTML = ""

}

//request data from congress.api and do something with it
var promise = $.getJSON('https://congress.api.sunlightfoundation.com/legislators') 
promise.then(handle_response)
