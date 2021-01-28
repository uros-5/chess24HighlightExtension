function main() {
    // creating div for icons
    let capturedPieces = document.querySelector(".top > .capturedPieces")
    let toolDiv = document.createElement("div")
    capturedPieces.before(toolDiv)
    toolDiv.classList.toggle("analysisTools")

    // apply styles
    let toolStyles = document.createElement('style')
    toolStyles.type = "text/css"
    toolStyles.innerHTML = `
    .analysisTools { display: flex;
        justify-content: space-around;
        margin-bottom: 0.5em;
    }
    
    .analysisTools > * {
        cursor: pointer;
    }

    .analysisTools > h1 {
        cursor: default;
        text-decoration: underline;
    }

    `
    document.querySelector("head").appendChild(toolStyles)

    // add icons
    toolDiv.innerHTML = `<i class="fas fa-highlighter"></i> <i class="fas fa-eye"></i> <i class="fas fa-trash-alt"></i><h1 style="font-size: 1.2em;">move</h1>`
    let faStyles = document.createElement("link")
    faStyles.rel = "stylesheet"
    faStyles.href = "https://use.fontawesome.com/releases/v5.7.1/css/all.css"
    "https://use.fontawesome.com/releases/v5.7.1/css/all.css"
    faStyles.type = "text/css"
    document.querySelector("head").appendChild(faStyles)

    // variables for clickable cells
    let cells = document.querySelectorAll(".ui-droppable");
    let cellCheck = false;
    let activeCells = []

    let currentMode = "move"
    let currentColor = "blue";
    let highlighted = false;

    // table implementation
    function changeGame(e) {
        if(currentMode == "highlights") {
            currentMode = "move";
            removeListenersFromCells()
        }
        else if(currentMode == "move") {
            currentMode = "highlights"
            setListenerToAllCells()
        }
        document.querySelector(".analysisTools h1").textContent = `${currentMode}`
        
    }
    // listener on one cell, changing background
    function cellListener(e) {
        let elem = e.explicitOriginalTarget.parentElement.querySelector("img");
        if(activeCells.indexOf(elem) == -1) {
            activeCells.push(elem)
        /*  e.explicitOriginalTarget.parentElement.querySelector("img").src = imageSrc.replace(/chess24\/highlight\/red-take.png/,`chess24/highlight/${currentColor}-take.png`) */
        }
        else {
            activeCells.splice(activeCells.indexOf(elem),1)
            
        }
    }

    // cellListener to every cell
    function setListenerToAllCells() {
        for(let i=0;i<cells.length;i++) {
            cells[i].addEventListener('click',cellListener);       
        }
    }

    // removing listeners from every cell
    function removeListenersFromCells() {
        for(let i=0;i<cells.length;i++) {
            cells[i].removeEventListener('click',cellListener);       
        }
    }

    // shortcuts for every icon
    function keyDown(event) {
        if (event.key == "a") {
        changeGame(event)
        }
        else if (event.key == "s") {
        showHighlights(event)
        }
        else if (event.key == "d") {
        deleteHighlights(event)
        }
    }

    // showing every marked highlight 
    function showHighlights(event) {
        if(highlighted == true) {
            highlighted = false
            for(let i=0;i<activeCells.length;i++) {
                activeCells[i].src = activeCells[i].src.replace(/chess24\/highlight\/.*png/,`chess24/highlight/null.png`);
            }
        }
        else if(highlighted == false) {
            highlighted = true
            for(let i=0;i<activeCells.length;i++) {
                activeCells[i].src = activeCells[i].src.replace(/chess24\/highlight\/.*png/,`chess24/highlight/${currentColor}-take.png`);
            }
        }
    }
    // deleting all highlights and removing background image
    function deleteHighlights(event) {
        for(let i=0;i<activeCells.length;i++) {
            activeCells[i].src = activeCells[i].src.replace(/chess24\/highlight\/.*png/,`chess24/highlight/null.png`);
        }
        activeCells = [];
    }
    document.querySelector('body').addEventListener('keydown',keyDown)
    document.querySelector(".analysisTools").children[0].addEventListener('click', changeGame)
    document.querySelector(".analysisTools").children[1].addEventListener('click',showHighlights)
    document.querySelector(".analysisTools").children[2].addEventListener('click',deleteHighlights)
}


setTimeout(main,5000)
