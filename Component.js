jQuery.sap.require("jquery.sap.storage");
jQuery.sap.declare("tcs.cartracker.Component");

sap.ui.core.UIComponent.extend("tcs.cartracker.Component", {
   
   createContent : function() {
       
        var storage = jQuery.sap.storage(jQuery.sap.storage.Type.local);
        var vehicleDB = storage.get("vehicleDB");  //Get Data 
        var model;
        if(vehicleDB === null)  
            model = new sap.ui.model.json.JSONModel("model/vehicles.json");
        else {
            model = new sap.ui.model.json.JSONModel();
            model.setJSON(vehicleDB);
        }
        this.setModel(model, "vehicleDB");
        
        //create views and add them to splitApp
        var splitApp = new sap.m.SplitApp("splitApp");
        var overview = new sap.ui.core.mvc.XMLView( {id:"overview", viewName:"tcs.cartracker.view.Overview"} );
        var car = new sap.ui.core.mvc.XMLView( {id:"car", viewName:"tcs.cartracker.view.Car"} );
        var carList = new sap.ui.core.mvc.XMLView( {id:"carList", viewName:"tcs.cartracker.view.CarList"} );
        var addCar = new sap.ui.core.mvc.XMLView( {id:"addCar", viewName:"tcs.cartracker.view.AddCar"} );
        splitApp.addMasterPage(carList);
        splitApp.addDetailPage(overview);
        splitApp.addDetailPage(addCar);
        splitApp.addDetailPage(car);
        
        //make split app Global - declare globals
        sap.ui.getCore().Global = new Object();
        sap.ui.getCore().Global.splitApp = splitApp;
        sap.ui.getCore().Global.context = "";
       
       return splitApp;
   }
   
   
});