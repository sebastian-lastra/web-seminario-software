var express = require('express');
 
var routes = function(Sucursal){
	 
	var sucursalRouter = express.Router();
	
	var sucursalController = require('../controllers/sucursalController')(Sucursal);

	sucursalRouter.route('/')
		.post(sucursalController.post)
		.get(sucursalController.get);


	sucursalRouter.use('/:sucursalId', async function(req, res, next){
		
		var sucursalToFind = new sucursal();

		sucursalToFind._id = req.params.sucursalId;

		var sucursal = await sucursal.findOne(sucursalToFind);
		
		if (sucursal) {
				
			req.sucursal = sucursal;
			
			next();
			
		}
		else {
			
			res.status(404).send('no sucursal found');
			
		}
		
	});
	
	sucursalRouter.route('/:sucursalId')
		.get(function(req, res){
			
			var returnSucursal = req.sucursal.toJSON();
			
			res.json(returnSucursal );
			
		})
		.put(async function(req, res){
			
			req.sucursal._id = req.body._id;

			req.sucursal.sucursalCodigo = req.body.sucursalCodigo;
					
			req.sucursal.sucursalNombre = req.body.sucursalNombre;
			
			req.sucursal.sucursalDescripcion = req.body.sucursalDescripcion;

			var sucursalToFind = new sucursal();

			sucursalToFind._id = req.sucursal._id;

			var result = await Sucursal.updateOne(sucursalToFind, req.sucursal);
			
			if (!result.acknowledged) {
			
				res.status(500).send('sucursal no modificado');
			
			}
			else {
			
				res.status(200).send('sucursal modificado');
		
			}
			
		})
		.patch(async function(req, res){

			var sucursalToFind = new Sucursal();

			sucursalToFind._id = req.body._id;

			if (req.body._id) {
				
				delete req.body._id;
				
			}

			var result = await Sucursal.findOneAndUpdate(sucursalToFind, req.body, {
				includeResultMetadata: true
			});

			if (result.ok === 0) {
			
				res.status(500).send('sucursal no modificado');
			
			}
			else {
			
				res.json(req.body);
		
			}
			
		})
		.delete(async function(req, res){
			
			var sucursalToFind = new Sucursal();

			sucursalToFind._id = req.Sucursal._id;

			var result = await Sucursal.deleteOne(sucursalToFind);
			
			if (!result.acknowledged) {
			
				res.status(500).send('sucursal no eliminado');
			
			}
			else {
			
				res.status(200).send('sucursal eliminado');
		
			}
			
		});
			
		 return sucursalRouter;
	 
 };
 
 module.exports = routes;