angular
  .module("ticTacToe")
  .controller('ticTacToeController', ticTacToeController);


  function ticTacToeController($scope, $firebaseObject){
  	var rootRef = new Firebase('https://tic-tact-toe-app.firebaseio.com/');
	$firebaseObject(rootRef).$bindTo($scope,"game");

	$scope.getSymbol = function(square) {
		if (!$scope.game) return ;
		var sqVal = $scope.game.board[square];
		if (sqVal === 0) {
			return "";
		} else if (sqVal === 1) {
			return "X";
		} else if (sqVal === -1) {
			return "O";
		}

	};

	$scope.getMove = function(square) {
		var sqVal = $scope.game.board[square];
		if (sqVal) return;
		$scope.game.board[square] = $scope.game.turn;
		$scope.game.turn *= -1;
		$scope.game.player1wins = getWinner();
		$scope.game.player2wins = getWinner();
	}




	function getWinner() {
		var squares = $scope.game.board;
		var sum;
		for(var row = 0; row < 3; row++){
			sum = squares[row * 3] + squares[row * 3 + 1] + squares[row * 3 +2];
			var winner = checkWinner(sum);
        	if ( winner ) { return winner; }

		} for(var col = 0; col < 3; col++) {
			sum = squares[col + 0] + squares[col + 3] + squares[col +6];
			var winner = checkWinner(sum);
        	if ( winner ) { return winner; }

		} sum = squares[0] + squares[4] + squares[8];
			var winner = checkWinner(sum);
        	if ( winner ) { return winner; };

		  sum = squares[6] + squares[4] + squares[2];
		 	var winner = checkWinner(sum);
        	if ( winner ) { return winner; };
        return 0;
	}

	
	function checkWinner(sum) {
	if(sum === 3){
		console.log ("winner = 1");
		$scope.player1wins = "Winner";
	} else if(sum === -3){
		console.log ("winner = 2");	
	}


	} 
$scope.reset = function () {
	$scope.game.board = [0,0,0,0,0,0,0,0,0];
	$scope.game.winner = 0;
	$scope.game.turn = 1;
}


			

}
