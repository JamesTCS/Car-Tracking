sap.ui.controller("tcs.cartracker.controller.Overview", {

	onInit: function() {

	    var json = {
	                "mileage":[
            	        {"entry":1,"miles":10000},
            	        {"entry":2,"miles":12000},
            	        {"entry":3,"miles":18000},
            	        {"entry":4,"miles":25000},
            	        {"entry":5,"miles":35000}
            	     ]
            	    };

		var hondaGraph = this.getView().byId("hondaGraph");
		var oModel = new sap.ui.model.json.JSONModel(json);
		var oDataset = new sap.viz.ui5.data.FlattenedDataset({
			dimensions: [{
				name: 'Entry',
				value: "{entry}"
      }],
			measures: [
				{
					name: 'Miles',
					value: '{miles}'
      }],
			data: {
				path: "/mileage"
			}
		});

		hondaGraph.setVizProperties({
			valueAxis : {
            label : {
                   formatString : 'u'
            }
          },
          
          title: {
              visible: false
          },
          
          legend: {
              visible: false
          },
          dataLabel: {
              visible: true
          }
          
		});
		hondaGraph.setDataset(oDataset);
		hondaGraph.setModel(oModel);

		var feedPrimaryValues = new sap.viz.ui5.controls.common.feeds.FeedItem({
				'uid': "primaryValues",
				'type': "Measure",
				'values': ["Miles"]
			}),
			feedAxisLabels = new sap.viz.ui5.controls.common.feeds.FeedItem({
				'uid': "axisLabels",
				'type': "Dimension",
				'values': ["Entry"]
			});


		hondaGraph.addFeed(feedPrimaryValues);
		hondaGraph.addFeed(feedAxisLabels);
		
		////////////////////////////////////////////////////////////////////////////
		
		var json = {
	                "mileage":[
            	        {"entry":1,"miles":155000},
            	        {"entry":2,"miles":160000},
            	        {"entry":3,"miles":175000},
            	        {"entry":4,"miles":180000},
            	        {"entry":5,"miles":187664}
            	     ]
            	    };

		var cadillacGraph = this.getView().byId("cadillacGraph");
		var oModel = new sap.ui.model.json.JSONModel(json);
		var oDataset = new sap.viz.ui5.data.FlattenedDataset({
			dimensions: [{
				name: 'Entry',
				value: "{entry}"
      }],
			measures: [
				{
					name: 'Miles',
					value: '{miles}'
      }],
			data: {
				path: "/mileage"
			}
		});

		cadillacGraph.setVizProperties({
			valueAxis : {
            label : {
                   formatString : 'u'
            }
          },
          
          title: {
              visible: false
          },
          
          legend: {
              visible: false
          },
          dataLabel: {
              visible: true
          }
          
		});
		cadillacGraph.setDataset(oDataset);
		cadillacGraph.setModel(oModel);

		var feedPrimaryValues = new sap.viz.ui5.controls.common.feeds.FeedItem({
				'uid': "primaryValues",
				'type': "Measure",
				'values': ["Miles"]
			}),
			feedAxisLabels = new sap.viz.ui5.controls.common.feeds.FeedItem({
				'uid': "axisLabels",
				'type': "Dimension",
				'values': ["Entry"]
			});


		cadillacGraph.addFeed(feedPrimaryValues);
		cadillacGraph.addFeed(feedAxisLabels);
		
		
		
		
	}

});