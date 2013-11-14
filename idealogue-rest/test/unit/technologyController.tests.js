var assert = require('assert'),
	_ = require('underscore'),
	Controller = require('../../lib/controllers/technologyController.js');

describe ('technology controller', function(){

	describe ('constructor()', function(){

		it ('should return a Controller object', function(done) {

			//Arrange
			var config = getMockConfig();
			
			//Act
			var controller = new Controller(config);

			//Arrange
			assert(controller);
			assert(controller instanceof Controller);
			done();
		});

	});

	describe ('routes property', function() {

		it ('should return an array of routes', function(done) {

			//Arrange
			var config = getMockConfig();
			var controller = new Controller(config);

			
			//Act
			var routes = controller.getRoutes();

			//Assert
			assert(routes, 'routes should exist');
			assert(_.isArray(routes), 'routes should be an array');
			routes.forEach(function(route) {
				assert(_.isObject(route), 'the route should be an object');
				assert(_.isString(route.method), 'the route method should be set correctly');
				assert(_.isFunction(route.handler), 'the route handler should be set correctly');
			});
			
			done();

		});
	});
	
});

function getMockConfig() {
	return {
		//TODO: add mock config entries here
	};
}
