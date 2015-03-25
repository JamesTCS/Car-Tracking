jQuery.sap.require("sap.m.MessageToast");


sap.ui.controller("tcs.cartracker.controller.Settings", {
    
    backBtnPress: function(event) {
        if(this.deleted) // if car is deleted go back to overview page
	        sap.ui.getCore().Global.splitApp.backToPage("overview");
	    else // car is not deleted so go back to vehicle details page
	        sap.ui.getCore().Global.splitApp.backToPage("car");
	},
    
    //'War' is short for 'Warning' 
    
    updateFields: function(carID) {
        this.carID = carID;  // carID needs to be known throughout controller
        this.deleted = false; // is the car deleted flag, we got here so it's not.
        var model = this.getView().getModel("vehicleDB");
        var json = model.getJSON();
        var object = JSON.parse(json);
        var settings = object.settings[carID];

        this.byId("oil").setValue(settings.oil);
        this.byId("oilWar").setValue(settings.oilWar);
        
        this.byId("filter").setValue(settings.filter);
        this.byId("filterWar").setValue(settings.filterWar);
        
        this.byId("tireRotation").setValue(settings.tireRotation);
        this.byId("tireRotationWar").setValue(settings.tireRotationWar);
        
        this.byId("tireChange").setValue(settings.tireChange);
        this.byId("tireChangeWar").setValue(settings.tireChangeWar);
        
        this.byId("brakes").setValue(settings.brakes);
        this.byId("brakesWar").setValue(settings.brakesWar);
        
        this.byId("carWash").setValue(settings.carWashWar);
        this.byId("carWashWar").setValue(settings.carWashWar);
    },
    
    saveSettings: function(event) {
        if(this.deleted)
            return; // car has been deleted, no reason to try and save.
        //validate data
        var aValues = [];
        
        var oil = parseInt( this.byId("oil").getValue() );
        var oilWar = parseInt( this.byId("oilWar").getValue() );
        aValues.push(oil); aValues.push(oilWar);
        
        var filter = parseInt( this.byId("filter").getValue() );
        var filterWar = parseInt( this.byId("filterWar").getValue() );
        aValues.push(filter); aValues.push(filterWar);
        
        var tireRotation = parseInt( this.byId("tireRotation").getValue() );
        var tireRotationWar = parseInt( this.byId("tireRotationWar").getValue() );
        aValues.push(tireRotation); aValues.push(tireRotationWar);
        
        var tireChange = parseInt( this.byId("tireChange").getValue() );
        var tireChangeWar = parseInt( this.byId("tireChangeWar").getValue() );
        aValues.push(tireChange); aValues.push(tireChangeWar);
        
        var brakes = parseInt( this.byId("brakes").getValue() );
        var brakesWar = parseInt( this.byId("brakesWar").getValue() );
        aValues.push(brakes); aValues.push(brakesWar);
        
        var carWash = parseInt( this.byId("carWash").getValue() );
        var carWashWar = parseInt( this.byId("carWashWar").getValue() );
        aValues.push(carWash); aValues.push(carWashWar);
        
        for(var i=0; i < aValues.length; i++) {
            if(!this.isInt(aValues[i]) ) {
                sap.m.MessageToast.show("All values must be an integer and not empty");
                return;
            }
        }
        
        var model = this.getView().getModel("vehicleDB");
        var settings = model.getProperty("/settings/"+this.carID); // get the settings object from json model
        // update the settings object with new values
        settings.oil = oil; settings.oilWar = oilWar;
        settings.filter = filter; settings.filterWar = filterWar;
        settings.tireRotation = tireRotation; settings.tireRotationWar = tireRotationWar;
        settings.tireChange = tireChange; settings.tireChangeWar = tireChangeWar;
        settings.brakes = brakes; settings.brakesWar = brakesWar;
        settings.carWash = carWash; settings.carWashWar = carWashWar;
        // put the settings object back into the model
        model.setProperty("/settings/"+this.carID, settings);
        
        //save our model
        var json = model.getJSON();
        var storage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
        storage.put("vehicleDB", json); //Set Data  
        sap.m.MessageToast.show("Settings Saved");
    },
    
    isInt: function(x) {
        return (typeof x === "number") && (x % 1 === 0);
    },
    
    deleteCar: function() {
        var model = this.getView().getModel("vehicleDB");
        var json = model.getJSON();
        var data = JSON.parse(json);
        
        data.vehicles[this.carID] = null;
        data.settings[this.carID] = null;
        data.oil[this.carID] = null;
        data.filter[this.carID] = null;
        data.tireRotation[this.carID] = null;
        data.tireChange[this.carID] = null;
        data.brakes[this.carID] = null;
        data.carWash[this.carID] = null;
        
        data.vehicles = this.shiftArray(data.vehicles);
        data.settings = this.shiftArray(data.settings);
        data.oil = this.shiftArray(data.oil);
        data.filter = this.shiftArray(data.filter);
        data.tireRotation = this.shiftArray(data.tireRotation);
        data.tireChange = this.shiftArray(data.tireChange);
        data.brakes = this.shiftArray(data.brakes);
        data.carWash = this.shiftArray(data.carWash);
        
        model.setData(data);
        json = model.getJSON();
        var storage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
        storage.put("vehicleDB", json); //Set Data  
        sap.m.MessageToast.show("Car Deleted");
        
        this.deleted = true;
    },
    
    shiftArray: function(array) { //take an array, shift all elements to remove any null elements
        var newArray = [];
        for(var i=0; i < array.length; i++ ) {
            if(array[i] !== null)
                newArray.push(array[i]);
        }
        return newArray;
    }
    
});