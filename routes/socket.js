var messageController = require('../controllers/message');

// export function for listening to the socket
module.exports = function (socket) {

  // send the new user their name and a list of users
  //socket.emit('init', {
  //  name: name,
  //  users: userNames.get()
  //});

  // broadcast a user's message to other users
  socket.on('send:message', function (data) {
    socket.broadcast.emit('send:message', {
      message: data
    });
  });


};