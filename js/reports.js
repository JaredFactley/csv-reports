reportList = [
	"Raw Trade Details",
	"Top Counterparts",
	"Top Currencies",
	"Top Funds",
	"Top Locations",
	"Top Traders"
];

// Method that checks which report was chosen and passes the data set to the function to generate the report
function generateReport(report, data) {
	$("#result-table").empty();
	$("#result-graph").empty();
	if (report == "Raw Trade Details") {
		var html = rawTrades(data);
		$("#result-table").html(html);
		return;
	}
	else if (report == "Top Counterparts") {
		var criteria = "INST";
	}
	else if (report == "Top Currencies") {
		var criteria = "BUYCCY";
	}
	else if (report == "Top Funds") {
		var criteria = "FUND";
	}
	else if (report == "Top Locations") {
		var criteria = "LOC";
	}
	else if (report == "Top Traders") {
		var criteria = "TRADER";
	}
	var html = topX(data, criteria);
	$("#result-table").html(html);
};

// Method that calculates the total USD trade vol per criteria passed in
function topX(data, criteria) {
	var counter = new Object();
	for (var row in data) {
		var splitUser = data[row].USER.split(".");
		data[row].LOC = splitUser[0];
		data[row].INST = splitUser[1];
		data[row].TRADER = splitUser[2];
		if (typeof counter[data[row][criteria]] === 'undefined') {
			counter[data[row][criteria]] = 0;
		}
		counter[data[row][criteria]] = +counter[data[row][criteria]] + +data[row].BUYAMT;
	}
	var html = createTable(counter, criteria);
	addGraph(counter);
	return html;
};

// Method that creates html for a table based on the object passed in
function createTable(data, heading1, heading2) {
	var html = '';
	heading1 = heading1 || "Criteria";
	heading2 = heading2 || "Total USD Trade Vol";
	html += '<tr>\r\n';
	html += '<th>' + heading1 + '</th><th>' + heading2 + '</th>';
	html += '</tr>\r\n';
	for(var item in data) {
		html += '<tr>';
		html += '<td>' + item + '</td><td>' + data[item] + '</td>';
		html += '</tr>';
	}
	return html;
};

// Method that generates the raw trade data table and passes the formatted HTML back to the DOM
function rawTrades(data) {
	var html = '';

	if(typeof(data[0]) === 'undefined') {
	      return null;
    }


    if(data[0].constructor === String) {
      html += '<tr>\r\n';
      for(var item in data) {
        html += '<td>' + data[item] + '</td>\r\n';
      }
      html += '</tr>\r\n';
    }

    if(data[0].constructor === Array) {
      for(var row in data) {
        html += '<tr>\r\n';
        for(var item in data[row]) {
          html += '<td>' + data[row][item] + '</td>\r\n';
        }
        html += '</tr>\r\n';
      }
    }

    if(data[0].constructor === Object) {
    	html += '<tr>\r\n';
		for(var heading in data[0]) {
			html += '<th>' + heading + '</th>\r\n';
		}
		html += '<tr>\r\n';
      	for(var row in data) {
        	html += '<tr>\r\n';
        	for(var item in data[row]) {
          		html += '<td>' + data[row][item] + '</td>\r\n';
        	}
        	html += '</tr>\r\n';
      	}
    }
    
    return html;
};