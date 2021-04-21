const mongoose = require('mongoose'); 
const Campsite = require('./models/campsite');  

const url = 'mongodb://localhost:27017/nucampsite';
const connect = mongoose.connect(url, {
    useCreateIndex: true,  
    useFindAndModify: false,
    useNewUrlParser: true, 
    useUnifiedTopology: true
}); 

connect.then(() => {
    console.log('connected correctly to server'); 

    Campsite.create({
       name: 'React Lake CampGround', 
       description: 'test' 
    })

    // will tell us that the save documnet is saved or delected. 
    .then(campsite => {
        console.log(campsite); 
        return Campsite.findByIdAndUpdate(campsite._id, {
            $set: { description: 'Update Test Document' } 
        }, {
            new: true
        }); 
    }) 
    .then(campsite => {
        console.log(campsite); 

        campsite.comments.push({
            rating: 5, 
            text: 'What a magnificent view!', 
            author: 'Tinus Lorvaldes'
        }) 
        return campsite.save();
    })
    .then(campsite => {
        console.log(campsite); 
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