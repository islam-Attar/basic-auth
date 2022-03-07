'use strict';

function validator(req, res, next) {
  
    
    const name = req.query.name;

      if (name) {
        
          next();
      } else {
          next(`there is no query`)
      }
  
}

module.exports = validator;