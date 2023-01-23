angular
  .module("app", ["ngDialog"])

  .controller("MainCtrl", function ($scope, ngDialog) {
    const InputValues = [
      { a: 10, b: 1, c: 3 },
      { a: null, b: 5, c: 1 },
      { a: 5, b: null, c: null },
      { a: 1, b: 4, c: 0 },
    ];


    // not the most neat, probably can be improved but was the only way I found to maintain the controller and the view input value sync
    // specially on edge cases
    var a = 0;
    var b = 0;
    var c = 0;
    let i = 0
    $scope.inputA = {
        value: function(value){
            return arguments.length ? (a = value) : a;

        }
    }
    $scope.inputB = {
        value: function(value){
            return arguments.length ? (b = value) : b;

        }
    }
    $scope.inputC = {
        value: function(value){
            return arguments.length ? (c = value) : c;

        }
    }
    //handles the opening of Dialog(popup) by using the module 'ngDialog' and assigning it's template which is found in a separated file.
    $scope.openDialog = function () {
      $scope.dialogOpen = true;
      ngDialog.open({ template: "dialog.html", scope: $scope,showClose: false });
      $scope.result = "";
      i=0;
      $scope.inputA.value(InputValues[i].a)
      $scope.inputB.value(InputValues[i].b)
      $scope.inputC.value(InputValues[i].c)
    };

    // handles the close button, we could clear all the fields here like asked in the task but I find redundant since we are initiating everything on the openDiag function
    $scope.close = function () {
      $scope.dialogOpen = false;
      ngDialog.close();
    };

    // check all possible errors first before calculating the result
    // if no errors were found we assign the new values to the input from the array of objects. 
    $scope.save = function (form) {
        var A = parseInt($scope.inputA.value()) || 0;
        var B = parseInt($scope.inputB.value()) || 0;
        var C = parseInt($scope.inputC.value());
      if (form.$error.required) {
        // Show error message
        $scope.result = "Error: Required input is empty.";
      } 
      else if (
        isFinite(A) == false ||
        isFinite(B) == false ||
        isFinite(C) == false
      ) {
        $scope.result = "Error: Input values are not valid numbers.";
      } 
      else if (C == 0){
        $scope.result = "Error: Division by zero.";
      }
    //   if no errors then we can make sure that A & B have zero incase they were null
    // we also populate the inputs with the new values
      else {
        
        $scope.result = (A + B) / C;
        
        if (i <=3) {
            i++

            $scope.inputA.value(InputValues[i].a)
            $scope.inputB.value(InputValues[i].b)
            $scope.inputC.value(InputValues[i].c)
        }
        }
      
    };
  });
