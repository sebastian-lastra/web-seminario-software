var sucursalController = function(sucursal) {
	
	var post = async function(req, res){
		var sucursal = new sucursal(req.body);
		await sucursal.save();
		res.status(200).send('sucursal agregada');
	};
	
	
	var get = async function(req, res){
			
		var query = {};
		
		var sucursals = await sucursal.find(query);

		var returnsucursals = [];
				
		sucursals.forEach(function(element){
			
			var newsucursal = element.toJSON();
			
			newsucursal.links = {};
			
			newsucursal.links.self = 'http://' + req.headers.host + '/api/sucursal/' + newsucursal._id;
			
			returnsucursals.push(newsucursal);
			
		});
		
		res.json(returnsucursals);
		
	};
	
	return {
		
		post: post,
		
		get: get
		
	};
	
};

module.exports = sucursalController;