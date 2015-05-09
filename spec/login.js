/* global jws, expect */

jws.tests = {};
jws.tests.Login = {
	NS: "com.youcrypted.login",
	runSpecs: function () {

		// login the jWebSocket server
		runTC(function () {
			return jws.conn;
		}, "login", ["root", "root"], function (aResponse) {
			expect(aResponse.code).toEqual(0);
		});
	},
	runSuite: function () {
		var lThis = this;
		describe("Performing test suite: " + this.NS + ":", function () {
			lThis.runSpecs();
		});
	}
};

jws.tests.Login.runSuite();

