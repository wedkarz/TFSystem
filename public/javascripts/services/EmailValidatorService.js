angular.module("techFeast")
	.service('EmailValidatorService', function () {
		
		this.isValid = function (email) {
			var input = document.createElement('input');

  			input.type = 'email';
  			input.value = email;

  			return input.checkValidity(); 
		};

		return this;
	});