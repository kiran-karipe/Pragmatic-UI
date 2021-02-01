const menuItems = ["Text", "Text Color", "Text Size", "Text Align", "Blend", "Blend Alpha"];
const placeholders = ["Enter your text", "(e.g. fff or red)", "A number (e.g.25)", "top,middle,bottom,left,center,right", "(e.g. fff or red)", "Range [1 - 100]"];
const verticalTextAlign = ["top", "bottom", "middle"];
const horizontalTextAlign = ["left", "center", "right"];
let prevTextAlign1 = '', prevTextAlign12 = '';
let prevAlignClass = 'bottom-left';
const textAlignInputElement = document.getElementById('text align');
let textArr =[];

onLoad();

function onLoad() {
    const menuList = document.createElement("ul");
    menuList.addEventListener('keyup',handleInputChange);
    menuList.classList.add('menuList');
    for(let i=0; i<menuItems.length; i++) {
        const menuItem = document.createElement("li");
        menuItem.classList.add('menuListItem');
        const label = document.createElement("label");
        label.appendChild(document.createTextNode(menuItems[i]));
        const inputElement = document.createElement("input");
        inputElement.setAttribute('id', menuItems[i].toLowerCase());
        inputElement.setAttribute('placeholder', placeholders[i]);
        menuItem.appendChild(label);
        inputElement.classList.add('inputElement');
        menuItem.appendChild(inputElement);
        menuList.appendChild(menuItem);
    }
    menuList.appendChild(blendModeDropdown());
    document.getElementById('sideMenuId').appendChild(menuList);
}

function handleInputChange(event) {
    const textHolder = document.getElementById('textHolder');
    if(event.target.id === 'text') {
        let txt = encodeURI(event.target.value);
        textHolder.innerHTML = decodeText(txt);
    } else if(event.target.id === 'text color') {
        textHolder.style.color = event.target.value;
    } else if(event.target.id === 'text size') {
        textHolder.style.fontSize = event.target.value+"px";
    } 
}

function decodeText(txt) {
    return decodeURI(txt);
}

function blendModeDropdown() {
    const blendModes = ["normal", "color", "burn", "dodge", "darken", "difference", "exclusion", "hardlight", "hue", "lighten",
                        "luminosity", "multiply", "overlay", "saturation", "screen", "softlight"];
    const menuItem = document.createElement("li");
    const label = document.createElement("label");
    label.textContent = "Blend Mode";
    const selectElement = document.createElement("select");
    selectElement.setAttribute('id','blendModesId');
    selectElement.setAttribute('name', 'blendmodes');
    for(let i=0; i<blendModes.length; i++) {
        const optionElement = document.createElement("option");
        optionElement.setAttribute("value", blendModes[i]);
        optionElement.textContent = blendModes[i];
        selectElement.appendChild(optionElement);
    }
    selectElement.classList.add('inputElement');
    menuItem.appendChild(label);
    menuItem.appendChild(selectElement);
    menuItem.classList.add("menuListItem");
    return menuItem;
}

textAlignInputElement.addEventListener('keyup', function(event) {
    const temp = event.target.value.split(/[\s,]+/);
    let inputElementArr = [];
    for(let i=0; i<temp.length; i++) {
        if(temp[i] !== "") {
            inputElementArr.push(temp[i]);
        }
    }
    if (textArr.length > inputElementArr.length) {
        for(let i=0; i<inputElementArr.length; i++) {
            if(inputElementArr.indexOf(prevTextAlign1) === -1) {
                prevTextAlign1 = '';
            }
            if(inputElementArr.indexOf(prevTextAlign2) === -1) {
                prevTextAlign2 = '';
            }
        }
    } else {
        prevTextAlign1 = '';
        prevTextAlign2 = '';
    }
    textArr.length = 0;
    for(let i=0; i<inputElementArr.length; i++) {
        if(verticalTextAlign.indexOf(inputElementArr[i]) > -1 || horizontalTextAlign.indexOf(inputElementArr[i]) > -1) {
            textArr.push(inputElementArr[i]);
        }
    }
    if(textArr.length === inputElementArr.length){
        handleTextAlignment(textArr);
    }
});

function handleTextAlignment(value) {
    let textClass = '';
    const textElement = document.getElementById('textHolder');
    if (textElement.classList.contains(prevAlignClass)) {
        textElement.classList.remove(prevAlignClass);
    }
    for(let i=0; i<value.length; i++) {
        if(!prevTextAlign1 && verticalTextAlign.indexOf(value[i]) > -1) {
            prevTextAlign1 = value[i];
        } else if(!prevTextAlign2 && horizontalTextAlign.indexOf(value[i]) > -1) {
            prevTextAlign2 = value[i];
        }
    }
    
    if(!prevTextAlign1 && prevTextAlign2) {
        textClass = 'bottom-'+prevTextAlign2;
    } else if (prevTextAlign1 && !prevTextAlign2) {
        textClass = prevTextAlign1+'-left';
    } else if(prevTextAlign1 && prevTextAlign2) {
        textClass = prevTextAlign1+'-'+prevTextAlign2;
    }
    if (textClass) {
        textElement.classList.add(textClass);
        prevAlignClass = textClass;
    } 
}

document.getElementById('blendModesId').onchange = function(event) {
    const backgroundImageElement = document.getElementById('backgroundImageId');
    const style = document.createElement('style');
    style.innerHTML = `.backgroundBlendMode { background-blend-mode: ${event.target.value}; }`;
    document.getElementsByTagName('head')[0].appendChild(style);
    backgroundImageElement.classList.add('backgroundBlendMode');
}

document.getElementById('blend').onchange = function(event) {
    const backgroundImageElement = document.getElementById('backgroundImageId');
    backgroundImageElement.style.backgroundColor = event.target.value;
}

document.getElementById('blend alpha').onchange = function(event) {
    const backgroundImageElement = document.getElementById('backgroundImageId');
    backgroundImageElement.style.opacity = event.target.value/100;
}
