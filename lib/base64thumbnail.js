"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global = global || self, global.base64img = factory());
})(void 0, function () {
  'use strict';

  var base64img = function base64img(src) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _options = {
      quality: 1,
      size: 1,
      format: 'image/jpeg'
    };
    Object.assign(_options, options);

    if (src.match(/(.png|.jpeg|.jpg|.gif)$/)) {
      return getImgBase64(src, _options);
    } else {
      return getVideoBase64(src, _options);
    }
  };

  var getVideoBase64 = function getVideoBase64(src) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var video = document.createElement('video');
    var canvas = document.createElement('canvas');
    return new Promise(function (resolve, reject) {
      video.src = src;
      video.addEventListener('canplay', function (e) {
        var ctx = canvas.getContext('2d');
        var imgHeight = video.videoHeight * options.size;
        var imgWidth = video.videoWidth * options.size;
        canvas.width = imgWidth;
        canvas.height = imgHeight;
        ctx.drawImage(video, 0, 0, imgWidth, imgHeight);
        resolve(canvas.toDataURL(options.format, options.quality));
      });
    });
  };

  var getImgBase64 = function getImgBase64(src) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var img = new Image();
    var canvas = document.createElement('canvas');
    return new Promise(function (resolve, reject) {
      img.src = src;

      img.onload = function () {
        var Orientation = null;
        var ctx = canvas.getContext('2d');
        var width = img.width * options.size;
        var height = img.height * options.size;
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL(options.format, options.quality));
      };
    });
  };

  return base64img;
});