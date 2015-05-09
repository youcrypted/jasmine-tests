/* global jws, expect */

jws.tests = {};
jws.tests.KeysService = {
	NS: "com.youcrypted.keys-service",
	runSpecs: function () {
		var lSpec = "generating 'users-service' script app";
		var UsersApp = null;
		it(lSpec, function () {
			jws.conn.getScriptApp("users-service", function (aApp) {
				UsersApp = aApp;
			});

			waitsFor(function () {
				return(UsersApp != null);
			}, lSpec, 3000);

			runs(function () {
			});
		});

		var lSpec = "generating 'keys-service' script app";
		var KeysApp = null;
		it(lSpec, function () {
			jws.conn.getScriptApp("keys-service", function (aApp) {
				KeysApp = aApp;
			});

			waitsFor(function () {
				return(KeysApp != null);
			}, lSpec, 3000);

			runs(function () {
			});
		});

		var lPrivateKey = "43be8abf81daf0c14daae87681f2c0b3";
		var lPublicKey = "43be8abf81daf0c14daae87681f2c0b3";
		runTC(function () {
			return UsersApp["users"];
		}, "create", [
			"root",
			lPrivateKey,
			lPublicKey,
			"Rolando SM",
			"kyberneees@youcrypted.com"]);

		runTC(function () {
			return KeysApp["keys"];
		}, "getPrivateKey", ["root"], function (aResponse) {
			expect(aResponse.result.data).toEqual(lPrivateKey);
		});

		runTC(function () {
			return KeysApp["keys"];
		}, "getPublicKey", ["root"], function (aResponse) {
			expect(aResponse.result.data).toEqual(lPublicKey);
		});

		runTC(function () {
			return KeysApp["keys"];
		}, "getKeys", ["root"], function (aResponse) {
			expect(aResponse.result.data.privateKey).toEqual(lPrivateKey);
			expect(aResponse.result.data.publicKey).toEqual(lPublicKey);
		});

		runTC(function () {
			return UsersApp["users"];
		}, "remove", []);
		
		runTC(function () {
			return KeysApp["keys"];
		}, "getPublicKey", ["root"], function (aResponse) {
			expect(aResponse.result.data).toEqual(null);
		});
		
		runTC(function () {
			return KeysApp["keys"];
		}, "getPrivateKey", ["root"], function (aResponse) {
			expect(aResponse.result.data).toEqual(null);
		});
		
		runTC(function () {
			return KeysApp["keys"];
		}, "getKeys", ["root"], function (aResponse) {
			expect(aResponse.result.data).toEqual(null);
		});
	},
	runSuite: function () {
		var lThis = this;
		describe("Performing test suite: " + this.NS + ":", function () {
			lThis.runSpecs();
		});
	}
};

jws.tests.KeysService.runSuite();

