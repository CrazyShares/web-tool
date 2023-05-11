/**
 * 图片加水印
 * @param {String} url 图片的地址
 * @param {String} textAlign 文本居中方式
 * @param {String} textBaseline 文本基准线方式
 * @param {String} font 文本字体
 * @param {String} fillStyle 填充文本颜色
 * @param {String} content 填充文本内容
 * @param {Function} cb callback函数
 * @param {Number} textX 填充的起始位置X
 * @param {Number} textY 填充的起始位置Y
 * @param {Number} angle 文本旋转角度   以顺时针为准（0-360）
 * @param {Number} intervalY 文本上下间距   以文本高度为1倍
 * @param {Number} intervalX 文本左右间距   以文本宽度为1倍
 */
const __picWM = function ({
    url = "",
    textAlign = "center",
    textBaseline = "middle",
    font = "14px Microsoft Yahei",
    fillStyle = "rgba(0, 0, 0, .2)",
    content = "水印",
    cb = null,
    textX = 0,
    textY = 0,
    angle = 330,
    intervalY = 12,
    intervalX = 1.5,
} = {}) {
    const img = new Image();
    img.src = url;
    img.crossOrigin = "anonymous";
    img.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");

        ctx.drawImage(img, 0, 0);
        ctx.textAlign = textAlign;
        ctx.textBaseline = textBaseline;
        ctx.font = font;
        ctx.fillStyle = fillStyle;
        let fontSize = ctx.font.split(" ")[0].replace("px", "");
        // const textWidth = fontSize * content.length;
        const textWidth = ctx.measureText(content).width;
        const textHeight = Number(fontSize);
        ctx.rotate((angle * Math.PI) / 180); // 转换成弧度
        const offsetY = intervalY * textHeight
        const offsetX = offsetY * Math.tan((angle * Math.PI) / 180)
        for (let i = 0; i < Math.ceil(Math.abs(canvas.height / Math.cos((angle * Math.PI) / 180)) / (offsetY)) + 1; i++) {
            // ctx.fillText(content, 0, i * 20);
            for (
                let index = 0;
                index < Math.ceil(Math.abs(canvas.width / Math.cos((angle * Math.PI) / 180)) / (intervalX * textWidth)) + 1; // 计算需要循环的次数
                index++
            ) {
                ctx.fillText(content, textX, textY);
                textX += intervalX * textWidth;
            }
            textX = 0 + i * offsetX;
            textY += offsetY;
        }

        const base64Url = canvas.toDataURL();
        cb && cb(base64Url);
    };
}

export {
    __picWM,
}