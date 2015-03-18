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
	   
	   this.byId("oilTabs").setSelectedKey("oilTable"); // set oil first tab selected
	   // set table labels
       this.byId("oilTable--tableLabel").setText("Last Oil Change");
       this.byId("filterTable--tableLabel").setText("Last Filter Change");
       this.byId("tireRotationTable--tableLabel").setText("Last Tire Rotation");
	   this.byId("tireChangeTable--tableLabel").setText("Last Tire Change");
	   this.byId("brakesTable--tableLabel").setText("Last Brake Change");
	   this.byId("carWashTable--tableLabel").setText("Last Wash/Wax");
	   //set remove table labels
	   this.byId("oilRemove--tableLabel").setText("Last Oil Change");
       this.byId("filterRemove--tableLabel").setText("Last Filter Change");
       this.byId("tireRotationRemove--tableLabel").setText("Last Tire Rotation");
	   this.byId("tireChangeRemove--tableLabel").setText("Last Tire Change");
	   this.byId("brakesRemove--tableLabel").setText("Last Brake Change");
	   this.byId("carWashRemove--tableLabel").setText("Last Wash/Wax");
	   
	},
	
	changeCarData: function(context, carID) {
	    this.context = context; // set context to class variable
	    this.carID = carID; // set the car ID to class variable
	    var model = this.getView().getModel("vehicleDB");
	    var settings = model.getProperty("/settings/"+carID);
	    var vehicle = model.getProperty("/vehicles/"+carID);
	    
	    //Update Quick Info Area, bind data and calculate if maintenance is needed
	    this.byId("infoHeader").setBindingContext(context, "vehicleDB");
	    debugger;
	    // oil calculations, information, and status
	    var length = model.getProperty("/oil/"+carID).length - 1;
	    if(length < 0) {
	        this.byId("oilInfo").setText("");
	        this.byId("oilStatus").setText("No Data").setState("None");
	    }
	    else {
	        var oilContext = new sap.ui.model.Context(model, "/oil/"+carID+"/"+length);
	        var oil = model.getProperty("/oil/"+carID+"/"+length);
	        this.byId("oilInfo").setText("@ "+oil.miles+" miles, on "+oil.date); 
            this.byId("oilInfo").setBindingContext(oilContext, "vehicleDB");
            
            var difference = vehicle.miles - oil.miles;
            
            if(difference < settings.filter && difference >= (settings.oil - settings.warning) )
                this.byId("oilStatus").setText("Maintain Soon").setState("Warning");
            else if (difference > settings.oil)
                this.byId("oilStatus").setText("Requires Maintainence").setState("Error");
            else
                this.byId("oilStatus").setText("OK").setState("Success");
	    }
        
        // filter calculations, information, and status
        length = model.getProperty("/filter/"+carID).length - 1; 
        if(length < 0) {
            this.byId("filterInfo").setText("");
            this.byId("filterStatus").setText("No Data").setState("None");
        }
        else { 
            var filterContext = new  sap.ui.model.Context(model, "/filter/"+carID+"/"+length);
            var filter = model.getProperty("/filter/"+carID+"/"+length);
            this.byId("filterInfo").setText("@ "+filter.miles+" miles, on "+filter.date);
            this.byId("filterInfo").setBindingContext(filterContext, "vehicleDB"); 
            
            var difference = vehicle.miles - filter.miles;  // how many miles has it been since last filter change
            
            if(difference < settings.filter && difference >= (settings.filter - settings.warning) )
                this.byId("filterStatus").setText("Maintain Soon").setState("Warning");
            else if( difference > settings.filter)
                this.byId("filterStatus").setText("Requires Maintainence").setState("Error");
            else
                this.byId("filterStatus").setText("OK").setState("Success");
        }
        
        // tire rotation calculations, information, and status
        length = model.getProperty("/tireRotation/"+carID).length - 1; 
        if(length < 0) { // then there's no data, clear fields and state no data
            this.byId("tireRotationInfo").setText("");
            this.byId("tireRotationStatus").setText("No Data").setState("None");
        }
        else {
            var tireRotationContext = new  sap.ui.model.Context(model, "/tireRotation/"+carID+"/"+length);
            var tireRotation = model.getProperty("/tireRotation/"+carID+"/"+length);
            this.byId("tireRotationInfo").setText("@ "+tireRotation.miles+" miles, on "+tireRotation.date);
            this.byId("tireRotationInfo").setBindingContext(tireRotationContext, "vehicleDB");
            
            var difference = vehicle.miles - tireRotation.miles;  // how many miles has it been since last tire rotation
            
            if(difference < settings.tireRotation && difference >= (settings.tireRotation - settings.warning) )
                this.byId("tireRotationStatus").setText("Maintain Soon").setState("Warning");
            else if ( difference > settings.tireRotation)
                this.byId("tireRotationStatus").setText("Requires Maintainence").setState("Error");
            else
                this.byId("tireRotationStatus").setText("OK").setState("Success");
        }
        
        // tire change calculations, information, and status
        length = model.getProperty("/tireChange/"+carID).length - 1; 
        if(length < 0) { //then there's no data, clear fields and state no data
            this.byId("tireChangeInfo").setText("");
            this.byId("tireChangeStatus").setText("No Data").setState("None");
        }
        else { // show the user the latest tire change and calculate if another one is needed
            var tireChangeContext = new  sap.ui.model.Context(model, "/tireChange/"+carID+"/"+length);
            var tireChange = model.getProperty("/tireChange/"+carID+"/"+length);
            this.byId("tireChangeInfo").setText("@ "+tireChange.miles+" miles, on "+tireChange.date); 
            this.byId("tireChangeInfo").setBindingContext(tireChangeContext, "vehicleDB");
            
            var difference = vehicle.miles - tireChange.miles; // how many miles has it been since last tire change
            
            if(difference < settings.tireChange && difference >= (settings.tireChange - settings.warning) )
                this.byId("tireChangeStatus").setText("Maintain Soon").setState("Warning");
            else if ( difference > settings.changeTire)
                this.byId("tireChangeStatus").setText("Requires Maintainence").setState("Error");
            else
                this.byId("tireChangeStatus").setText("OK").setState("Success");
        }
        
        // Brakes calculations, information and status
        length = model.getProperty("/brakes/"+carID).length - 1;
        if(length < 0) { //then there's no data, clear fields and state no data
            this.byId("brakesInfo").setText("");
            this.byId("brakesStatus").setText("No Data").setState("None");
        }
        else { // show the user the latest brake change and calculate if another one is needed
            var brakesContext = new  sap.ui.model.Context(model, "/brakes/"+carID+"/"+length);
            var brakes = model.getProperty("/brakes/"+carID+"/"+length);
            this.byId("brakesInfo").setText("@ "+brakes.miles+" miles, on "+brakes.date); 
            this.byId("brakesInfo").setBindingContext(brakesContext, "vehicleDB");
            
            var difference = vehicle.miles - brakes.miles;  // how many miles has it been since brake change
            
            if( difference < settings.brakes && difference >= (settings.brakes - settings.warning) )
                this.byId("brakesStatus").setText("Maintain Soon").setState("Warning");
            else if( difference > settings.brakes)
                this.byId("brakesStatus").setText("Requires Maintainence").setState("Error");
            else
                this.byId("brakesStatus").setText("OK").setState("Success");
        }
        // car Wash/Wax calculations, information and status
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
	    
	    var sorter = new sap.ui.model.Sorter("vehicleDB>miles", true, true);
	    //bind data to table tab table and sort ****************************************************************
	    this.byId("oilTable--dataTable").bindItems("vehicleDB>/oil/" + carID, this.tableTemplate);
	    this.byId("oilTable--dataTable").getBinding("items").sort(sorter); 

	    this.byId("filterTable--dataTable").bindItems("vehicleDB>/filter/"+carID, this.tableTemplate);
	    this.byId("filterTable--dataTable").getBinding("items").sort(sorter);
	    
	    this.byId("tireRotationTable--dataTable").bindItems("vehicleDB>/tireRotation/"+carID, this.tableTemplate);
	    this.byId("tireRotationTable--dataTable").getBinding("items").sort(sorter);
	    
	    this.byId("tireChangeTable--dataTable").bindItems("vehicleDB>/tireChange/"+carID, this.tableTemplate);
	    this.byId("tireChangeTable--dataTable").getBinding("items").sort(sorter);
	    
	    this.byId("brakesTable--dataTable").bindItems("vehicleDB>/brakes/"+carID, this.tableTemplate);
	    this.byId("brakesTable--dataTable").getBinding("items").sort(sorter);
	    
	    this.byId("carWashTable--dataTable").bindItems("vehicleDB>/carWash/"+carID, this.tableTemplate);
	    this.byId("carWashTable--dataTable").getBinding("items").sort(sorter);
	    
	    
	    //bind data to remove tab table and sort ***********************************************************
	    this.byId("oilRemove--delTable").bindItems("vehicleDB>/oil/" + carID, this.tableTemplate);
	    this.byId("oilRemove--delTable").getBinding("items").sort(sorter); 
	    
	    this.byId("filterRemove--delTable").bindItems("vehicleDB>/filter/"+carID, this.tableTemplate);
	    this.byId("filterRemove--delTable").getBinding("items").sort(sorter);
	    
	    this.byId("tireRotationRemove--delTable").bindItems("vehicleDB>/tireRotation/"+carID, this.tableTemplate);
	    this.byId("tireRotationRemove--delTable").getBinding("items").sort(sorter);
	    
	    this.byId("tireChangeRemove--delTable").bindItems("vehicleDB>/tireChange/"+carID, this.tableTemplate);
	    this.byId("tireChangeRemove--delTable").getBinding("items").sort(sorter);
	    
	    this.byId("brakesRemove--delTable").bindItems("vehicleDB>/brakes/"+carID, this.tableTemplate);
	    this.byId("brakesRemove--delTable").getBinding("items").sort(sorter);
	    
	    this.byId("carWashRemove--delTable").bindItems("vehicleDB>/carWash/"+carID, this.tableTemplate);
	    this.byId("carWashRemove--delTable").getBinding("items").sort(sorter);
	    
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
	    var keys = {"oilFragment" : "/oil/", "filterFragment" : "/filter/", "tireRotationFragment" : "/tireRotation/",
	                "tireChangeFragment" : "/tireChange/", "brakesFragment" : "/brakes/", "carWashFragment" : "/carWash/"
	    };
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
	    if(length !== 0 && miles <= records[length - 1].miles ){  // check that miles is not less than the latest record, and there is a record
	        sap.m.MessageToast.show("Miles cannot be less than the previous record");
	        return;
	    }
	    
	    //Clear Fields
	    this.byId(fragment+"--miles").setValue(null);
	    this.byId(fragment+"--date").setDateValue(null);

	    //save data to model
	    debugger;
	    date = date.toDateString();
	    var serviceRecord = {"miles": miles, "date": date};
	    var serviceContext = keys[fragment];
	    model.setProperty(serviceContext+this.carID+"/"+length, serviceRecord);
	    
	    //save model to cache
	    var json = model.getJSON();
        var storage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
        storage.put("vehicleDB", json); //Set Data
	    
	    // Update Info Area
	    this.changeCarData(this.context, this.carID);
	    sap.m.MessageToast.show("Service Date and Miles have been added");
	    
	    
	},
	
	 isInt: function(x) {  // function returns if a value is an integer or not
        return (typeof x === "number") && (x % 1 === 0);
    },
    
    deleteService: function(event) {
      
        debugger;
        //get fragment
        var fragment = event.getSource().getId().split("--")[1];
        //get selected items
        var items = this.byId(fragment+"--delTable").getSelectedItems();
        //get the length of the items array
        var length = items.length;
        //if no items selected return
        if(length == 0 )
            return;
        //get model
        var model = this.getView().getModel("vehicleDB");
        //get json from model
        var json = model.getJSON();
        //convert json into object
        var data = JSON.parse(json);
        //get the category/array we are working with and set it as service Array
        var key = items[0].oBindingContexts.vehicleDB.sPath.split("/");
        var serviceArray = data[ key[1] ][ key[2] ]; 
        //remove each element from array that user selected
        for(var i=0; i < length; i++ ) {
            var keys = items[i].oBindingContexts.vehicleDB.sPath.split("/");
            data[ keys[1] ][ keys[2] ][ keys[3] ] = null;
        }
        //shift all remaining items up
        var shiftedData = [];
        for(var i=0; i < serviceArray.length; i++  ) {
            if(serviceArray[i] !== null)
                shiftedData.push(serviceArray[i] );
        }
        //store back into the model
        data[ key[1] ][ key[2] ] = shiftedData;
        model.setData(data);
        //store json into browser cache.
        
        //clear any mistakenly selected items
        this.byId(fragment+"--delTable").removeSelections();
         sap.m.MessageToast.show("Service Record Deleted");
        
    },
    
    
    setFirstTab : function(event) {  // set the first tab 'table' selected when a category is changed
        var key = event.getParameters().key;
        if(key === "oil")
            this.byId("oilTabs").setSelectedKey("oilTable");
        else if(key === "filter")
            this.byId("filterTabs").setSelectedKey("filterTable");
        else if(key === "tireRotation")
            this.byId("tireRotationTabs").setSelectedKey("tireRotationTable");
        else if(key === "tireChange")
            this.byId("tireChangeTabs").setSelectedKey("tireChangeTable");
        else if(key === "brakes")
            this.byId("brakeTabs").setSelectedKey("brakesTable");
        else if(key === "carWash")
            this.byId("carWashTabs").setSelectedKey("carWashTable");
    }

});
