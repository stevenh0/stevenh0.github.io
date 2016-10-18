var app = angular.module('PizzaGameApp', []);
var meats = ["beef", "chicken", "lamb","sausage", "ham", "bacon", "steak", "pepperoni", "pork"];
var veggies = ["mushrooms", "onions", "peppers", "tomatoes", "spinach", "olives", "zucchini", "asparagus", "pineapple"];
var cheeses = ["chedder", "gouda", "mozza", "feta", "parmesan", "provalone"]

app.controller('MainController', ['$scope', function($scope) {
	$scope.pizza = [];
	$scope.baked = [];
	$scope.knead = 0;
	$scope.mix = shuffle((meats.concat(veggies)).concat(cheeses));
	$scope.part = partition($scope.mix);
	$scope.addIngredient = function(index){
		$scope.pizza.push($scope.mix[index]);
		$("#log").append("<div class='row'> Added " + $scope.mix[index] + " to the pizza </div>");
		console.log("pushed" + index);
	}
	$scope.bakePizza = function(){
		var curPizza = {
		ingredients: $scope.pizza,
		bakeTime: 0 
		};
		$scope.baked.push(curPizza);
		$("#log").append("<div class='row'> Put a pizza in the oven </div>");
		$scope.pizza = [];
		$scope.mix = shuffle($scope.mix);
		$scope.part = partition($scope.mix);

	}
	$scope.removePizza=function(index){
		var curPizza = $("#pizza"+index)
		var bakeTime = $scope.baked[index].bakeTime = $("#pizzaTimer"+index).html();
		$("#scoreBox").html(function(i,val){
			var timeBaked = $("#pizzaTimer"+index).html()
			if(timeBaked=="burnt")
				return parseInt(val)-10;
			else if($("#pizza-value"+index).html()==0)
				return 0;
			return +parseInt(val)+ (parseInt(timeBaked) * $("#pizza-value"+index).html()) + (3 * $("#knead-bonus").html());
		});
		curPizza.hide();

	}
	$scope.scorePizza=function(pizza){
		return pizza.length;
	}
	$scope.increaseKnead = function(){
		$scope.knead++;
		console.log($scope.knead);
	}

}]);

app.filter("ScorePizza", function(){
	return function(curPizza){
	var pizza = curPizza.ingredients;
	var meat = false;
	var veggie = false;
	var cheese = false;
	var score = 0;
		if(pizza.length > 5)
			return 0;

		for (var i = 0; i < pizza.length; i++) {
			if(meats.includes(pizza[i])){				
				score = score + 3;
				meat = true;
			}
			else if(veggies.includes(pizza[i])){
				score = score + 2;
				veggie = true;
			}
			else{
				score = score + 1;
				cheese = true;
			}
		}

		
		if (meat && veggies && cheese)
			score = score + 5;
		return score;
	}
});

app.filter("displayKnead", function(){
	return function(score){
		return Math.floor(score/10);
	}
});


function partition(array){
	var x = 0;
	var new_array = [];
	while(x < array.length){
		new_array.push(new Array(array[x],array[x+1],array[x+2]));
		x = x + 3;
	}
	return new_array;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}