// make class selection
ICONPATH = "https://happyquack.github.io/GloomhavenModifierDeck/images/classIcons/";

classSelectionBox = document.getElementById('classSelectionBoxId');
classSelectionBox.innerHTML = "";

classIconImgs = []
for (i = 0; i < 18; i++) {
 num = i + 1;
 if (num < 10) {num = "0" + num;}
 classIconImgs.push(document.createElement('img'));
 classIconImgs[i].src = ICONPATH + num + "icon.png";
}

imageSideLength = classSelectionBox.offsetWidth/6 * 4/5;
classSelectionBox.style.paddingLeft = imageSideLength;
classSelectionBox.style.paddingRight = imageSideLength;
for (let [index, image] of classIconImgs.entries()) {
 //image.style.position = "absolute";
 //image.style.top = Math.floor(index/6)*imageSideLength + "px";
 //image.style.left = (index%6)*imageSideLength + "px";
 image.width = imageSideLength + "";
 image.height = imageSideLength + "";
 image.padding = imageSideLength/8 = "";
 classSelectionBox.appendChild(image);
}
