$(document).ready(function () {

    // Spalten, Zeilen und deren Grössen abspeichern
    let rows = 10;
    let cols = 10;
    let squareSize = 50;

    let board = [[]];

    class GameBoard{
        constructor(gameBoard){
            this.gameBoard = gameBoard;
            this.createGrid(rows, cols, squareSize);
            this.placeShips();
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

        //Feuer Mechanismus
        //Source: http://www.kirupa.com/html5/handling_events_for_many_elements.htm:
        checkShot(event) {
            console.log(event);
            // if item clicked (e.target) is not the parent element on which the event listener was set (e.currentTarget = gameboard div )
            if (event.target != event.currentTarget) {
                // extract row and column # from the HTML element's id
                let row = event.target.id.substring(5,6);
		        let col = event.target.id.substring(6,7);

                alert("Clicked on square: row: " + row + ", col: " + col);

                console.log(board);

                switch(board[row][col]){
                    //Kein Schiff auf Feld
                    case 0:
                        break;
                    //Schiff auf Feld
                    case 1:
                        break;
                    //Feld schon aufgedeckt
                    case 2:
                        break;
                    default:
                        break;
                }
            }
            event.stopPropagation();
        }

        placeShips(){
            
            board = [
				[0,0,0,1,1,1,1,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0,0,0,0],
				[0,0,0,0,0,0,1,0,0,0],
				[0,0,0,0,0,0,1,0,0,0],
				[1,0,0,0,0,0,1,1,1,1],
				[1,0,0,0,0,0,0,0,0,0],
				[1,0,0,1,0,0,0,0,0,0],
				[1,0,0,1,0,0,0,0,0,0],
				[1,0,0,0,0,0,0,0,0,0]
				]
        }
    }

    // GameBoard Instanz erstellen
    let gameboard = new GameBoard(document.getElementById("gameboard"));

    //Click event der Funktion checkShot() übergeben um zu überprüfen welches Quadrat getroffen wurde
    gameboard.gameBoard.addEventListener("click", gameboard.checkShot, false); 


});