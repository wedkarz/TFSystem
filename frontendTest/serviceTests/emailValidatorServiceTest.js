describe("email validator service test", function () {

	var validEmail = "aaaaa@example.com";
	var invalidEmail = "aaaa@.eee.com";

	beforeEach(angular.mock.module("techFeast"));

	it("checks emails", function () {
		angular.mock.inject(function (EmailValidatorService) {
			expect(EmailValidatorService.isValid(validEmail)).toEqual(true);
			expect(EmailValidatorService.isValid(invalidEmail)).toEqual(false);			
		});
	})
});