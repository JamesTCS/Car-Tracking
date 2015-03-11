

sap.ui.controller("tcs.cartracker.controller.Car", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf calculator.calculator
*/
	onInit: function() {

	   this.tableTemplate = new sap.m.ColumnListItem({
	       cells:[
	           new sap.m.Text({  text : "{vehicleDB>date}"  }),
	           new sap.m.Text({  text : "{vehicleDB>last}"  })
	       ]
	   });
	    /*
        this.getView().addEventDelegate({
           onBeforeShow: function(evt) {
                alert("Here");
           }
        
        }) */
  
	},
	
	changeCarData: function(context, carID) {
	    
	    this.byId("infoHeader").setBindingContext(context, "vehicleDB");
	    //bind data to oil tab
	    this.byId("oilTable").bindItems("vehicleDB>/oil/" + carID, this.tableTemplate);
	    debugger;
	    //context.sPath = "/oil/" + carID +"/0";
	    this.byId("oilInfo").setBindingContext(context, "vehicleDB");
	    var oilInfo = this.byId("oilInfo");
	    
	    debugger;
	}
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
    

});