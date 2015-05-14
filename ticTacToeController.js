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
		$scope.game.winner = getWinner();
	}




	function getWinner() {
		var squares = $scope.game.board;
		var sum;
		for(var row = 0; row < 3; row++){
			sum = squares[row * 3] + squares[row * 3 + 1] + squares[row * 3 +2];
			if (sum === 3){
				return 1;	
			} else if (sum === -3) {
				return -1;
			} else {
				return 0;
			}

		}	


  	}		


}
