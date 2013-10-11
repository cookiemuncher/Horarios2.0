module.exports = function(models, app){

	 this.panelGet = function(req, res){
        
        res.render('./panel',{
        	isAdmin: req.session.isAdmin,
        	data: req.session.user
        });
    };

    return this;
}
