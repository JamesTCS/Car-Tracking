jQuery.sap.require("jquery.sap.storage");  

sap.ui.controller("tcs.cartracker.controller.CarList", {

    clearSelection: function() {
        this.byId("carList").removeSelections(true);
    },
    
    carSelect: function(event) {
        sap.ui.getCore().Global.splitApp.toDetail("car");
        var carID = event.mParameters.listItem.oBindingContexts.vehicleDB.sPath.split("/");
        var context = event.mParameters.listItem.oBindingContexts.vehicleDB;
        //sap.ui.getCore().Global.context = context[context.length -1];
        sap.ui.getCore().byId("car").getController().changeCarData( context, carID[carID.length-1] );
        sap.ui.getCore().Global.splitApp.hideMaster();
    },

    addCar: function() {
        sap.ui.getCore().Global.splitApp.toDetail("addCar");
        sap.ui.getCore().Global.splitApp.hideMaster();
        
    }

});
