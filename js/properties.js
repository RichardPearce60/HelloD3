define( [], function () {
	'use strict';
	// *****************************************************************************
	// Dimensions & Measures
	// *****************************************************************************
	var dimensions = {
		uses: "dimensions"
	};
	var measures = {
		uses: "measures"
	};
	// *****************************************************************************
	// Further section
	// *****************************************************************************
  




	// *****************************************************************************
	// Main properties panel definition
	// Only what is defined here is returned from properties.js
	// *****************************************************************************
	return {
		type: "items",
		component: "accordion",
		items: {
			dimensions: dimensions,
			measures: measures
		}
	};
});
