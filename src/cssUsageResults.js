//
// Prepare the whole instrumentation world
//
void function() {
	
	var ua = navigator.userAgent;
	var uaName = ua.indexOf('Edge')>=0 ? 'EDGE' :ua.indexOf('Chrome')>=0 ? 'CHROME' : 'FIREFOX';
	window.INSTRUMENTATION_RESULTS = {
		UA: uaName,
		UASTRING: ua,
		URL: location.href,
		TIMESTAMP: Date.now(),
		css: {/*  see CSSUsageResults  */},
		dom: {}
	};
	window.INSTRUMENTATION_RESULTS_TSV = [];
	
	/* make the script work in the context of a webview */
	try {
		var console = window.console || (window.console={log:function(){},warn:function(){},error:function(){}});
		console.unsafeLog = console.log;
		console.log = function() {
			try {
				this.unsafeLog.apply(this,arguments);
			} catch(ex) {
				// ignore
			}
		};
	} catch (ex) {
		// we tried...
	}
	
}();

window.onCSSUsageResults = function onCSSUsageResults(CSSUsageResults) {

	// Convert it to a more efficient format
	INSTRUMENTATION_RESULTS.css = CSSUsageResults;
	INSTRUMENTATION_RESULTS_TSV = convertToTSV(INSTRUMENTATION_RESULTS);
	
	var tsvString = INSTRUMENTATION_RESULTS_TSV.map((row) => (row.join('\t'))).join('\n');
	if(window.debugCSSUsage) console.log(tsvString);
	
	// Add it to the document dom
	var output = document.createElement('script');
	output.id = "css-usage-tsv-results";
	output.textContent = tsvString;
    output.type = 'text/plain';
    document.querySelector('head').appendChild(output);

	/** convert the instrumentation results to a spreadsheet for analysis */
	function convertToTSV(INSTRUMENTATION_RESULTS) {
		
		var VALUE_COLUMN = 4;
		var finishedRows = [];
		var currentRowTemplate = [
			INSTRUMENTATION_RESULTS.UA,
			INSTRUMENTATION_RESULTS.UASTRING,
			INSTRUMENTATION_RESULTS.URL,
			INSTRUMENTATION_RESULTS.TIMESTAMP,
			0
		];
		
		currentRowTemplate.push('css');
		convertToTSV(INSTRUMENTATION_RESULTS['css']);
		currentRowTemplate.pop();
		
		currentRowTemplate.push('dom');
		convertToTSV(INSTRUMENTATION_RESULTS['dom']);
		currentRowTemplate.pop();
		
		var l = finishedRows[0].length;
		finishedRows.sort((a,b) => {
			for(var i = VALUE_COLUMN+1; i<l; i++) {
				if(a[i]<b[i]) return -1;
				if(a[i]>b[i]) return +1;
			}
			return 0;
		});
		
		return finishedRows;
		
		/** helper function doing the actual conversion */
		function convertToTSV(object) {
			if(object==null || object==undefined || typeof object == 'number' || typeof object == 'string') {
				finishedRows.push(new Row(currentRowTemplate, ''+object));
			} else {
				for(var key in object) {
					if({}.hasOwnProperty.call(object,key)) {
						currentRowTemplate.push(key);
						convertToTSV(object[key]);
						currentRowTemplate.pop();
					}
				}
			}
		}
		
		/** constructor for a row of our table */
		function Row(currentRowTemplate, value) {
			
			// Initialize an empty row with enough columns
			var row = [
				/*UANAME:     edge                            */'',
				/*UASTRING:   mozilla/5.0 (...)               */'',
				/*URL:        http://.../...                  */'',
				/*TIMESTAMP:  1445622257303                   */'',
				/*VALUE:      0|1|...                         */'',
				/*DATATYPE:   css|dom|...                     */'',
				/*SUBTYPE:    props|types|api|...             */'',
				/*NAME:       font-size|querySelector|...     */'',
				/*CONTEXT:    count|values|...                */'',
				/*SUBCONTEXT: px|em|...                       */'',
				/*...                                         */'',
				/*...                                         */'',
			];
			
			// Copy the column values from the template
			for(var i = currentRowTemplate.length; i--;) {
				row[i] = currentRowTemplate[i];
			}
			
			// Add the value to the row
			row[VALUE_COLUMN] = value;
			
			return row;
		}

	}

};