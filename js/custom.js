var map;
require(['esri/map','esri/layers/FeatureLayer','esri/dijit/BasemapToggle','esri/renderers/SimpleRenderer',
	'esri/symbols/SimpleMarkerSymbol','esri/symbols/SimpleLineSymbol','esri/symbols/SimpleFillSymbol','esri/Color',
	'esri/dijit/Legend','dojo/on','dojo/domReady!','dojo/dom-construct'],
	function(Map,FeatureLayer,BasemapToggle,SimpleRenderer,SimpleMarkerSymbol,SimpleLineSymbol,SimpleFillSymbol,
		Color,Legend,on,domConstruct) {
		map = new Map("map",{
			basemap:"streets",
			center:[36.62,-1.115],
			zoom:14,
			slider:true
		});
		var toggle = new BasemapToggle({
			map:map,
			basemap:"satellite"
		},"BasemapToggle");
		toggle.startup();

		var boreholes = new FeatureLayer("https://services3.arcgis.com/VaEgS7CukYGae3Hm/arcgis/rest/services/limuruboreholes/FeatureServer/0/",{
                         mode:FeatureLayer.MODE_ONDEMAND
		});
		var waterTanks = new FeatureLayer("https://services3.arcgis.com/VaEgS7CukYGae3Hm/arcgis/rest/services/limuruwatertanks/FeatureServer/0/",{
                         mode:FeatureLayer.MODE_ONDEMAND
		});
		var ditributionPipes = new FeatureLayer("https://services3.arcgis.com/VaEgS7CukYGae3Hm/arcgis/rest/services/limurudistribution_pipes/FeatureServer/0/",{
                         mode:FeatureLayer.MODE_ONDEMAND
		});
		var transmissionPipes = new FeatureLayer("https://services3.arcgis.com/VaEgS7CukYGae3Hm/arcgis/rest/services/limurutransmission_pipes/FeatureServer/0/",{
                         mode:FeatureLayer.MODE_ONDEMAND
		});
		var studyArea = new FeatureLayer("https://services3.arcgis.com/VaEgS7CukYGae3Hm/arcgis/rest/services/studyareaboundary/FeatureServer/0/",{
                         mode:FeatureLayer.MODE_ONDEMAND
		});

		$('button').click(function(){
			if ($(this).text() == "Satellite") {
				map.setBasemap("satellite");
				$(this).text("Map");
			}
			else if($(this).text() == "Map"){
               map.setBasemap("streets");
               $(this).text("Satellite");

			};
		});

        var boreholeSymbol = new SimpleMarkerSymbol();
        boreholeSymbol.setStyle(SimpleMarkerSymbol.STYLE_CIRCLE);
        boreholeSymbol.setSize(12);
        boreholeSymbol.setColor(new Color([0,0,255]));
        boreholes.setRenderer(new SimpleRenderer(boreholeSymbol));

        var tankSymbol = new SimpleMarkerSymbol();
        tankSymbol.setStyle(SimpleMarkerSymbol.STYLE_CIRCLE);
        tankSymbol.setSize(12);
        tankSymbol.setColor(new Color([255,198,26]));
        waterTanks.setRenderer(new SimpleRenderer(tankSymbol));

        var ditributionSymbol = new SimpleLineSymbol();
        ditributionSymbol.setStyle(SimpleLineSymbol.STYLE_SOLID);
        ditributionSymbol.setWidth(2);
        ditributionSymbol.setColor(new Color([0,0,255]));
        ditributionPipes.setRenderer(new SimpleRenderer(ditributionSymbol));

        var transmissionSymbol = new SimpleLineSymbol();
        transmissionSymbol.setStyle(SimpleLineSymbol.STYLE_SOLID);
        transmissionSymbol.setWidth(2);
        transmissionSymbol.setColor(new Color([230, 0, 172]));
        transmissionPipes.setRenderer(new SimpleRenderer(transmissionSymbol));

        var studyareaSymbol = new SimpleFillSymbol();
        studyareaSymbol.setStyle(SimpleFillSymbol.STYLE_NULL);
        studyareaSymbol.setOutline(new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASH,new Color([255,0,0]),3));
        studyArea.setRenderer(new SimpleRenderer(studyareaSymbol));

		map.addLayers([boreholes,waterTanks,ditributionPipes,transmissionPipes,studyArea]);
        
       map.on("layers-add-result",function(evt){
                         var layerInfo = dojo.map(evt.layers,function(layer,index){
                                  return {layer:layer.layer,title:layer.layer.name};
                                 });
                         if (layerInfo.length >0){
                    var legendDijit = new esri.dijit.Legend({map:map,layerInfos:layerInfo},"LegendDiv");
                    legendDijit.startup();
                      }
                   });
});