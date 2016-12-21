//this goes in file ptR_worker.js

//3 create a module that invokes linter and converts it's output to the format that ace can understand

var validate = function(input) {
    return [ { row: 0, column: 0, text: "MyMode says Hello!", type: "error" } ];
};

define(function(require, exports, module) { 
  "use strict"; 
  var oop = require("ace/lib/oop"); 
  var Mirror = require("ace/worker/mirror").Mirror; 
  //var lint = require("./my_language/lint"); 
  
  var PtrWorker = exports.PtrWorker = function(sender) { 
  Mirror.call(this, sender); 
  this.setTimeout(500); 
  this.setOptions(); 
  }; 
  
  // Mirror is a simple class which keeps main and webWorker versions of the document in sync
  oop.inherits(PtrWorker, Mirror); 

  (function() { 
    this.onUpdate = function() { 
      var value = this.doc.getValue();
      if (!value)
            return this.sender.emit("annotate", []); 
        var errors = []; 
        console.log("I hope this will trigger");
        //var errorOne = { line1:"1", character:"0", message:"hello", type:"error" };
        //var results = [errorOne]; // lint(value); 
//        for (var i = 0; i < results.length; i++) { 
//            var error = results[i]; 
            // convert to ace gutter annotation 
            errors.push({ 
                row: 3, // must be 0 based 
                column: 0,  // must be 0 based 
                text: "hello my dear friends",  // text to show in tooltip 
                type: "error" 
            }); 
 //       } 
        this.sender.emit("annotate", errors); 
      // send value to server
    /*
      var params={};
      params['_method']='lint';
      params['_callback']=function(reponse){
        // receive value from server and process  annotations.
        var errors = []; 
        var results = response.lints;
        for (var i = 0; i < results.length; i++) { 
          var error = results[i]; 
          // convert to ace gutter annotation 
          errors.push({ 
            row: error.line, // must be 0 based 
            column: error.character,  // must be 0 based 
            text: error.message,  // text to show in tooltip 
            type: error.type //One of "error"|"warning"|"info" 
          }); 
        }
        this.sender.emit("annotate", errors); 
      };
      params['value']=value;
      //send request with value to the server
      api.call(params);
      */
    };

  }).call(PtrWorker.prototype); 
});

