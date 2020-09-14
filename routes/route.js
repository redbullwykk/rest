const express = require('express');
const router = express.Router();

const Restaurant = require('../models/restaurants');


//retrieving restaurants
router.get('/restaurants', (req, res, next)=>{
    //res.send('Retrieving the restaurant list');
    Restaurant.find(function(err, restaurants){
        res.json(restaurants);
    })
});

//retrieving a single restaurant
router.get('/restaurant-info/:id', (req, res, next) =>{
    Restaurant.find({_id: req.params.id}, function(err, result){
        if(err){
            res.json({msg: 'Failed to retrieve restaurant'});
        }
        else{
            res.json(result);
           // res.json({msg: 'Successfully retrieved restaurant'});
        }
    })
});

//add restaurant
router.post('/restaurant', (req, res, next)=>{
    //logic to add restaurant
    let newRestaurant = new Restaurant({
        restaurant_name: req.body.restaurant_name,
        phone: req.body.phone,
        address: req.body.address
    });

    if (newRestaurant.restaurant_name != null && newRestaurant.restaurant_name != ''){
        newRestaurant.save((err, restaurant)=>{
            if(err){
                res.json({msg: 'Failed to add restaurant'});
            }
            else{
                res.json({msg: 'Restaurant added successfully'});
            }
        })
    }
    else{
        res.json({msg: 'Restaurant name cannot be blank'});
    }
});

//delete restaurant
router.delete('/restaurant/:id', (req, res, next)=>{
    //logic to delete restaurant
    Restaurant.deleteOne({_id: req.params.id}, function(err, result){
        if(err){
            res.json(err);
        }
        else{
            res.json(result);
        }
    });
});

//update restaurant 
router.put('/restaurant/update/:id', (req, res, next)=>{
    if(req.body.restaurant_name != null && req.body.restaurant_name != ''){
        Restaurant.updateOne(
            {
                //get the id of restaurant to update that one particular restaurant information
                _id: req.params.id
            },
            {
                $set: {
                    //get value from user input
                    restaurant_name: req.body.restaurant_name,
                    phone: req.body.phone,
                    address: req.body.address
                }
            },
            function(err, result){
                if(err){
                    res.json(err);
                }
                else{
                    res.json(result);
                }
            }
        )
    }
    else{
        res.json({msg: 'Restaurant name cannot be empty'});
    }
});


module.exports = router;