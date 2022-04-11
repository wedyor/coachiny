const MemberRouter=require('./member');
const TrainerRouter=require('./trainer');
const UserRouter= require('./user');
const plansRouter = require('./plans');

module.exports=(app)=>{
	app.get('/',function(req,res){
		res.send({
			'message':'Our first endpoint'
		});
	});

	//Member Routes
	app.use('/auth',MemberRouter);
	app.use('/profile',MemberRouter);

	//Trainer Router
	app.use('/auth/trainer',TrainerRouter);
	app.use('/trainer/profile',TrainerRouter);
	
	//Plans Routes
	app.use('/user',UserRouter);
	app.use('/plan',plansRouter);

}