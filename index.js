let winston = require("winston");
let fs = require("fs");
let byt = require('byt');
winston.transports.DailyRotateFile = require("winston-daily-rotate-file");
let modifyConfigureRotation = (dailyRotateObj) => {
    dailyRotateObj._created = 1;   
    dailyRotateObj.isfilenameHasExpired = false;
    //
    // ### @private function _filenameHasExpired ()
    // Checks whether the current log file is valid
    // based on given datepattern
    //
    dailyRotateObj._filenameHasExpired = function () {
        // searching for m is enough to say minute in date pattern
      if (dailyRotateObj.datePattern.match(/m/)) {
            dailyRotateObj.isfilenameHasExpired = (dailyRotateObj._year < dailyRotateObj._getTime('year') || dailyRotateObj._month < dailyRotateObj._getTime('month') || dailyRotateObj._date < dailyRotateObj._getTime('date') || dailyRotateObj._hour < dailyRotateObj._getTime('hour') || dailyRotateObj._minute < dailyRotateObj._getTime('minute'));
        } else if (dailyRotateObj.datePattern.match(/H/)) {
            dailyRotateObj.isfilenameHasExpired = (dailyRotateObj._year < dailyRotateObj._getTime('year') || dailyRotateObj._month < dailyRotateObj._getTime('month') || dailyRotateObj._date < dailyRotateObj._getTime('date') || dailyRotateObj._hour < dailyRotateObj._getTime('hour'));
        } else if (dailyRotateObj.datePattern.match(/d/)) {
            dailyRotateObj.isfilenameHasExpired = (dailyRotateObj._year < dailyRotateObj._getTime('year') || dailyRotateObj._month < dailyRotateObj._getTime('month') || dailyRotateObj._date < dailyRotateObj._getTime('date'));
        } else if (dailyRotateObj.datePattern.match(/M/)) {
            dailyRotateObj.isfilenameHasExpired = (dailyRotateObj._year < dailyRotateObj._getTime('year') || dailyRotateObj._month < dailyRotateObj._getTime('month'));
        } else if (dailyRotateObj.datePattern.match(/yy/)) {
            dailyRotateObj.isfilenameHasExpired = (dailyRotateObj._year < dailyRotateObj._getTime('year'));
        }
        return dailyRotateObj.isfilenameHasExpired;
      };
      
      //
      // ### @private function _getTime ()
      // Get current date/time
      // based on localTime config
      //
      dailyRotateObj._getTime = function (timeType) {
        var now = new Date();
        if (dailyRotateObj.localTime) {
          if (timeType === 'year') {
            return now.getFullYear();
          } else if (timeType === 'month') {
            return now.getMonth();
          } else if (timeType === 'date') {
            return now.getDate();
          } else if (timeType === 'hour') {
            return now.getHours();
          } else if (timeType === 'minute') {
            return now.getMinutes();
          } else if (timeType === 'day') {
            return now.getDay();
          }
        }
        if (timeType === 'year') {
          return now.getUTCFullYear();
        } else if (timeType === 'month') {
          return now.getUTCMonth();
        } else if (timeType === 'date') {
          return now.getUTCDate();
        } else if (timeType === 'hour') {
          return now.getUTCHours();
        } else if (timeType === 'minute') {
          return now.getUTCMinutes();
        } else if (timeType === 'day') {
          return now.getUTCDay();
        }
      };
    
    dailyRotateObj._getFile = function () {
        var filename = dailyRotateObj._getFilename();       
        if (dailyRotateObj.isfilenameHasExpired === true) {
          dailyRotateObj._created = 1;
          dailyRotateObj.isfilenameHasExpired = false;          
        } else if(dailyRotateObj.maxsize && dailyRotateObj._size >= dailyRotateObj.maxsize){
            dailyRotateObj._created += 1;          
        }
        let file = filename.split(".") ? filename.split(".") : "log";
        if (file.length === 2) {
            let newFileName = dailyRotateObj._created ? file[0] + '-' + dailyRotateObj._created + "." + file[1] : filename;  
            return newFileName;
        } else {
            filename = filename.replace(".", "-");
            let file = filename.split(".") ? filename.split(".") : "log";
            let newFileName = dailyRotateObj._created ? file[0] + '-' + dailyRotateObj._created + "." + file[1] : filename;  
            return newFileName;
        }
      }
    return dailyRotateObj;
}

let createInstance = (options) => {
 if (options.hasOwnProperty("size")) {
    let size = byt(options.size); 
    delete options["size"];
    options.maxsize = size;
  }
 let instance = new (winston.transports.DailyRotateFile)(options);
 return modifyConfigureRotation(instance);
};
module.exports = {
  createInstance: createInstance
};
