module.exports = function(app, express, mongoose, cons, swig, MongoStore,path, i18n){

	app.use(express.static(path.join(__dirname, 'public')));
	app.use(express.logger('dev'));
	app.use(express.bodyParser());	   //?
	app.use(express.methodOverride()); //?

  //conf i18n
   i18n.expressBind(app, {
        locales: ['es', 'en'],
        extension: '.js',
        directory: './locales'
    });

	//conf engine swig
	app.engine('.html', cons.swig);
    app.set('view engine', 'html');
    swig.init({
        root: __dirname + '/views',
        allowErrors: true // allows errors to be thrown and caught by express instead of suppressed by Swig
    });
	//conf MongoDB
	var uristring = 
    process.env.MONGOLAB_URI || 
    process.env.MONGOHQ_URL || 
    'mongodb://localhost/horariosDB';
	//conf Sesiones	
	app.use(express.cookieParser());
	app.use(express.session({
      store: new MongoStore({
        url: uristring
      }),
      secret: 'SECURE'
    }));
    //conectando a MongoDB
	 mongoose.connect(uristring, function (err, res) {
        if (err) { 
          console.log ('ERROR connecting to: ' + uristring + '. ' + err);
        } else {
          console.log ('Succeeded connected to: ' + uristring);
        }
    });
	
};