const ListingController = require('./controller.js')

module.exports=(app)=>{

    


    app.put('/update', ListingController.update);
    app.post('/create', ListingController.create);
    app.delete('/del',ListingController.del);
    app.get('/view', ListingController.view);

}