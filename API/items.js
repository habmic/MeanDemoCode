/**
 * Created by HaberMic on 10/3/15.
 */
var mongoose = require('mongoose');


module.exports = function (router) {

    router.get('/items', function (req, res) {

        if(!req.session){
            req.status(200).json({});
            return;
        }

        res.status(200).json(req.session.items);

    });

    router.post('/item', function (req, res) {

        var item = {
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            _id:mongoose.Types.ObjectId(),

            createTime: req.body.createTime,
            lastUpdateTime: req.body.lastUpdateTime,

            price: req.body.price
        };

        if (req.session.items) {
            req.session.items.push(item);
        } else {
            req.session.items = [item];
        }

        res.status(201).json(req.session.items);
    })

    router.delete('/item?:id', function (req, res) {

        if (req.session.items) {

            var items = req.session.items;

            for(var i = 0; i < items.length; i++){
                if(items[i]._id == req.query.id){
                    req.session.items.splice(i,1);
                    break;
                }
            }

            res.status(200).json( req.session.items);


        } else {
            return res.status(200).json({reason: 'no items'});
        }

    })

}