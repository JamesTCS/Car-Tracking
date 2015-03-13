jQuery.sap.require("jquery.sap.storage");  

sap.ui.controller("tcs.cartracker.controller.CarList", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf calculator.calculator
*/
	onInit: function() {
<<<<<<< HEAD
	    this.model = this.getView().getModel("vehicleDB"); // not used!!
=======
	    this.model = this.getView().getModel("vehicleDB");
>>>>>>> c7d6a7f144c29ef059b988ff568fc61a7a8a062f
        
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
    
    carSelect: function(event) {
        sap.ui.getCore().Global.splitApp.toDetail("car");
        var carID = event.mParameters.listItem.oBindingContexts.vehicleDB.sPath.split("/");
        var context = event.mParameters.listItem.oBindingContexts.vehicleDB;
        //sap.ui.getCore().Global.context = context[context.length -1];
        sap.ui.getCore().byId("car").getController().changeCarData( context, carID[carID.length-1] );
<<<<<<< HEAD
        sap.ui.getCore().Global.splitApp.hideMaster();
=======
>>>>>>> c7d6a7f144c29ef059b988ff568fc61a7a8a062f

    },

    addCar: function() {
        sap.ui.getCore().Global.splitApp.toDetail("addCar");
        sap.ui.getCore().Global.splitApp.hideMaster();
        
    }

});
