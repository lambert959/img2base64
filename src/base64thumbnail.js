(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.base64img = factory());
}(this, function () {
    'use strict';
    var base64img = function (src, options = {}) {
        var _options = {
            quality: 1,
            size: 1,
            format: 'image/jpeg'
        };
        Object.assign(_options, options)
        if (src.match(/(.png|.jpeg|.jpg|.gif)$/)) {
            return getImgBase64(src, _options);
        } else {
            return getVideoBase64(src, _options);
        }
    };
    
    var getVideoBase64 = function(src, options = {}) {
        var video = document.createElement('video');
        var canvas = document.createElement('canvas');
        return new Promise((resolve, reject) => {
            video.src = src
            video.addEventListener('canplay', (e) => {
                const ctx = canvas.getContext('2d');
                const imgHeight = video.videoHeight * options.size;
                const imgWidth = video.videoWidth * options.size;
                canvas.width = imgWidth;
                canvas.height = imgHeight;
                ctx.drawImage(video, 0, 0, imgWidth, imgHeight);
                resolve(canvas.toDataURL(options.format, options.quality))
            })
        })
    };
    var getImgBase64 = function(src, options = {}) {
        var img = new Image();
        var canvas = document.createElement('canvas');
        return new Promise((resolve, reject) => {
            img.src = src;
            img.onload = () => {
                let Orientation = null;
                const ctx = canvas.getContext('2d');
                const width = img.width * options.size;
                const height = img.height * options.size;
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL(options.format, options.quality));
            };
        })
    };

    return base64img;
}));
