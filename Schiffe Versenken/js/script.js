$(document).ready(function () {

    // Spalten, Zeilen und deren Grössen abspeichern
    let rows = 10;
    let cols = 10;
    let squareSize = 50;

    let hitcount = 0;

    let board;

    class GameBoard{
        constructor(gameBoard){
            this.gameBoard = gameBoard;
            this.createGrid(rows, cols, squareSize);
            this.placeShips(ships);
        }
        createGrid(rows, cols, squareSize){
            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    
                    // Für jedes Feld wird ein div Element erstellt und dem gameBoard hinzugefügt.
                    var square = document.createElement("div");
                    this.gameBoard.appendChild(square);
    
                    // Jedem div eine eindeutige ID, gemäss grid layout, vergeben
                    square.id = 'ship_' + j + i;			
                    
                    // Von jedem quadrat im Grid die position bestimmen.  
                    var topPosition = j * squareSize;
                    var leftPosition = i * squareSize;			
                    
                    square.style.top = topPosition + 'px';
                    square.style.left = leftPosition + 'px';						
                }
            }
        }
        //Wertet das click-event aus und sorgt dafür dass die richtigen Aktionen durchgeführt werden
        //Source: http://www.kirupa.com/html5/handling_events_for_many_elements.htm:
        checkShot(event) {
            console.log(hitcount);
            // Es sollen nur Klicks auf dem Gameboard erkannt werden. (e.target = clicked Element) (eventlistener wurde auf e.currentTarget gesetzt = gameboard div )
            if (event.target != event.currentTarget) {
                if(hitcount == 20){
                    alert("Sie haben alle Schiffe versenkt!");
                    location.reload();
                }
                // row und column vom selektierten div speichern
                let row = event.target.id.substring(5,6);
		        let col = event.target.id.substring(6,7);
                switch(board[row][col]){
                    //Kein Schiff auf Feld
                    case 0:
                        event.target.style.background = "grey";
                        board[row][col] = 2;
                        break;
                    //Schiff auf Feld
                    case 1:
                        hitcount++;
                        event.target.style.background = "red";
                        board[row][col] = 2;
                        break;
                    //Feld schon aufgedeckt
                    case 2:
                        alert("Sie haben dieses Feld schon aufgedeckt!");
                        break;
                    default:
                        break;
                }
            }
            event.stopPropagation();
        }

        placeShips(ships){ 
            board = [
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0]
				]
            ships.ships.forEach(element => {
                console.log("Ship: " + element);
                let randDirection = Math.floor(Math.random() * 2);      //  0 = Horizontale Platzierung, 1 = Vertikale Platzierung
                if(randDirection == 0){
                    put_horizontally(element);
                } else{
                    put_vertically(element);
                }
            });
            
            console.log(board);

            function put_horizontally(element){
                console.log("--> Put horizontally at:");
                let randRow = Math.floor(Math.random() * 10);
                let randCol = Math.floor(Math.random() * 10);
                console.log(randRow + " | " + randCol);

                //Nicht auf einem Schiff ein anderes Platzieren
                while(board[randRow][randCol] == 1){
                    randRow = Math.floor(Math.random() * 10);
                    randCol = Math.floor(Math.random() * 10);
                }
                //Verbietet dass Platzieren ausserhalb des Grids indem der freie Platz mit Schiffslänge verglichen wird
                while((10-randCol) < element.length){
                    console.log("Spots left: " + (10-randCol) + " |  Length of ship: " + element.length);
                    randCol--;
                    console.log("--> randCol decremented: " + randCol);
                    console.log("new Coordinates: " + randRow + " | " + randCol);
                }
                //Schiff horizontal zeichnen, indem die column mit der Schiffslänge inkrementiert wird
                for(let i=0; i<element.length; i++){
                    board[randRow][randCol] = 1;
                    randCol++;
                }
            }
            function put_vertically(element){
                console.log("--> Put vertically at:");
                let randRow = Math.floor(Math.random() * 10);
                let randCol = Math.floor(Math.random() * 10);
                console.log(randRow + " | " + randCol);

                //Nicht auf einem Schiff ein anderes Platzieren
                while(board[randRow][randCol] == 1){
                    randRow = Math.floor(Math.random() * 10);
                    randCol = Math.floor(Math.random() * 10);
                }
                while((10-randRow) < element.length){
                    console.log("Spots left: " + (10-randRow) + " |  Length of ship: " + element.length);
                    randRow--;
                    console.log("--> randRow decremented: " + randRow);
                    console.log("new Coordinates: " + randRow + " | " + randCol);
                }
                //Schiff vertical zeichnen, indem die row mit der Schiffslänge inkrementiert wird
                for(let i=0; i<element.length; i++){ 
                    board[randRow][randCol] = 1;
                    randRow++;
                }
            }
        }
    }

    // Ship-Objekte 
    class Ships{
        constructor(){
            this.ships = [
                [1],
                [1],
                [1],
                [1],
                [1,1],
                [1,1],
                [1,1],
                [1,1,1],
                [1,1,1],
                [1,1,1,1]
            ]
        }
    }

    let ships = new Ships();

    // GameBoard Instanz erstellen
    let gameboard = new GameBoard(document.getElementById("gameboard"));
    //Click event der Funktion checkShot() übergeben um zu überprüfen welches Quadrat getroffen wurde
    gameboard.gameBoard.addEventListener("click", gameboard.checkShot, false); 
});