/**
 * Created by HaberMic on 10/3/15.
 */

var models = require('../db/models.js');

module.exports = function(router){

    router.get('/items', function (req,res) {
            models.Item.find({}, function(err, data){

                if(err) throw err;

                res.status(200).json(data);

            });
    });

    router.post('/item', function (req, res) {

        var item = new models.Item({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,

            createTime: req.body.createTime,
            lastUpdateTime: req.body.lastUpdateTime,

            price: req.body.price
        });

        item.save(function(err,data){
            if(err) {
                res.status(500).json({err: err});
            } else {
                res.status(200).json({newItem : data});
            }
        })
    })

    router.delete('/item?:id', function (req, res) {
        models.Item.findOne({_id : req.query.id}).remove().exec(function (err, result) {

            if(err){

              return  res.status(500).json({reason: err});
            } else {

                res.status(200).json({status: result });
            }
        })
    })

}