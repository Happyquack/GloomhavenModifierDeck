 // make class selection

PAGEWIDTH = window.innerWidth;
PAGEHEIGHT = window.innerHeight;
ICONPATH = "../images/classIcons/";

classSelectionBox = document.getElementById("classSelectionBox");
classSelection01 = classSelectionBox.createElement('img');
classSelection01.src = ICONPATH + "01icon.png";
classSelection02 = classSelectionBox.createElement('img');
classSelection02.src = ICONPATH + "02icon.png";
classSelection03 = classSelectionBox.createElement('img');
classSelection03.src = ICONPATH + "03icon.png";
classSelection04 = classSelectionBox.createElement('img');
classSelection04.src = ICONPATH + "04icon.png";
classSelection05 = classSelectionBox.createElement('img');
classSelection05.src = ICONPATH + "05icon.png";
classSelection06 = classSelectionBox.createElement('img');
classSelection06.src = ICONPATH + "06icon.png";
classSelection07 = classSelectionBox.createElement('img');
classSelection07.src = ICONPATH + "07icon.png";
classSelection08 = classSelectionBox.createElement('img');
classSelection08.src = ICONPATH + "08icon.png";
classSelection09 = classSelectionBox.createElement('img');
classSelection09.src = ICONPATH + "09icon.png";
classSelection10 = classSelectionBox.createElement('img');
classSelection10.src = ICONPATH + "10icon.png";
classSelection11 = classSelectionBox.createElement('img');
classSelection11.src = ICONPATH + "11icon.png";
classSelection12 = classSelectionBox.createElement('img');
classSelection12.src = ICONPATH + "12icon.png";
classSelection13 = classSelectionBox.createElement('img');
classSelection13.src = ICONPATH + "13icon.png";
classSelection14 = classSelectionBox.createElement('img');
classSelection14.src = ICONPATH + "14icon.png";
classSelection15 = classSelectionBox.createElement('img');
classSelection15.src = ICONPATH + "15icon.png";
classSelection16 = classSelectionBox.createElement('img');
classSelection16.src = ICONPATH + "16icon.png";
classSelection17 = classSelectionBox.createElement('img');
classSelection17.src = ICONPATH + "17icon.png";
classSelection18 = classSelectionBox.createElement('img');
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
for (let [index, image] of classIconImgs) {
 image.style.position = "absolute";
 image.style.top = floor(index/6)*imageSideLength;
 image.style.left = (index%6)*imageSideLength;
 classSelectionBox.appendChild(image);
}
