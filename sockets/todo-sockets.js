const db = require('../models');


module.exports = function(io){
    io.on('connection', function(socket){

        socket.on('new-item', function(newItem){
            console.log(newItem)
            db.list.create(newItem)
            .then(function (data) { 
            io.emit("emit-task", data) 
            })     
        })

        socket.on('remove-item', function(newitem){
            console.log("------------")
            io.emit('removed-task', newitem)
        })
        
        socket.on('edit-item', function(newitem){
            io.emit('edit-task', newitem)
        })
        
        socket.on('edit-text', function(newitem){
            
            console.log(newitem)
            io.emit('edited-text', newitem)
        })
    })
};

