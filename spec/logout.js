/* global jws, expect */

jws.tests = {};
jws.tests.Logout = {
	NS: "com.youcrypted.logout",
	runSpecs: function () {
		
		// logout the jWebSocket server
		runTC(function () {
			return jws.conn;
		}, "logout", [], function (aResponse) {
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

jws.tests.Logout.runSuite();

