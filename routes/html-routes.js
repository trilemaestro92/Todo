// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
const path = require('path');


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
      });

      // app.get('/socket', function(req, res) {
      //   res.sendFile(path.join(__dirname, '../public/index.html'));
      // });

}

