UTicTacToe = function(io){
	var innerGrids = {};
	var outerGrid = new iio.Grid(0,0,3,3,300);
	   outerGrid.setStrokeStyle('green',4);
	   // outerGrid.setShadowColor('red');
	   // io.addObj(outerGrid);
	io.addGroup('bglayer', -10);
	io.addGroup('txtlayer', 0);
	this.xTurn = true;
	var turn = 1;
	var nextBoard = null;
	// var wins =  [[0,0,0],[0,0,0],[0,0,0]];
  	for (var x = 0; x < 3; x++) {
  		for (var y = 0; y < 3; y++) {
  			var cellCenter = outerGrid.getCellCenter({x:x, y:y});
  			innerGrids[x+"L"+y+"D"] = new iio.Grid(cellCenter.x-143, cellCenter.y-143, 3, 3, 95);
  			// io.addObj(innerGrids[x+"L"+y+"D"]);
  			io.addToGroup('bglayer', innerGrids[x+"L"+y+"D"]);
  		};
  	};
  	var status = new iio.Text('Player 1 (O) starts', 450, 25).setFont('20px Consolas')
              .setTextAlign('center')
              .setFillStyle('black');
    io.addObj(status);
  	io.addToGroup('txtlayer',status);
  	io.addToGroup('bglayer',outerGrid);
  	//console.log(status)
	io.canvas.addEventListener('mousedown', function(event){
		//get outergrid cell
    	var temp = outerGrid.getCellAt(io.getEventPosition(event));
    	//calculation inner grid cords
    	var selectGrid = innerGrids[temp.x+"L"+temp.y+"D"];
    	// get center of current inner grid
    	var cellCenter = selectGrid.getCellCenter(io.getEventPosition(event), true);
    	// get cell of inner grid that user clicks on
    	var cell = selectGrid.getCellAt(io.getEventPosition(event), true);
		if(typeof selectGrid.cells[cell.x][cell.y].taken == 'undefined' && isValidBoard(temp)){
			if (this.xTurn) {
				io.addObj(new iio.XShape(cellCenter, 90).setStrokeStyle('red', 3));
				selectGrid.cells[cell.x][cell.y].taken = 'x';
				setStatus("Player 2 (O)'s turn");
				//innerGrids[cell.x+"L"+cell.y+"D"].setStrokeStyle('blue',1);
			}else{
				io.addObj(new iio.Circle(cellCenter, 45).setStrokeStyle('blue', 3));
				selectGrid.cells[cell.x][cell.y].taken = 'o';
				setStatus("Player 2 (X)'s turn");
				//innerGrids[cell.x+"L"+cell.y+"D"].setStrokeStyle('red',1);
			}
			this.xTurn=!this.xTurn;
			isWin(selectGrid, cell, outerGrid, event);
			nextBoard = cell;
			innerGrids[cell.x+"L"+cell.y+"D"].setStrokeStyle('yellow');
			innerGrids[nextBoard.x+"L"+nextBoard.y+"D"].draw(io.context);
			innerGrids[cell.x+"L"+cell.y+"D"].draw(io.context);
		}

  	});
	function setStatus(string, extra) {
		if(typeof extra == 'undefined')
			extra = '';
		status.text = string+extra;
		io.draw()
	}
	function isValidBoard (temp) {
		if (nextBoard == null) {
			//first turn
			return true;
		}else if([temp.x, temp.y].join('') === [nextBoard.x, nextBoard.y].join('')){
			innerGrids[nextBoard.x+"L"+nextBoard.y+"D"].styles ={};
			// console.log(innerGrids[nextBoard.x+"L"+nextBoard.y+"D"])
			innerGrids[nextBoard.x+"L"+nextBoard.y+"D"].draw(io.context);
			return true;
		}else{
			return false;
		}
	}
	function isWin (selectGrid, cell, outerGrid, event) {
        // console.log(cell);
	  	// check vertically
	  	var player = selectGrid.cells[cell.x][cell.y].taken;
        var cellCenter = outerGrid.getCellCenter(io.getEventPosition(event),true);
        //console.log(cellCenter)
	  	var i =0;
	  	while(i<3 && selectGrid.cells[cell.x][i] && (selectGrid.cells[cell.x][i].taken == player)){
	  		i++;
	  	}
	  	if (i == 3){
            io.addObj(new iio.Circle(cellCenter, 145).setStrokeStyle((player == 'y') ? 'blue' : 'red', 3));
	  		// console.log("won vertically")
	  		return true;
	  	}
	  	// check Horizontally
	  	var i =0;
	  	while(i<3 && selectGrid.cells[i][cell.y] && (selectGrid.cells[i][cell.y].taken==player)){
	  		i++;
	  	}
	  	if (i == 3){
	  		io.addObj(new iio.Circle(cellCenter, 145).setStrokeStyle((player == 'y') ? 'blue' : 'red', 3));
	  		return true;
	  	}
	  	var i =0;
	  	while(i<3 && selectGrid.cells[i][i] && (selectGrid.cells[i][i].taken==player)){
	  		i++;
	  	}
	  	if (i == 3){
	  		io.addObj(new iio.Circle(cellCenter, 145).setStrokeStyle((player == 'y') ? 'blue' : 'red', 3));
	  		return true;
	  	}
	  	var i =0;
	  	while(i<3 && selectGrid.cells[i][2-i] && (selectGrid.cells[i][2-i].taken==player)){
	  		i++;
	  	}
	  	if (i == 3){
	  		io.addObj(new iio.Circle(cellCenter, 145).setStrokeStyle((player == 'y') ? 'blue' : 'red', 3));
	  		return true;
	  	}
	  	return player, false
	}
};
