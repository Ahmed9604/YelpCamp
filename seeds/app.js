const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const {places , descriptors} = require('./seedshelp')

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() *array.length)]

const seeds = async()=> {
    await Campground.deleteMany();
    for (let i = 0; i <500; i++) {
        const random = Math.floor(Math.random() *1000)
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            author : "65771dc3d60d190279e66b91",
            location : `${cities[random].city},${cities[random].state}`,
            title : `${sample(descriptors)},${sample(places)}`,
            description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus, aliquam dolorum! Expedita voluptatum voluptas aspernatur non, consequatur deleniti dolorem, vero saepe asperiores libero corrupti suscipit molestiae ducimus illum neque labore.",
            price,
            geometry : { 
                type: 'Point', 
                coordinates: [ 
                    cities[random].longitude,
                    cities[random].latitude,
                 ] 
            },
            images: [
              {
                  url: 'https://res.cloudinary.com/dlbfbnx2q/image/upload/v1702477163/cld-sample-2.jpg',
                  filename: 'YelpCamp/ahfnenvca4tha00h2ubt'
              },
              {
                  url: 'https://res.cloudinary.com/dlbfbnx2q/image/upload/v1702477163/cld-sample-2.jpg',
                  filename: 'YelpCamp/ruyoaxgf72nzpi4y6cdi'
              }
          ]
         
        })
        await camp.save();
    }

}

seeds().then(()=>{
    mongoose.connection.close();
})