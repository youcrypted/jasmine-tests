/* global jws, expect */

jws.tests = {};
jws.tests.UsersService = {
	NS: "com.youcrypted.users-service",
	runSpecs: function () {
		var lSpec = "generating 'users-service' script app";
		var App = null;
		it(lSpec, function () {
			jws.conn.getScriptApp("users-service", function (aApp) {
				App = aApp;
			});

			waitsFor(function () {
				return(App != null);
			}, lSpec, 3000);

			runs(function () {
			});
		});

		runTC(function () {
			return App["users"];
		}, "list", [0, 10], function (aResponse) {
			expect(aResponse.result.data.length).toEqual(0);
		});

		runTC(function () {
			return App["users"];
		}, "count", [], function (aResponse) {
			expect(aResponse.result.data).toEqual(0);
		});

		runTC(function () {
			return App["users"];
		}, "get", ["rsantamaria"], function (aResponse) {
			expect(aResponse.result.data).toEqual(null);
		});

		runTC(function () {
			return App["users"];
		}, "create", [
			"root",
			"43be8abf81daf0c14daae87681f2c0b3",
			"43be8abf81daf0c14daae87681f2c0b3",
			"Rolando SM",
			"kyberneees@youcrypted.com"]);

		runTC(function () {
			return App["users"];
		}, "get", ["root"], function (aResponse) {
			expect(aResponse.result.data.username).toEqual("root");
			expect(aResponse.result.data.cn).toEqual("Rolando SM");
		});

		runTC(function () {
			return App["users"];
		}, "count", [], function (aResponse) {
			expect(aResponse.result.data).toEqual(1);
		});

		runTC(function () {
			return App["users"];
		}, "edit", [
			"43be8abf81daf0c14daae87681f2c0b3",
			"Rolando Santamaria Maso",
			"kyberneees@youcrypted.com"]);

		runTC(function () {
			return App["users"];
		}, "count", [], function (aResponse) {
			expect(aResponse.result.data).toEqual(1);
		});

		runTC(function () {
			return App["users"];
		}, "get", ["root"], function (aResponse) {
			expect(aResponse.result.data.cn).toEqual("Rolando Santamaria Maso");
		});

		runTC(function () {
			return App["users"];
		}, "list", [0, 10], function (aResponse) {
			expect(aResponse.result.data.length).toEqual(1);
		});

		runTC(function () {
			return App["users"];
		}, "remove", []);
		
		runTC(function () {
			return App["users"];
		}, "count", [], function (aResponse) {
			expect(aResponse.result.data).toEqual(0);
		});

		runTC(function () {
			return App["users"];
		}, "list", [0, 10], function (aResponse) {
			expect(aResponse.result.data.length).toEqual(0);
		});
	},
	runSuite: function () {
		var lThis = this;
		describe("Performing test suite: " + this.NS + ":", function () {
			lThis.runSpecs();
		});
	}
};

jws.tests.UsersService.runSuite();

