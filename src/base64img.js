import EXIF from './exif';

var base64img = {
    option: {
        quality: 1,
        size: 1
    },
    img: new Image(),
    video: document.createElement('video'),
    canvas: document.createElement('canvas'),
    getVideoBase64(src, option = {}) {
        return new Promise((resolve, reject) => {
            Object.assign(this.option, option);
            this.video.src = src;
            this.video.addEventListener('canplay', (e) => {
                const ctx = this.canvas.getContext('2d');
                const imgHeight = this.video.videoHeight * this.option.size;
                const imgWidth = this.video.videoWidth * this.option.size;
                this.canvas.width = imgWidth;
                this.canvas.height = imgHeight;
                ctx.drawImage(this.video, 0, 0, imgWidth, imgHeight);
                resolve(this.canvas.toDataURL('image/jpeg', this.option.quality));
            })
        })
    },
    getImgBase64(src, option = {}) {
        return new Promise((resolve, reject) => {
            Object.assign(this.option, option);
            this.img.src = src;
            this.img.onload = () => {
                let Orientation = null;
                const ctx = this.canvas.getContext('2d');
                const width = this.img.width * this.option.size;
                const height = this.img.height * this.option.size;
                EXIF.getData(this.img, () => {
                    Orientation = EXIF.getTag(this.img, 'Orientation');
                    if (Orientation === undefined) {
                        Orientation = 1;
                    }

                    if (Orientation === 6) {
                        this.canvas.width = height;
                        this.canvas.height = width;
                        ctx.translate(height, 0);
                        ctx.rotate(Math.PI / 2);
                        ctx.drawImage(this.img, 0, 0, width, height);
                    } else if (Orientation === 8) {
                        this.canvas.width = height;
                        this.canvas.height = width;
                        ctx.translate(0, width);
                        ctx.rotate(-Math.PI / 2);
                        ctx.drawImage(this.img, 0, 0, width, height);
                    } else if (Orientation === 3) {
                        this.canvas.width = width;
                        this.canvas.height = height;
                        ctx.translate(width, height);
                        ctx.rotate(Math.PI);
                        ctx.drawImage(this.img, 0, 0, width, height);
                    } else if (Orientation === 1) {
                        this.canvas.width = width;
                        this.canvas.height = height;
                        ctx.drawImage(this.img, 0, 0, width, height);
                    }
                    resolve(this.canvas.toDataURL('image/jpeg', this.option.quality));
                });
            };
        })
    }
}

export default base64img
