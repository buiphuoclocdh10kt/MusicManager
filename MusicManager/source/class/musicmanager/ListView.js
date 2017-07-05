qx.Class.define("musicmanager.ListView", 
{
	extend : qx.ui.container.Composite,
			 

  construct : function()
  {
      this.base(arguments);
      this.setWidth(1880);
	  this.setHeight(950);
      var gridMusicSong = new qx.ui.layout.Grid();
      gridMusicSong.setSpacing(5);
	  gridMusicSong.setSpacingX(10);
	  //gridMusicSong.setAlignX("center");
	  //gridMusicSong.setAlignY("middle");
	  this.setLayout(gridMusicSong);
	  //create button, label, textField
	  var labelName = new qx.ui.basic.Label("Name: ");
	  this.add(labelName, {row:0, column:0});
	  
	  var textFieldName= new qx.ui.form.TextField("");
	  this.add(textFieldName,{row:0, column:1});
	  textFieldName.setWidth(400);
	  textFieldName.setRequired(true);
	  
	  var labelAuthor = new qx.ui.basic.Label("Author: ");
	  this.add(labelAuthor,{row:0, column:3});
	  
	  var textFieldAuthor= new qx.ui.form.TextField("");
	  this.add(textFieldAuthor,{row:0, column:4});
	  textFieldAuthor.setWidth(400);
	  
	  var checkBoxPublic = new qx.ui.form.CheckBox("Publish");
	  this.add(checkBoxPublic,{row:0,column:5})
	  
	  var buttonAdd = new qx.ui.form.Button("Add    ", "musicmanager/add.png");
	  this.add(buttonAdd,{row:0, column:7});
	  buttonAdd.setWidth(100);
	  
	  var buttonModify = new qx.ui.form.Button("Modify    ", "musicmanager/modify.png");
	  this.add(buttonModify,{row:0, column:8});
	  buttonModify.setEnabled(false);
	  buttonModify.setWidth(100);
	  
	  var buttonDelete = new qx.ui.form.Button("Delete ", "musicmanager/delete.png");
	  this.add(buttonDelete,{row:0, column:9});
	  buttonDelete.setEnabled(false);
	  buttonDelete.setWidth(100);

	  var labelSearch = new qx.ui.basic.Label("Search: ");
	  this.add(labelSearch,{row:0, column:11});
	  
	  var textFieldSearch= new qx.ui.form.TextField("");
	  this.add(textFieldSearch,{row:0, column:12});
	  textFieldSearch.setWidth(300);
	  textFieldSearch.setPlaceholder("Enter a song name!");
	  
	  var buttonSearch = new qx.ui.form.Button("Search", "musicmanager/search.png");
	  this.add(buttonSearch,{row:0, column:14});
	  buttonSearch.setWidth(100);
	  
	  // Singular resource
	  var photo = new qx.io.rest.Resource({
	  // Retrieve photo
	  get: {
	   method: "GET",
	   url: "http://localhost:8080/myapp/search?{name}"
	  },
	  // Update photo
	  put: {
		method: "POST",
		url: "http://localhost:8080/myapp/modify?{id}"
	  },
	  // Delete photo
	  del: {
		method: "DELETE",
		url: "http://localhost:8080/myapp/delete?{id}"
	  }
	  });
	  // Plural resource
	  var photos = new qx.io.rest.Resource({
	  // Retrieve list of photos
	  get: {
	   method: "GET",
	   url: "http://localhost:8080/myapp/get"
	  },
	  // Create photo
	  post: {
		method: "POST",
		url: "http://localhost:8080/myapp/add?{add}"
	  }
	  });

	  photo.configureRequest(function(req) {
	  req.setRequestHeader("Content-Type", "application/json");
	  });
	  photos.configureRequest(function(req) {
	  req.setRequestHeader("Content-Type", "application/json");
	  });
	  var tableSong = new qx.ui.table.Table();
	  
	  photos.get();
	  photos.addListener("getSuccess", function(e) { 
	  tableSong.getEmptyTableModel();
	  var data=e.getData();
	  var tableSongModel = new qx.ui.table.model.Simple();
	  tableSongModel.setColumnIds(["id","name", "author","status"]);
	  tableSongModel.setColumnNamesByIndex(["ID","Name", "Author","Status"]);
	  tableSongModel.setDataAsMapArray(data);
	  tableSong.setTableModel(tableSongModel);
	  tableSong.setColumnWidth(1, 770);
	  tableSong.setColumnWidth(2, 719);
	  tableSong.setColumnWidth(3, 270);
	  tableSong.setHeight(800);
	  });
	  var contextMenu=new musicmanager.ContextMenu();
	  //var getContextMenu=this.getContextMenu();
	  tableSong.setContextMenu(contextMenu);
	  this.add(tableSong,{row:2, column:0,colSpan: 22});
	  tableSong.addListener("cellTap", function(e){
		var index=tableSong.getFocusedRow();
		var valueName=tableSong.getTableModel().getRowData(index)[1];
		var valueAuthor=tableSong.getTableModel().getRowData(index)[2];
		textFieldName.setValue(valueName);
		textFieldAuthor.setValue(valueAuthor);
		buttonDelete.setEnabled(true);
		buttonModify.setEnabled(true);
	  });			

      // create a model
      var modelSkeleton = {Name: null,Author: null};
      var model = qx.data.marshal.Json.createModel(modelSkeleton);
	  var controller = new qx.data.controller.Object(model);

      // connect the name
      controller.addTarget(textFieldName, "value", "name", true);
	  controller.addTarget(textFieldAuthor, "value", "author", true);
	  // mark the fields as required
      
	  var manager = new qx.ui.form.validation.Manager();
	  manager.add(textFieldName);
	  manager.add(textFieldAuthor);
	  
	  // serializer for qooxdoo objects
      var qxSerializer = function(object) {
        if (object instanceof qx.ui.form.ListItem) {
          return object.getLabel();
        }
      }
	  //ADD button listening
      buttonAdd.addListener("execute",function(e) {
        if (manager.validate()) {
			if(checkBoxPublic.getValue())
				var valueCheckBox = true;
			else valueCheckBox=false;
		  photos.post({add:"name="+textFieldName.getValue()+"&author="+textFieldAuthor.getValue()+"&status="+valueCheckBox});
		  textFieldName.setValue("");
		  textFieldAuthor.setValue("");
		  setTimeout(function(){
		photos.get();
		}, 1000);
        }
	  },this);
      //DELETE button listening
	  buttonDelete.addListener("execute",function(e){
		alert("Do you want delete this Song?");
		var index=tableSong.getFocusedRow();
		var del=tableSong.getTableModel().getRowData(index)[0];
		photo.del({id: "id="+del});
		setTimeout(function(){
		photos.get();
		}, 1000);
		
	  });
	  //SEARCH button listening
	  buttonSearch.addListener("execute",function(e){
		  photo.get({name: "name="+textFieldSearch.getValue()});
		  tableSong.getEmptyTableModel();
		  setTimeout(function(){
		photos.get();
		}, 1000);
	  });
	  //buttonModify.addListener(e)
	  
	 
  },
  members:{
	  
  }
});