jQuery.sap.require("sap.m.MessageToast");

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
	           new sap.m.Text({  text : "{vehicleDB>miles}"  })
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
	    this.context = context; // set context to class variable
	    this.carID = carID; // set the car ID to class variable
	    var model = this.getView().getModel("vehicleDB");
	    var settings = model.getProperty("/settings/"+carID);
	    var vehicle = model.getProperty("/vehicles/"+carID);
	    
	    //Update Quick Info Area, bind data and calculate if maintenance is needed
	    this.byId("infoHeader").setBindingContext(context, "vehicleDB");
	    
	    var length = model.getProperty("/oil/"+carID).length - 1;
	    var oilContext = new sap.ui.model.Context(model, "/oil/"+carID+"/"+length);
        this.byId("oilInfo").setBindingContext(oilContext, "vehicleDB");
        
        length = model.getProperty("/filter/"+carID).length - 1; 
        var filterContext = new  sap.ui.model.Context(model, "/filter/"+carID+"/"+length);
        this.byId("filterInfo").setBindingContext(filterContext, "vehicleDB"); 
        
        length = model.getProperty("/tireRotate/"+carID).length - 1; 
        var tireRotateContext = new  sap.ui.model.Context(model, "/tireRotate/"+carID+"/"+length);
        this.byId("tireRotateInfo").setBindingContext(tireRotateContext, "vehicleDB");
        
        length = model.getProperty("/tireChange/"+carID).length - 1; 
        var tireChangeContext = new  sap.ui.model.Context(model, "/tireChange/"+carID+"/"+length);
        this.byId("tireChangeInfo").setBindingContext(tireChangeContext, "vehicleDB");
        
        length = model.getProperty("/brakes/"+carID).length - 1; 
        var brakesContext = new  sap.ui.model.Context(model, "/brakes/"+carID+"/"+length);
        this.byId("brakesInfo").setBindingContext(brakesContext, "vehicleDB");
        
        length = model.getProperty("/carWash/"+carID).length - 1;  //length to get the last carWash miles
        if(length < 0) { // then there's no data, clear fields and state no data
            this.byId("carWashInfo").setText("");
            this.byId("carWashStatus").setText("No Data").setState("None");
        }
        else { // show the user the latest car wash and calculate if another one is needed
            var carWashContext = new  sap.ui.model.Context(model, "/carWash/"+carID+"/"+length);
            var carWash = model.getProperty("/carWash/"+carID+"/"+length);
            this.byId("carWashInfo").setText("@ "+carWash.miles+" miles, on "+carWash.date);
            this.byId("carWashInfo").setBindingContext(carWashContext, "vehicleDB");

            var difference = vehicle.miles - carWash.miles; // how many miles has it been since last car wash
            
            if( difference < settings.carWash && difference >= (settings.carWash - settings.warning) )
                this.byId("carWashStatus").setText("Maintain Soon").setState("Warning");
            else if (difference > settings.carWash)
                this.byId("carWashStatus").setText("Requires Maintainence").setState("Error");
            else
                this.byId("carWashStatus").setText("OK").setState("Success");
        }
	    
	    //bind data to tabs and sort
	    this.byId("oilTable").bindItems("vehicleDB>/oil/" + carID, this.tableTemplate);
	    var oilSorter = new sap.ui.model.Sorter("vehicleDB>miles", true, true);
	    this.byId("oilTable").getBinding("items").sort(oilSorter); 

	    this.byId("filterTable").bindItems("vehicleDB>/filter/"+carID, this.tableTemplate);
	    var filterSorter = new sap.ui.model.Sorter("vehicleDB>miles", true, true);
	    this.byId("filterTable").getBinding("items").sort(filterSorter);
	    
	    //testing and debuggin area
	    var oilInfo = this.byId("oilInfo");
	    var filterInfo = this.byId("filterInfo");
	    var oilTable = this.byId("oilTable");
	    var filterTable = this.byId("filterTable");
	    var infoHeader = this.byId("infoHeader");
	    var carWashInfo = this.byId("carWashInfo");
	    debugger;

	},
	
	serviced: function(event) {
	    var model = this.getView().getModel("vehicleDB");  // get the Model
	    var keys = {"oilFragment" : "/oil/"};
	    var id = event.getSource().getId();  // get the ID: id "viewName--fragmentName--ControlName"
	    var fragment = id.split("--")[1];  // parse the fragment name from id
	    var miles = parseInt( this.byId(fragment+"--miles").getValue() );
	    var date = this.byId(fragment+"--date").getDateValue();
	    
	    //validate data
	    if( !this.isInt(miles) ) { // check that miles is an integer
	        sap.m.MessageToast.show("Miles must be an integer");
	        return;
	    }
	    if( date === null) { // check that the date is not null
	        sap.m.MessageToast.show("Date cannot be blank");
	        return;
	    }
	    var records = model.getProperty(keys[fragment]+this.carID);
	    var length = records.length;
	    if( miles <= records[length - 1].miles ){  // check that miles is not less than the latest record
	        sap.m.MessageToast.show("Miles cannot be less than the previous record");
	        return;
	    }
	    
	    //save data
	    date= date.toDateString();
	    var serviceRecord = {"miles": miles, "date": date};
	    
	    
	    model.setProperty(keys[fragment]+this.carID+"/"+length, serviceRecord);
	    debugger;
	    
	    // Update Info Area
	    this.changeCarData(this.context, this.carID);
	    
	    //Clear Fields
	    this.byId(fragment+"--miles").setValue(null);
	    this.byId(fragment+"--date").setDateValue(null);
	},
	
	 isInt: function(x) {  // function returns if a value is an integer or not
        return (typeof x === "number") && (x % 1 === 0);
    }



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
