jQuery.sap.require("sap.m.MessageToast");

sap.ui.controller("tcs.cartracker.controller.AddCar", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf calculator.calculator
*/
	onInit: function() {
    
	},

/** 
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf calculator.calculator
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf calculator.calculator
*/

/**
	onAfterRendering: function() {

	},
*/

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf calculator.calculator
*/
//	onExit: function() {
//
//	}
    addCar: function() {
        var name = this.byId("name").getValue();
        var miles = parseInt( this.byId("miles").getValue() );
        var valid = true;
        debugger;
        if(name === "") {
            valid = false;
            sap.m.MessageToast.show("Name cannot be empty");
        }
        else if(miles === NaN) {
            sap.m.MessageToast.show("Miles cannot be empty");
            valid = false;
        }
        else if( !this.isInt(miles) ) {
            sap.m.MessageToast.show("Miles must be an integer");
            valid = false;
        }
        
        if(valid) { // if data is valid add car to model
            var vehModel = this.getView().getModel("vehicleDB");
            var vehObject = vehModel.getData();
            var context = "/vehicles/" + vehObject.vehicles.length;
            var car = new Object();
            car.name = name;
            car.miles = miles;
            vehModel.setProperty(context, car);
            var json = vehModel.getJSON();
            var storage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
            storage.put("vehicleDB", json); //Set Data  
            sap.m.MessageToast.show("Car Saved");
        }
    },
    
    isInt: function(x) {
        return (typeof x === "number") && (x % 1 === 0);
    }

});