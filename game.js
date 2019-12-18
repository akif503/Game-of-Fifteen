function play () {
    let boxes = document.getElementsByClassName('box');

    for (let i = 0; i < boxes.length; i++) {

        boxes[i].addEventListener('click', function () {
            moveable(boxes[i].id);
            check();
        }, false);
    }
}

function makeMove (move, gap_pos) { 

    if (move == "U") {
        let elem = grid[gap_pos[0] - 1][gap_pos[1]];

        // Change Grid
        grid[gap_pos[0]][gap_pos[1]] = elem;
        grid[gap_pos[0] - 1][gap_pos[1]] = "BLANK";

        // Change Visual 
        // The Gap goes up that means the box comes down
        let elemId = elem[1];
        let box = document.getElementById(elemId);
        
        let offset = Number(box.style.top.match(/\d+/).valueOf());

        offset += 100;

        box.style.top = offset.toString().concat("px");
    }

    else if (move == "D") {
        let elem = grid[gap_pos[0] + 1][gap_pos[1]];

        // Change Grid
        grid[gap_pos[0]][gap_pos[1]] = elem;
        grid[gap_pos[0] + 1][gap_pos[1]] = "BLANK";

        // The Gap comes down that means the box goes up
        let elemId = elem[1];
        let box = document.getElementById(elemId);
        
        let offset = Number(box.style.top.match(/\d+/).valueOf());
        offset -= 100;

        box.style.top = offset.toString().concat("px");
    }

    else if (move == "L") {
        let elem = grid[gap_pos[0]][gap_pos[1] - 1];

        // Change Grid
        grid[gap_pos[0]][gap_pos[1]] = elem;
        grid[gap_pos[0]][gap_pos[1] - 1] = "BLANK";

        // Change Visual
        // The Gap goes left that means the box comes right
        let elemId = elem[1];
        let box = document.getElementById(elemId);
        
        let offset = Number(box.style.left.match(/\d+/));
        offset += 100;
        box.style.left = offset.toString().concat("px"); 
    }

    else if (move == "R") {
        let elem = grid[gap_pos[0]][gap_pos[1] + 1];

        // Change Grid
        grid[gap_pos[0]][gap_pos[1]] = elem;
        grid[gap_pos[0]][gap_pos[1] + 1] = "BLANK";
        
        // The Gap goes right that means the box comes left
        let elemId = elem[1];
        let box = document.getElementById(elemId);
        
        let offset = Number(box.style.left.match(/\d+/).valueOf());
        offset -= 100;

        box.style.left = offset.toString().concat("px");
    }
}

function moveable(elemId) {
    let gap_pos = new Array();

    let availableBlocks = new Array();

    outerLoop: 
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            if (grid[r][c] == "BLANK") {
                gap_pos = [r,c]

                // UP
                if (r - 1 >= 0) {
                    if (elemId == grid[r-1][c][1]) {
                        makeMove('U', gap_pos);
                    }
                }
                // Down
                if (r + 1 < 4) {
                    if (elemId == grid[r+1][c][1]) {
                        makeMove('D', gap_pos);
                    }
                }
                // Left
                if (c - 1 >= 0) {
                    if (elemId == grid[r][c-1][1]) {
                        makeMove('L', gap_pos);
                    }
                }
                // Right
                if (c + 1 < 4) {
                    if (elemId == grid[r][c+1][1]) {
                        makeMove('R', gap_pos);
                    }
                }

                break outerLoop;
            }
        }
    }
}

function check() {
    let req = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0]

    let cur = []
    
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {                
            if (grid[r][c] == "BLANK") {
                cur.push(0)
                continue     
            }

            num = Number(grid[r][c][0])
            id = grid[r][c][1]

            cur.push(num)
        }
    }

    if (req.join(',') == cur.join(',')) {
        let done = document.createElement("div")
        done.id = "done"
        done.innerText = "YEY!! You've Done It."

        document.body.append(done)
    }
    
}

play()