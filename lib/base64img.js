"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _exif = _interopRequireDefault(require("./exif"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var base64img = {
  option: {
    quality: 1,
    size: 1
  },
  img: new Image(),
  video: document.createElement('video'),
  canvas: document.createElement('canvas'),
  getVideoBase64: function getVideoBase64(src) {
    var _this = this;

    var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return new Promise(function (resolve, reject) {
      Object.assign(_this.option, option);
      _this.video.src = src;

      _this.video.addEventListener('canplay', function (e) {
        var ctx = _this.canvas.getContext('2d');

        var imgHeight = _this.video.videoHeight * _this.option.size;
        var imgWidth = _this.video.videoWidth * _this.option.size;
        _this.canvas.width = imgWidth;
        _this.canvas.height = imgHeight;
        ctx.drawImage(_this.video, 0, 0, imgWidth, imgHeight);
        resolve(_this.canvas.toDataURL('image/jpeg', _this.option.quality));
      });
    });
  },
  getImgBase64: function getImgBase64(src) {
    var _this2 = this;

    var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return new Promise(function (resolve, reject) {
      Object.assign(_this2.option, option);
      _this2.img.src = src;

      _this2.img.onload = function () {
        var Orientation = null;

        var ctx = _this2.canvas.getContext('2d');

        var width = _this2.img.width * _this2.option.size;
        var height = _this2.img.height * _this2.option.size;

        _exif["default"].getData(_this2.img, function () {
          Orientation = _exif["default"].getTag(_this2.img, 'Orientation');

          if (Orientation === undefined) {
            Orientation = 1;
          }

          if (Orientation === 6) {
            _this2.canvas.width = height;
            _this2.canvas.height = width;
            ctx.translate(height, 0);
            ctx.rotate(Math.PI / 2);
            ctx.drawImage(_this2.img, 0, 0, width, height);
          } else if (Orientation === 8) {
            _this2.canvas.width = height;
            _this2.canvas.height = width;
            ctx.translate(0, width);
            ctx.rotate(-Math.PI / 2);
            ctx.drawImage(_this2.img, 0, 0, width, height);
          } else if (Orientation === 3) {
            _this2.canvas.width = width;
            _this2.canvas.height = height;
            ctx.translate(width, height);
            ctx.rotate(Math.PI);
            ctx.drawImage(_this2.img, 0, 0, width, height);
          } else if (Orientation === 1) {
            _this2.canvas.width = width;
            _this2.canvas.height = height;
            ctx.drawImage(_this2.img, 0, 0, width, height);
          }

          resolve(_this2.canvas.toDataURL('image/jpeg', _this2.option.quality));
        });
      };
    });
  }
};
var _default = base64img;
exports["default"] = _default;