define( [
		'./js/properties',
		'./js/d3'
	],
	function ( props , d3 ) {
		'use strict';


		return {
			definition: props,
			initialProperties: {
				qHyperCubeDef: {
					qDimensions: [],
					qMeasures: [],
					qInitialDataFetch: [
						{
							qWidth: 10,
							qHeight: 100
						}
					]
				}
			},




			// Paint/Rendering logic
			paint: function ( $element, layout ) {
			// Main rendering logic goes here

				var hc = layout.qHyperCube;
				console.log ('-------------------------')
				console.log ('Version 1')
				console.log ('-------------------------')
				console.log ('$element: ',$element)
				console.log ('-------------------------')
				console.log ('# of Dimensions: ',hc.qDimensionInfo.length)
				console.log ('# of Meaures: ',hc.qMeasureInfo.length)
				console.log ('-------------------------')
				console.log ('Number of Rows Returned: ',hc.qDataPages[0].qMatrix.length)
				console.log ('Number of Columns Returned: ',hc.qDataPages[0].qMatrix[0].length)
				console.log ('-------------------------')
				console.log ('Data returned: ',hc)
				console.log ('-------------------------')



				// *****************************************************************************
				// Convert the sense hypercube to D3 data array
				// *****************************************************************************
				var dataset = dataExtractF(layout); // Call the function below to extract the data
				console.log ('data: ',dataset)



				// *****************************************************************************
				// Define the element here
				// *****************************************************************************

				var canvas_id  = "chartcontainer_" + layout.qInfo.qId ;
				var ext_width = $element.width(), ext_height = $element.height();


				console.log ('-------------------------')
				console.log ('canvas_id: ',canvas_id)
				console.log ('ext_width: ',ext_width)
				console.log ('ext_height: ',ext_height)


				if (document.getElementById(canvas_id)) { // Check element exists. If it does empty it ready for repopulation. If not create it.
						$("#" + canvas_id).empty();
					}
				else {
					$element.append($('<div />;').attr("id", canvas_id).width(ext_width).height(ext_height));
				}
				console.log ('canvas_id: ',canvas_id)
				console.log ('-------------------------')



				// *****************************************************************************
				// Define the element here. We didn't have to pass d3 when used on Aviva (my be a server difference?)
				// *****************************************************************************
				d3ChartInitialRender(d3,dataset,layout,ext_width,ext_height,canvas_id);



			}
		};
	} );

// ********************************************************************************************************************************************
// ********************************************************************************************************************************************
// ********************************************************************************************************************************************
// ********************************************************* ADDITIONAL FUNCTIONS *************************************************************
// ********************************************************************************************************************************************
// ********************************************************************************************************************************************
// ********************************************************************************************************************************************


function dataExtractF(l) {  // Function taken from branch. (need to dysect). Not perfect need to use .qNum for the measures!
	var t = null;
	if (l.qHyperCube && l.qHyperCube.qDataPages[0].qMatrix) {  // Think this checks if data exists
		var t = [],
			r = 0,
			n = l.qHyperCube.qDataPages[0].qMatrix.length;
		l.qHyperCube.qDataPages[0].qMatrix.forEach(function(l) {  // Looks like a loop. Not sure how t gets populated
			var i = [];
			//i.push(l[0].qText), i.push([l[1].qNum, l[1].qText]), t.push(i), r++
			i.push(l[0].qText), i.push(l[1].qNum), t.push(i), r++
		});
	}
	return t
}



var d3ChartInitialRender = function(d3,dataset ,layout ,w ,h ,canvas_id) {


	console.log("HelloD3")
	console.log ('-------------------------')
	console.log('dataset: ',dataset);
	console.log('layout: ',layout);
	console.log('w: ',w);
	console.log('h: ',h);
	console.log('canvas_id: ',canvas_id);


	var yPadding = 40, xPadding = 70;


// Sales !! ***************************************************************
	var yScale = d3.scaleLinear()
				.domain([0, d3.max(dataset, function(d) { return d[1]; })])
				.range([h-yPadding,yPadding]); // inverted


	var xScale = d3.scaleBand()
				.domain(dataset.map(function(d) { return d[0]; }))
				.rangeRound([xPadding,w-xPadding])
				.paddingInner(0.05);


// Select SVG !! ***************************************************************
	var svg = d3.select("#"+canvas_id)
				.append("svg")
				.attr("width", w)
				.attr("height", h);


// Chart !! ***************************************************************
var bars = svg.selectAll("rect")
		.data(dataset)
		.enter()
		.append("rect")
		.attr("x",function(d,i){return xScale(d[0]);} )
	  .attr("y", function(d) {
			return Math.round(yScale(d[1]))  ;
	    })
		.attr("width",xScale.bandwidth() )
		.attr("height", function(d) {
			   		return h - yPadding - Math.round(yScale(d[1]));
			})
		.attr("fill","teal");



// Axis !! ***************************************************************
		var xAxis = d3.axisBottom()
					.scale(xScale);

	  var yAxis = d3.axisLeft()
					.scale(yScale);

		svg.append("g")
			.attr("class","axis")
			.attr("transform","translate(0," + (h - yPadding) + ")")
			.call(xAxis);

			svg.append("g")
				.attr("class","axis")
				.attr("transform","translate(" + xPadding + ",0)")
				.call(yAxis);
// Axis XX ***************************************************************



}
