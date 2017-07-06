qx.Class.define("musicmanager.CustomWidget", 
{
  extend : qx.ui.core.Widget,
  include : [qx.ui.form.MModelProperty],

  construct : function()
  {
    this.base(arguments);
	
	this.initialize();
		  
    // create a date format like "June 18, 2010 9:31 AM"
    this._dateFormat = new qx.util.format.DateFormat(
		qx.locale.Date.getDateFormat("long") + " " +
		qx.locale.Date.getTimeFormat("short")
    );
    
    // initialize the layout and allow wrap for "post" 
    var layout = new qx.ui.layout.Grid();
	layout.setSpacingY(5);
	layout.setSpacingX(10);
    layout.setColumnFlex(1, 1);
    this._setLayout(layout);
	

    // create the widgets
    this._createChildControl("labelName");
    this.textFieldName = this._createChildControl("textFieldName");
    this._createChildControl("labelAuthor");
	this.textFieldAuthor = this._createChildControl("textFieldAuthor");
    this.checkBoxPublic = this._createChildControl("checkBoxPublic");
    this.buttonAdd = this._createChildControl("buttonAdd");
	this.buttonModify = this._createChildControl("buttonModify");
    this.buttonDelete = this._createChildControl("buttonDelete");
    this._createChildControl("labelSearch");
	this.textFieldSearch = this._createChildControl("textFieldSearch");
    this.buttonSearch = this._createChildControl("buttonSearch");
	this.buttonRefresh = this._createChildControl("buttonRefresh");
	this.tableSong = this._createChildControl("tableSong");
	
	  //tableSong Listener
	this.songs.get();
	this.songs.addListener("getSuccess", this._onGetSuccess, this);
	this.tableSong.addListener("cellTap", this._onCellTap,this);
	var contextMenu=new musicmanager.ContextMenu();
    contextMenu.addListener("deleteContextMenu",this._onExecuteDelete,this);
    this.tableSong.setContextMenu(contextMenu);
	//buttonAdd Listener
	this.manager=this._getAdd();
	this.addListener("add",this._onExecuteAdd,this);
	//buttonDelete Listener
	this.addListener("delete",this._onExecuteDelete,this);
	//buttonSearch Listener
	this.addListener("search",this._onExecuteSearch,this);
	//buttonModify Listener
	this.addListener("modify",this._onExecuteModify,this);
	//buttonRefresh Listener
	this.addListener("refresh", this._onExecuteRefresh,this);
  },

  properties :
  {
    appearance :
    {
      refine : true,
      init : "listitem"
    },
    
    labelName :
    {
      check : "String",
      apply : "_applyLabelName",
      nullable : true
    },
	labelAuthor :
    {
      check : "String",
      apply : "_applyLabelAuthor",
      nullable : true
    },
    textFieldName :
    {
      check : "String",
      apply : "_applyTextFieldName",
      nullable : true
    },
	textFieldAuthor :
    {
      check : "String",
      apply : "_applyTextFieldAuthor",
      nullable : true
    },
    
    checkBoxPublic :
    {
      check : "boolean",
      apply : "_applyCheckBoxPublic",
      nullable : true
    },
	buttonAdd :
    {
      check : "String",
      apply : "_applyButtonAdd",
      nullable : true
    },
	buttonModify :
    {
      check : "String",
      apply : "_applyButtonModify",
      nullable : true
    },
	buttonDelete :
    {
      check : "String",
      apply : "_applyButtonDelete",
      nullable : true
    },
	labelSearch :
    {
      check : "String",
      apply : "_applyLabelSearch",
      nullable : true
    },
	textFieldSearch :
    {
      check : "String",
      apply : "_applyTextFieldSearch",
      nullable : true
    },
	buttonSearch :
    {
      check : "String",
      apply : "_applyButtonSearch",
      nullable : true
    },
	tableSong :
	{
	  check : "",
      apply : "_applycontrol",
      nullable : true
	},
	buttonRefresh :
	{
	  check : "",
      apply : "_applycontrol",
      nullable : true
	}
	
  },

  members :
  {
    _dateFormat : null,
	song:null,
	songs:null,
    textFieldName:null,
	textFieldAuthor:null,
	checkBoxPublic:null,
	buttonDelete:null,
	buttonModify:null,
	buttonAdd:null,
	textFieldSearch:null,
	buttonSearch:null,
	tableSong:null,
	manager:null,
	buttonRefresh:null,
    // overridden
    _createChildControlImpl : function(id)
    {
		var control;

		switch(id)
		{
		case "labelName":
		  control = new qx.ui.basic.Label("Name: ");
		  this._add(control, {row: 0, column: 0});
		  break;
		  
		case "textFieldName":
		  control = new qx.ui.form.TextField();
		  control.setWidth(390);
		  control.setRequired(true);
		  this._add(control, {row: 0, column: 1});
		  break; 
		  
		case "labelAuthor":
		  control = new qx.ui.basic.Label("Author: ");
		  this._add(control, {row: 0, column: 2});
		  break;
		  
		case "textFieldAuthor":
		  control = new qx.ui.form.TextField();
		  control.setWidth(390);
		  this._add(control, {row: 0, column: 3});
		  break;
		  
		case "checkBoxPublic":
		  control = new qx.ui.form.CheckBox("Public");
		  control.setWidth(70);
		  this._add(control, {row: 0, column: 5});
		  break;
		  
		case "buttonAdd":
		  control = new qx.ui.form.Button("Add", "musicmanager/add.png");
		  control.setWidth(100);
		  var addData = {
			textFieldName : this.textFieldName.getValue(),
			textFieldAuthor : this.textFieldAuthor.getValue(),
			_getAdd: this._getAdd()
			};
		  control.addListener("execute", function() {
		  this.fireDataEvent("add",addData);
		  }, this);
		  this._add(control, {row: 0, column: 6});
		  break;
		  
		case "buttonModify":
		  control = new qx.ui.form.Button("Modify", "musicmanager/modify.png");
		  control.setEnabled(false);
		  control.setWidth(100);
		  var modifyData = {
			textFieldName : this.textFieldName.getValue(),
			textFieldAuthor : this.textFieldAuthor.getValue(),
			checkBoxPublic : this.checkBoxPublic.getValue(),
			_getAdd: this._getAdd()
			};
		  control.addListener("execute", function() {
		  this.fireDataEvent("modify",modifyData);
		  }, this);
		  this._add(control, {row: 0, column: 7});
		  break;
		  
		case "buttonDelete":
		  control = new qx.ui.form.Button("Delete", "musicmanager/delete.png");
		  control.setEnabled(false);
		  control.setWidth(100);
		  control.addListener("execute", function() {
		  this.fireEvent("delete");
		  }, this);
		  this._add(control, {row: 0, column: 8});
		  break;
		  
		case "labelSearch":
		  control = new qx.ui.basic.Label("Search: ");
		  this._add(control, {row: 0, column: 10});
		  break; 
		  
		case "textFieldSearch":
		  control = new qx.ui.form.TextField();
		  control.setWidth(300);
		  control.setPlaceholder("Enter a song name...");
		  this._add(control, {row: 0, column: 11});
		  break;
		  
		case "buttonSearch":
		  control = new qx.ui.form.Button("Search", "musicmanager/search.png");
		  control.setWidth(100);
		  var searchData = {
			textFieldSearch : this.textFieldSearch.getValue()
			};
		  control.addListener("execute", function() {
		  this.fireDataEvent("search",searchData);
		  }, this);
		  this._add(control, {row: 0, column: 12});
		  break;
		  
		case "buttonRefresh":
		  var control=new qx.ui.form.Button("Refresh","musicmanager/refresh.png")
		  control.setWidth(100);
		  control.addListener("execute", function() {
		  this.fireEvent("refresh");
		  }, this);
		  this._add(control,{row:0, column:13});
		  break;
		
		case "tableSong":
		  var control = new qx.ui.table.Table();
		  control.setHeight(950);
		  this._add(control,{row:1, column:0,colSpan: 14});			
		  break;
		}
		
		return control || this.base(arguments, id);
    },

    _applyTime : function(value, old){
		var time = this.getChildControl("time");
		time.setValue(this._dateFormat.format(value));
    },
	getSong: function(){
		// Singular resource
		var newSong = new qx.io.rest.Resource({
		// Retrieve photo
		get: {method: "GET",url: "http://localhost:8080/musicmanager/search?{name}"},
		// Update photo
		put: {method: "PUT",url: "http://localhost:8080/musicmanager/modify?{id}"},
		// Delete photo
		del: {method: "DELETE",url: "http://localhost:8080/musicmanager/delete?{id}"}
		});
		newSong.configureRequest(function(req) {
			req.setRequestHeader("Content-Type", "application/json");
		});
		return newSong;
	},
	getSongs: function(){
		var newSongs = new qx.io.rest.Resource({
		get: {method: "GET",url: "http://localhost:8080/musicmanager/selectSongByUserId"},
		post: {method: "POST",url: "http://localhost:8080/musicmanager/add?{add}"}
		});
		newSongs.configureRequest(function(req) {
			req.setRequestHeader("Content-Type", "application/json");
		});
		return newSongs;
	},
	_getAdd: function(){
		// mark the fields as required
		var managerAdd = new qx.ui.form.validation.Manager();
		managerAdd.add(this.textFieldName);
		managerAdd.add(this.textFieldAuthor);
		// serializer for qooxdoo objects
		return managerAdd;
	},
	initialize: function(){
		this.song = this.getSong();
		this.songs = this.getSongs();
	},
	_onGetSuccess: function(e){
		this.tableSong.getEmptyTableModel();
		var data=e.getData();
		var controlModel = new qx.ui.table.model.Simple();
		controlModel.setColumnIds(["id","name", "author","status"]);
		controlModel.setColumnNamesByIndex(["ID","Name", "Author","Share"]);
		controlModel.setDataAsMapArray(data);
		
		
		this.tableSong.setTableModel(controlModel);
		this.tableSong.setColumnWidth(1, 770);
		this.tableSong.setColumnWidth(2, 719);
		this.tableSong.setColumnWidth(3, 270);
		this.tableSong.setHeight(850);
		var length = controlModel.getRowCount();
		for(var i=1;i<length;i++){
			if(controlModel.getRowData(i)[3]==true){
				var newRenderer = new qx.ui.table.cellrenderer.Conditional("right", "", "", "");
				newRenderer.addNumericCondition("==", "true",   null, "#87CEFA", null, null);
				newRenderer.addNumericCondition("==", "false",   null, "#FF0000", null, null);
				this.tableSong.getTableColumnModel().setDataCellRenderer(3, newRenderer);
			}
		}
	},
	_onCellTap: function(e){	
		var index=this.tableSong.getFocusedRow();
		var valueName=this.tableSong.getTableModel().getRowData(index)[1];
		var valueAuthor=this.tableSong.getTableModel().getRowData(index)[2];
		var valuePublic=this.tableSong.getTableModel().getRowData(index)[3];
		this.textFieldName.setValue(valueName);
		this.textFieldAuthor.setValue(valueAuthor);
		this.checkBoxPublic.setValue(valuePublic);
		this.buttonDelete.setEnabled(true);
		this.buttonModify.setEnabled(true);
	},
	_onExecuteAdd: function(){
	    if (this.manager.validate()) {
			if(this.checkBoxPublic.getValue())
				var valueCheckBox = true;
			else valueCheckBox=false;
			this.songs.post({add:"name="+this.textFieldName.getValue()+"&author="+this.textFieldAuthor.getValue()+"&status="+valueCheckBox});
			this.songs.addListener("postSuccess",function(){
				this.textFieldName.setValue("");
				this.textFieldAuthor.setValue("");
				this.songs.get();
			},this);
		}  
	},
	_onExecuteDelete: function(){
		alert("Do you want delete this Song?");
		var index=this.tableSong.getFocusedRow();
		var del=this.tableSong.getTableModel().getRowData(index)[0];
		this.song.del({id: "id="+del});
		this.song.addListener("delSuccess",function(){
				this.textFieldName.setValue("");
				this.textFieldAuthor.setValue("");
				this.songs.get();
			},this);
	},
	_onExecuteSearch: function(){
		this.song.get({name: "name="+this.textFieldSearch.getValue()});
		this.song.addListener("getSuccess", this._onGetSuccess, this);
	},
	_onExecuteModify: function(){
		if (this.manager.validate()) {
			var index=this.tableSong.getFocusedRow();
			var id=this.tableSong.getTableModel().getRowData(index)[0];
			if(this.checkBoxPublic.getValue())
				var valueCheckBox = true;
			else valueCheckBox=false;
			this.song.put({id: "id="+id+"&name="+this.textFieldName.getValue()+"&author="+this.textFieldAuthor.getValue()+"&status="+valueCheckBox});
			this.song.addListener("putSuccess",function(){
				this.textFieldName.setValue("");
				this.textFieldAuthor.setValue("");
				this.songs.get();
			},this);
		}
	},
	_onExecuteRefresh: function(){
		this.textFieldName.setValue("");
		this.textFieldAuthor.setValue("");
		this.textFieldSearch.setValue("");
		this.checkBoxPublic.setValue(false);
		this.buttonDelete.setEnabled(false);
		this.buttonModify.setEnabled(false);
		this.tableSong.resetSelection();
		this.songs.get();
	}

  },
  
  events : 
  {
    "add" : "qx.event.type.Data",
	"modify" : "qx.event.type.Data",
	"delete" : "qx.event.type.Event",
	"search" : "qx.event.type.Data",
	"signOut" : "qx.event.type.Data",
	"refresh" : "qx.event.type.Event"
  },
  
  destruct : function()
  {
    this._dateFormat.dispose();
    this._dateFormat = null;
  }
});