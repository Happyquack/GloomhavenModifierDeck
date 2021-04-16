 // make class selection

PAGEWIDTH = window.innerWidth;
PAGEHEIGHT = window.innerHeight;
ICONPATH = "https://happyquack.github.io/GloomhavenModifierDeck/images/classIcons/";

classSelectionBox = document.getElementById('classSelectionBoxId');
classSelectionBox.innerHTML = "If you can see me then yay";

classIconImgs = []
for (i = 0; i < 18; i++) {
 num = i + 1;
 if (num < 10) {num = "0" + num;}
 classIconImgs.push(document.createElement('img'));
 classIconImgs[i].src = ICONPATH + num + "icon.png";
}

imageSideLength = classSelectionBox.offsetWidth/7;
classSelectionBox.style.paddingLeft = imageSideLength;
classSelectionBox.style.paddingRight = imageSideLength;
for (let [index, image] of classIconImgs.entries()) {
 //image.style.position = "absolute";
 //image.style.top = Math.floor(index/6)*imageSideLength + "px";
 //image.style.left = (index%6)*imageSideLength + "px";
 image.width = imageSideLength + "";
 image.height = imageSideLength + "";
 classSelectionBox.appendChild(image);
}
