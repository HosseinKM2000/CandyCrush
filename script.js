let candies = ["blue","red","green","yellow","purple","orange"];
let board = [];
let rows = 9;
let columns = 9;
let score = 0;
let currTile;
let otherTile;
const volume = document.querySelector('#sound > img[alt="volume"]')
const silent = document.querySelector('#sound > img[alt="silent"]')
const audio = document.getElementById("music");

volume.addEventListener('click',function() {
    audio.pause()
    this.style = 'display:none';
    silent.style = 'display:block';
})

silent.addEventListener('click',function() {
    this.style = 'display:none';
    volume.style = 'display:block';
    audio.play()
})

window.onload = function() {
    startGame();
    window.setInterval(function(){
        crushCandy();
        slideCandy();
        generateCandy();
    },100)
}

function randomCandy() {
    return candies[Math.floor(Math.random() * candies.length)];
}

function startGame() {
    for(let r = 0; r < rows; r++) {
        let row = [];
        for(let c = 0; c < columns; c++) {
            // <img id=""/>
            let tile = document.createElement('img');
            tile.id = r.toString() + "-" + c.toString();
            tile.src = './image/' + randomCandy() + '.png';
            tile.setAttribute('draggable','true');
            // drag functions
            tile.addEventListener('dragstart',dragStart);
            tile.addEventListener('dragover',dragOver);
            tile.addEventListener('dragenter',dragEnter);
            tile.addEventListener('dragleave',dragLeave);
            tile.addEventListener('drop',dragDrop);
            tile.addEventListener('dragend',dragEnd);
            document.getElementById('board').append(tile);
            row.push(tile);
        }
        board.push(row)
    }
}

function dragStart() {
    currTile = this;
}

function dragOver(e) {
    e.preventDefault()
}

function dragEnter(e) {
    e.preventDefault()
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this;
}

function dragEnd() {
    if(currTile.src.includes("blank") || otherTile.src.includes("blank"))
    {
        return;
    }

    let currCoords = currTile.id.split('-');
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split('-');
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = c2 === c-1 && r === r2;
    let moveRight = c2 === c+1 && r === r2;
    let moveUp = r2 === r-1 && c === c2;
    let moveDown = r2 === r+1 && c === c2;
    console.log(r , r2 , c , c2 )
    console.log(moveLeft , moveRight , moveUp , moveDown)
    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    if(isAdjacent)
    {
        let currImg = currTile.src;
        let otherImg = otherTile.src;
        currTile.src = otherImg;
        otherTile.src = currImg;
    }

    let validMove = checkValid();
    if(!validMove)
    {
        let currImg = currTile.src;
        let otherImg = otherTile.src;
        currTile.src = otherImg;
        otherTile.src = currImg;  
    }
}

function crushCandy() {
    crushThree()
    document.getElementById("score").innerText = score;
}

function crushThree() {
    // check rows
    for(let r = 0; r < rows; r++) {
        for(let c = 0; c < columns-2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            if( candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = './image/blank.png';
                candy2.src = './image/blank.png';
                candy3.src = './image/blank.png';
                score += 30;
            }
        }
    }

    // check columns
    for(let c = 0; c < columns; c++) {
        for(let r = 0; r < rows-2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            if( candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = './image/blank.png';
                candy2.src = './image/blank.png';
                candy3.src = './image/blank.png';
                score += 30;
            }
        }
    }
}

function checkValid() {
    // check rows
    for(let r = 0; r < rows; r++) {
        for(let c = 0; c < columns-2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            if( candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }

    // check columns
    for(let c = 0; c < columns; c++) {
        for(let r = 0; r < rows-2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            if( candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }
    return false;
}

function slideCandy() {
    for(let c = 0; c < columns; c++) {
        let ind = rows - 1;
        for(let r = columns-1; r >= 0; r--) {
            if(!board[r][c].src.includes("blank")) {
                board[ind][c].src = board[r][c].src;
                ind -= 1;
            }
        }
        for(let r = ind; r >= 0; r--) {
            board[r][c].src = "./image/blank.png";
        }
    }
}

function generateCandy() {
    for(let c = 0; c < columns; c++) {
        if(board[0][c].src.includes("blank")) {
            board[0][c].src = "./image/" + randomCandy() + '.png';
        }
    }
}