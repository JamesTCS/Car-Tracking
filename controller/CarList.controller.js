jQuery.sap.require("jquery.sap.storage");  

sap.ui.controller("tcs.cartracker.controller.CarList", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf calculator.calculator
*/
	onInit: function() {
	    this.storage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
	    var vehicleDB = this.storage.get("vehicleDB");  //Get Data 
	    debugger;
	    if(vehicleDB === null)  
            this.model = new sap.ui.model.json.JSONModel("model/vehicles.json");
        else {
            this.model = new sap.ui.model.json.JSONModel();
            this.model.setJSON(vehicleDB);
        }
        this.getView().setModel(this.model);
        
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
        //var model = this.getView().getModel();
        this.getView().getModel().setProperty("/vehicles/2", {name:"new car", miles: 200});
        //var data = this.getView().getModel().getData();
        var json = this.model.getJSON();
        debugger;
        //var storage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
        this.storage.put("vehicleDB", json); //Set Data  
        
    }

});