jQuery.sap.declare("tcs.cartracker.Component");

sap.ui.core.UIComponent.extend("tcs.cartracker.Component", {
   
   createContent : function() {
       var splitApp = new sap.m.SplitApp("splitApp");
       var carList = new sap.ui.core.mvc.XMLView( {id:"carList", viewName:"tcs.cartracker.view.CarList"} );
       splitApp.addPage(carList);
       return splitApp;
   }
   
});