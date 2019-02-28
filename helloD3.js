define( [
		'./js/properties',
		'./js/d3.min'
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
				console.log ('Version 9')
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
				var dataset = dataExtractF(layout); // Call the function below
				console.log ('data: ',dataset)		
				
				
				/* 	This code is saved for later exploration!	
				var qMatrix = layout.qHyperCube.qDataPages[0].qMatrix;
				var data = qMatrix.map(function(d) {
							return {
								"Metric1":d[1].qNum
							}
				});
				console.log ('qMatrix: ',qMatrix)
				console.log ('data: ',data)
				 */


				
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
				// Define the element here
				// *****************************************************************************				
				d3ChartInitialRender(dataset,layout,ext_width,ext_height,canvas_id);
				
				
				
				
				
						

				//$element.append(); // Draw the defined element on the page


			}
		};
	} );

	
	
	
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


	
var d3ChartInitialRender = function(dataset ,layout ,w ,h ,canvas_id) {
	console.log("HelloD3")
	
	// Declare Empty Global Variabes here
	//var dataset =[5,10,15,25,22,1,4]; 
	//var w = 500, h = 400;
	console.log ('-------------------------')
	console.log('dataset: ',dataset);
	console.log('layout: ',layout);
	console.log('w: ',w);
	console.log('h: ',h);
	console.log('canvas_id: ',canvas_id);

	/*
			<<<< data set is different now. a dimension and a 
	*/
	

	var	bp = 2;
	var padding = 40;
	//var dataset =[5,10,15,25,22,1,4]; 
	

	
/*   
	var svg = d3.select("body")
				.append("svg")
				.attr("width",w)
				.attr("height",h);

     */
	
	var svg = d3.select("#"+canvas_id)
				.append("svg")
				.attr("width", w)
				.attr("height", h);
				
	

/* 	var para = svg.selectAll("p")
				.data(dataset)
				.enter()
				.append("p")
				.text(function(d) {
				return "here's some data " + d[0] + " and " + d[1];
				}); */

				
	// BROKEN HERE, WORKS WHEN THE SCALE VAR ISN@T SET!!!!!!		
	console.log ('-------------------------')
	console.log('max: ',d3.max(dataset, function(d) { return d[1]; }));
	
//	var yScale = d3.scaleLinear()
//				.domain([0, d3.max(dataset, function(d) { return d[1]; })])
//				.range([0, h]);
				
	var yScale = d3.scaleLinear()
			.domain([0, 14424656])
			.range([0, 766]);			


	console.log ('-------------------------')
	//console.log('yScale: ',yScale);
	console.log('max: ',d3.max(dataset, function(d) { return d[1]; }));
				
	
 	var bars = svg.selectAll("rect")
		.data(dataset)
		.enter()
		.append("rect")
		.attr("x",function(d,i){return i * (w / dataset.length);} )
	    .attr("y", function(d) {
			return h - d[1];
	    })
		.attr("width",function(d,i){return (w / dataset.length)-bp;} )
		.attr("height", function(d) {
			   		return d[1];
		});
		//.attr("fill","teal"); 



			

			
/* 	svg.selectAll("text")
		.data(dataset)
		.enter()
		.append("text")
		.text(function(d){
			return d;
			})
		.attr("x",function(d,i){return i * (w / dataset.length)+  (((w / dataset.length)-bp)/2)    ;} )  // added the width of the bar divided by 2
		
		//.attr("y",function(d){return h-(d*4)+15;}) 
		//.attr("y",100)  // 100 is the svg h and its flush to the base
		.attr("y",function(d) {
				var ry = 10;
				if (d < 5)  // if the d value is < 5 then move the label up above the bar. Also change the color from white to black (below)
					{ry = h-(d*4)-5;} 
				else 
					{ry = h-(d*4)+15;} ;	
				return ry;
				})
		
		.attr("font-family","sans-serif")
		.attr("fill",function(d) {
				var rv = 10;
				if (d < 5) 
					{rv = "black";} 
				else 
					{rv = "white";} ;	
				return rv;
				})
		.attr("font-size","11px")
		.attr("text-anchor","middle") */
	

}
	
	