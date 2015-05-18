angular
  .module("ticTacToe")
  .controller('ticTacToeController', ticTacToeController);


  function ticTacToeController($scope, $firebaseObject){
  	var rootRef = new Firebase('https://tic-tact-toe-app.firebaseio.com/');
	$firebaseObject(rootRef).$bindTo($scope,"game");
    $scope.canMove = true;


	$scope.getSymbol = function(square) {
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
		if($scope.canMove){
		  var sqVal = $scope.game.board[square];
		  if (sqVal) return;
		  $scope.game.board[square] = $scope.game.turn;
		  $scope.game.turn *= -1;
		  getWinner();
		}
		
	}




	function getWinner() {
		var squares = $scope.game.board;
		var sum;
		for(var row = 0; row < 3; row++){
			sum = squares[row * 3] + squares[row * 3 + 1] + squares[row * 3 +2];
			var winner = checkWinner(sum);
        	if ( winner ) { 
        		$scope.canMove = false;
        		return winner; }

		} for(var col = 0; col < 3; col++) {
			sum = squares[col + 0] + squares[col + 3] + squares[col +6];
			var winner = checkWinner(sum);
        	if ( winner ) { 
        		$scope.canMove = false;
        		return winner; }

		} sum = squares[0] + squares[4] + squares[8];
			var winner = checkWinner(sum);
        	if ( winner ) { 
        		$scope.canMove = false;
        		return winner; };

		  sum = squares[6] + squares[4] + squares[2];
		 	var winner = checkWinner(sum);
        	if ( winner ) { 
        		$scope.canMove = false;
        		return winner; };
        return 0;
	}

	
	function checkWinner(sum) {
	if(sum === 3){
		console.log ("winner = 1");
		$scope.game.player1wins = "Winner";
		$scope.game.score1 ++;
	    return true;
		
	} else if(sum === -3){
		console.log ("winner = 2");	
		$scope.game.player2wins = "Winner";
		$scope.game.score2 ++;
		return true;
	
	}


	} 
$scope.resetGame = function () {
	$scope.game.board = [0,0,0,0,0,0,0,0,0];
	$scope.game.turn = 1;
	$scope.game.player1wins = " ";
	$scope.game.player2wins = " ";
	$scope.canMove = true;
}
$scope.resetWinCount = function () {
	$scope.game.score1 = 0;
	$scope.game.score2 = 0;
	$scope.game.board = [0,0,0,0,0,0,0,0,0];
	$scope.game.turn = 1;
	$scope.game.player1wins = " ";
	$scope.game.player2wins = " ";
	$scope.canMove = true;

}

			

}