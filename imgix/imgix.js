const menuItems = ["Text", "Text Color", "Text Size", "Text Align", "Blend", "Blend Alpha"];
const placeholders = ["Enter your text", "(e.g. fff or red)", "A number (e.g.25)", "top,middle,bottom,left,center,right", "(e.g. fff or red)", "Range [1 - 100]"];
const textAlign1 = ["top", "bottom", "middle"]; // Change array names
const textAlign2 = ["left", "center", "right"];
let prev1 = '', prev2 = '';
let prevClass = 'bottom-left';
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
        inputElement.setAttribute('id', menuItems[i].toLowerCase()); //change id case
        inputElement.setAttribute('placeholder', placeholders[i]);
        menuItem.appendChild(label);
        // if(menuItems[i] === 'Text Align') {
        //     const textAlignInputContainer = document.createElement("div");
        //     textAlignInputContainer.setAttribute('id', 'textAlignId');
        //     textAlignInputContainer.appendChild(inputElement);
        //     textAlignInputContainer.appendChild(textAlignDropdown());
        //     menuItem.appendChild(textAlignInputContainer);
        // } else {
        //     inputElement.classList.add('inputElement');
        //     menuItem.appendChild(inputElement);
        // }
        inputElement.classList.add('inputElement');
            menuItem.appendChild(inputElement);
        menuList.appendChild(menuItem);
    }
    menuList.appendChild(blendModeDropdown());
    document.getElementById('sideMenuId').appendChild(menuList);
}
onLoad();

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

// function textAlignDropdown() {
//     const textAlignValues= ["top", "bottom", "middle", "left", "center", "right"]; // change array name
//     const textAlignList = document.createElement("ul");
//     textAlignList.setAttribute('id','textAlignDropdownId');
//     for(let i=0; i<textAlignValues.length; i++) {
//         const textAlignElement = document.createElement("li");
//         textAlignElement.appendChild(document.createTextNode(textAlignValues[i]));
//         textAlignElement.classList.add('textAlignElement');
//         textAlignList.appendChild(textAlignElement);
//     }
//     textAlignList.classList.add('textAlignDropdown', 'hide');
//     return textAlignList;
// }
// const textAlignDropdownElement = document.getElementById('textAlignDropdownId')
const textAlignInputElement = document.getElementById('text align');
// textAlignInputElement.addEventListener('click', function(event) {
//     event.stopPropagation();
//     textAlignDropdownElement.classList.toggle('hide');
// });
let textArr =[];
textAlignInputElement.addEventListener('keyup', function(event) {  // add all handlers in similar way
    const temp = event.target.value.split(/[\s,]+/);
    let inputElementArr = [];
    for(let i=0; i<temp.length; i++) {
        if(temp[i] !== "") {
            inputElementArr.push(temp[i]);
        }
    }
    if (textArr.length > inputElementArr.length) {
        for(let i=0; i<inputElementArr.length; i++) {
            if(inputElementArr.indexOf(prev1) === -1) {
                prev1 = '';
            }
            if(inputElementArr.indexOf(prev2) === -1) {
                prev2 = '';
            }
        }
    } else {
        prev1 = '';
        prev2 = '';
    }
    textArr.length = 0;
    for(let i=0; i<inputElementArr.length; i++) {
        if(textAlign1.indexOf(inputElementArr[i]) > -1 || textAlign2.indexOf(inputElementArr[i]) > -1) {
            textArr.push(inputElementArr[i]);
        }
    }
    if(textArr.length === inputElementArr.length){
        handleTextAlignment(textArr);
    }
});


// window.onclick = function(event) {
//     textAlignDropdownElement.classList.add('hide');
// }

// textAlignDropdownElement.addEventListener('click', function(event) {
//     event.stopPropagation();
//     if(textAlignInputElement.value === '') {
//         textAlignInputElement.value += event.target.textContent;
//     } else {
//         if(textAlignInputElement.value.indexOf(event.target.textContent) === -1) {
//             textAlignInputElement.value += ',' + event.target.textContent;
//         }    
//     }
//     textArr.push(event.target.textContent);
//     handleTextAlignment(textArr);
// });

function handleTextAlignment(value) {
    let textClass = '';
    const textElement = document.getElementById('textHolder');
    if (textElement.classList.contains(prevClass)) {
        textElement.classList.remove(prevClass);
    }
    for(let i=0; i<value.length; i++) {
        if(!prev1 && textAlign1.indexOf(value[i]) > -1) {
            prev1 = value[i];
        } else if(!prev2 && textAlign2.indexOf(value[i]) > -1) {
            prev2 = value[i];
        }
    }
    
    if(!prev1 && prev2) {
        textClass = 'bottom-'+prev2;
    } else if (prev1 && !prev2) {
        textClass = prev1+'-left';
    } else if(prev1 && prev2) {
        textClass = prev1+'-'+prev2;
    }
    if (textClass) {
        textElement.classList.add(textClass);
        prevClass = textClass;
    } 
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

// document.getElementById('submitBtnId').onclick = function(event) {
//     const queryParamsKeys = ["txt", "txtclr", "txtsize", "txtalign", "blend", "balpha"];
//     let queryParam = '';
//     let src = "/Users/Sarvani/Documents/workspace/Practice/imgix/butterfly.jpg";
//     const inputElements = document.querySelectorAll("input");
//     for(let i=0; i<inputElements.length; i++) {
//         if(inputElements[i].value) {
//             queryParam += queryParamsKeys[i]+ "=" + inputElements[i].value+"&";
//         }
//     }
//     queryParam += "bm=" + document.querySelectorAll("select")[0].value;
//     // url += "?"+queryParam;
//     let url = "newImage.html?"+ src + "&" +queryParam;
//     document.querySelectorAll("a")[0].href = encodeURI(url);
// }
