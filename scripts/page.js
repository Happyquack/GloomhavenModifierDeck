 // make class selection

PAGEWIDTH = window.innerWidth;
PAGEHEIGHT = window.innerHeight;
ICONPATH = "https://happyquack.github.io/GloomhavenModifierDeck/images/classIcons/";

classSelectionBox = document.getElementById('classSelectionBoxId');
classSelectionBox.innerHTML = "If you can see me then yay";
classSelection01 = document.createElement('img');
classSelection01.src = ICONPATH + "01icon.png";
classSelection02 = document.createElement('img');
classSelection02.src = ICONPATH + "02icon.png";
classSelection03 = document.createElement('img');
classSelection03.src = ICONPATH + "03icon.png";
classSelection04 = document.createElement('img');
classSelection04.src = ICONPATH + "04icon.png";
classSelection05 = document.createElement('img');
classSelection05.src = ICONPATH + "05icon.png";
classSelection06 = document.createElement('img');
classSelection06.src = ICONPATH + "06icon.png";
classSelection07 = document.createElement('img');
classSelection07.src = ICONPATH + "07icon.png";
classSelection08 = document.createElement('img');
classSelection08.src = ICONPATH + "08icon.png";
classSelection09 = document.createElement('img');
classSelection09.src = ICONPATH + "09icon.png";
classSelection10 = document.createElement('img');
classSelection10.src = ICONPATH + "10icon.png";
classSelection11 = document.createElement('img');
classSelection11.src = ICONPATH + "11icon.png";
classSelection12 = document.createElement('img');
classSelection12.src = ICONPATH + "12icon.png";
classSelection13 = document.createElement('img');
classSelection13.src = ICONPATH + "13icon.png";
classSelection14 = document.createElement('img');
classSelection14.src = ICONPATH + "14icon.png";
classSelection15 = document.createElement('img');
classSelection15.src = ICONPATH + "15icon.png";
classSelection16 = document.createElement('img');
classSelection16.src = ICONPATH + "16icon.png";
classSelection17 = document.createElement('img');
classSelection17.src = ICONPATH + "17icon.png";
classSelection18 = document.createElement('img');
classSelection18.src = ICONPATH + "18icon.png";
classIconImgs = [classSelection01, classSelection02, classSelection03, 
                 classSelection04, classSelection05, classSelection06, 
                 classSelection07, classSelection08, classSelection09, 
                 classSelection10, classSelection11, classSelection12,
                 classSelection13, classSelection14, classSelection15,
                 classSelection16, classSelection17, classSelection18];
imageSideLength = PAGEWIDTH/8;
classSelectionBox.style.paddingLeft = imageSideLength;
classSelectionBox.style.paddingRight = imageSideLength;
for (let [index, image] of classIconImgs.entries()) {
 image.style.position = "absolute";
 image.style.top = floor(index/6)*imageSideLength;
 image.style.left = (index%6)*imageSideLength;
 classSelectionBox.appendChild(image);
}
