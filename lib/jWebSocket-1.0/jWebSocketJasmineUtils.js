/* global jws, expect */

// run jwebsocket oriented test case
var runTC = function (aService, aMethod, aArgs, aAssertHandler) {
	var aExpectedCode = 0;
	if (jws.tools.getType(aAssertHandler) == "integer") {
		aExpectedCode = aAssertHandler;
	}

	var lTimeout = 3000;
	if (!aAssertHandler || jws.tools.getType(aAssertHandler) == "integer") {
		aAssertHandler = function (aResponse) {
			expect(aExpectedCode).toEqual(aResponse.code);
		};
	} else if (aAssertHandler["timeout"]) {
		lTimeout = aAssertHandler["timeout"];
	}
	if (typeof aAssertHandler["handler"] == "function") {
		aAssertHandler = aAssertHandler["handler"];
	}

	var lResponse = null;
	var lSpec = "Invoking '" + aMethod + "' with " + aArgs.length + " parameter(s). Timeout :" + lTimeout + ". Expected response code: " + aExpectedCode;

	aArgs.push({
		OnResponse: function (aResponse) {
			lResponse = aResponse;
		}
	});

	// arguments function evaluator
	var fnEval = function (aArgs) {
		if (jws.tools.getType(aArgs) == "function") {
			return fnEval(aArgs());
		} else if (jws.tools.getType(aArgs) != "array") {
			return aArgs;
		} else {
			for (var lIndex in aArgs) {
				aArgs[lIndex] = fnEval(aArgs[lIndex]);
			}

			return aArgs;
		}
	};

	it(lSpec, function () {
		if (typeof aService == "function") {
			aService = aService();
		}
		// eval function args 
		fnEval(aArgs);

		// invoke method
		aService[aMethod].apply(aService, aArgs);
		waitsFor(function () {
			return (null != lResponse);
		}, lSpec, lTimeout);

		runs(function () {
			aAssertHandler(lResponse);
		});
	});
};