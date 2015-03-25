jQuery.sap.require("sap.m.MessageToast");

sap.ui.controller("tcs.cartracker.controller.AddCar", {

	onInit: function() {
    
	},

    addCar: function() {
        var name = this.byId("name").getValue();
        var miles = parseInt( this.byId("miles").getValue() );
        this.byId("miles").setValue("");
        this.byId("name").setValue("");
        var valid = true;
        
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
            //var blankArray = [{"miles":0, "date": "today"}];
            var car = new Object();
            car.name = name;
            car.miles = miles;
            var defaultSettings = {"oil": 3000, "oilWar" : 500, "filter": 9000, "filterWar": 500, "tireRotation": 7500, "tireRotationWar": 500, "tireChange": 30000, "tireChangeWar": 2000, "brakes": 30000, "brakesWar": 1000, "carWash": 10000, "carWashWar": 100};
            
            vehModel.setProperty(context, car);
            vehModel.setProperty("/settings/"+ vehObject.settings.length, defaultSettings );
            vehModel.setProperty("/oil/"+ vehObject.oil.length, [] );
            vehModel.setProperty("/filter/"+ vehObject.filter.length, [] );
            vehModel.setProperty("/tireRotation/"+ vehObject.tireRotation.length, [] );
            vehModel.setProperty("/tireChange/"+ vehObject.tireChange.length, [] );
            vehModel.setProperty("/brakes/"+ vehObject.brakes.length, [] );
            vehModel.setProperty("/carWash/"+ vehObject.carWash.length, [] );
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