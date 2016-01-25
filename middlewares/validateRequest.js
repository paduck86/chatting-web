var jwt = require('jsonwebtoken');
// 프로퍼티파일
var nconf = require('nconf');
nconf.argv().env();
nconf.file({ file: 'config.json' }); 

module.exports = function(req, res, next) {

  var token = req.headers['x-access-token'];
  var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];
  var secret = nconf.get("jwtSecret");

  if (token || key) {
    try {
      var decoded = jwt.decode(token, secret);
      req.body._id = decoded._doc._id;
	  req.body.email = decoded._doc.email;
	  if(req.body.email == 'admin@admin.com') {
		req.body.role = 'admin'; 
	  }else{
		req.body.role = 'user';
	  }
	  //console.log('~~~::'+decoded._doc.email);	
	  //console.log('decoded:'+JSON.stringify(decoded));

	  // role check [TO-BE]
	  //if ((req.url.indexOf('admin') >= 0 && dbUser.role == 'admin') || (req.url.indexOf('admin') < 0 && req.url.indexOf('/api/v1/') >= 0)) {
	  next(); // To move to next middleware

 
    } catch (err) {
      res.status(500);
      res.json({
        "status": 500,
        "message": "Oops something went wrong",
        "error": err
      });
    }
  } else {
	//if(req.url.substring(0,10) != '/api/login') {
	//	res.status(401);
	//	res.json({
	//	  "status": 401,
	//	  "message": "Invalid Token or Key"
	//	});
	//	return;
	//}else{
		next();
	//}
  }
};