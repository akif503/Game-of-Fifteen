var blocks = new Array();
var grid = new Array();

function main() { 
    findGameConfig();
    initalize();   
}

function findGameConfig() {
    do {
        var tempGrid = []

        // Grid elements to choose from 
        let elems = []

        for(let i = 0; i < 16; i++) {
            elems.push(i)
        }

        // Find a random config 
        for(let i = 0; i < 16; i++) {
            random_index = Math.floor(Math.random() * elems.length)
            tempGrid.push(elems.slice(random_index, random_index+1))
            elems.splice(random_index,1)
        }

    } while(!solvable(tempGrid));

    blocks = tempGrid.slice()
}

function solvable (tempGrid) {
    inv = 0;

    for (let i = 0; i < 16; i++) {
        if (tempGrid[i] != 0) {
            for (let j = 0; j < i; j++) {
                if (tempGrid[j] > tempGrid[i]) {
                    inv++;
                }       
            }
        }

        else {
            inv += (1 + Math.floor(i / 4));
        }
    }

    return (inv % 2 == 0) ? true : false;
}

function initalize () {
    ctnr = document.createElement("div");
    ctnr.classList.add("main-container")
    
    document.body.append(ctnr);
    
    for (let r = 0; r < 4; r++) {
        let row = [];
        for (let c = 0; c < 4; c++) {
            if (blocks[4*r+c] == 0) {
                row.push("BLANK");
                continue;
            }

            num = blocks[4*r+c];

            // Create Block
            let block = document.createElement("div");
            block.classList.add("box");

            // Add ID
            let block_no = "block".concat((4*r+c + 1).toString());
            block.id = block_no;

            // Set number on Block
            let text = document.createElement("span");
            text.innerText = num.toString();
            block.appendChild(text);

            document.getElementsByClassName("main-container")[0].appendChild(block);
            
            // Set Block Position
            block.style.left = (100*c).toString().concat("px");
            block.style.top = (100*r).toString().concat("px");

            let gridElem = [num, block.id];
            row.push(gridElem);
        }
        grid.push(row);       
    }

    // Add the Game Script
    game = document.createElement("script");
    game.setAttribute("src","game.js");

    document.body.append(game)
}


document.addEventListener('DOMContentLoaded', main, false);

