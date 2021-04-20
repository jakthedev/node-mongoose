const mongoose = require('mongoose'); 
const Campsite = require('./models/campsite');  

const url = 'mongobd://localhost:27017/nucampsite';
const connect =mogoose.connect(url, {
    useCreateIndex: true, 
    useNewUrlParser: true, 
    useUnifiedTopology: true
}); 

connect.then(() => {
    console.log('connected correctly to server'); 

    const newCampsite = new Campsite({
       name: 'React Lake CampGround', 
       description: 'test' 
    }); 

    // will tell us that the save documnet is saved or delected. 
    newCampsite.save() 
    .then(campsite => {
        console.log(campsite); 
        return Campsite.find(); 
    }) 
    .then(campsites => {
        console.log(campsites); 
        return Campsite.deleteMany(); 
    })
    .then(() => {
        return mongoose.connections.close();
    })
    .catch(err => {
        console.log(err); 
        mongoose.connections.close();
    })
});