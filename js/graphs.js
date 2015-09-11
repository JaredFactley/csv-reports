function addGraph(data) {
	var graphCanvas = $('<canvas/>').attr({
		id: "graph-canvas",
		width: "400",
		height: "400"
	});
	$('#result-graph').append(graphCanvas);
	var ctx = $("#graph-canvas").get(0).getContext("2d");
	var newGraph = new Chart(ctx);
	var graphData = getBarData(data);
}

// Method to create the necessary data structure for charts.js bar chart
function getBarData(data) {
	var dSet = function dSet(){
		var dSet = {
			label: "Label",
			fillColor: "rgba(220,220,220,1)",
			strokeColor: "rgba(220,220,220,1)",
			highlightFill: "rgba(220,220,220,1)",
			highlightStroke: "rgba(220,220,220,1)",
			data: []
		}
		return dSet;
	};
	var graphData = {
		labels: [],
		datasets: var dSet = new dSet();
	}
	console.log(graphData[datasets]);
}