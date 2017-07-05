qx.Class.define("musicmanager.LogIn", 
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
	layout.setSpacingY(10);
	layout.setSpacingX(10);
    layout.setColumnFlex(1, 1);
    this._setLayout(layout);
	

    // create the widgets
    this._createChildControl("labelLogIn");
	this._createChildControl("labelAccount");
    this.textFieldAccount = this._createChildControl("textFieldAccount");
	this._createChildControl("labelPassword");
	this.textFieldPassword = this._createChildControl("textFieldPassword");
	this.buttonLogIn = this._createChildControl("buttonLogIn");
	this.buttonClean = this._createChildControl("buttonClear");
    
  },

  properties :
  {
    appearance :
    {
      refine : true,
      init : "listitem"
    },
	
	labelLogIn :
    {
      check : "String",
      apply : "_applyLabelName",
      nullable : true
    },
    
    labelAccount :
    {
      check : "String",
      apply : "_applyLabelName",
      nullable : true
    },
	labelPassword :
    {
      check : "String",
      apply : "_applyLabelAuthor",
      nullable : true
    },
    textFieldAccount :
    {
      check : "String",
      apply : "_applyTextFieldName",
      nullable : true
    },
	textFieldPassword :
    {
      check : "String",
      apply : "_applyTextFieldAuthor",
      nullable : true
    },
    
	buttonLogin :
    {
      check : "String",
      apply : "_applyButtonAdd",
      nullable : true
    },
	
	buttonClean :
    {
      check : "String",
      apply : "_applyButtonModify",
      nullable : true
    }
	
  },

  members :
  {
	main:null,
    _dateFormat : null,
	_photo:null,
	_photos:null,
    textFieldAccount:null,
	textFieldPassword:null,
	buttonLogIn:null,
	buttonCancel:null,
	buttonClean:null,
    // overridden
    _createChildControlImpl : function(id)
    {
		var control;

		switch(id)
		{
		case "labelLogIn":
		  control = new qx.ui.basic.Label("LogIn to use the Application! ");
		  this._add(control, {row: 0, column: 0,colSpan: 3});
		  break;
		
		case "labelAccount":
		  control = new qx.ui.basic.Label("Account: ");
		  this._add(control, {row: 1, column: 0});
		  break;
		  
		case "textFieldAccount":
		  control = new qx.ui.form.TextField();
		  control.setRequired(true);
		  this._add(control, {row: 1, column: 1,colSpan: 2});
		  break; 
		  
		case "labelPassword":
		  control = new qx.ui.basic.Label("Password: ");
		  this._add(control, {row: 2, column: 0});
		  break;
		  
		case "textFieldPassword":
		  control = new qx.ui.form.PasswordField();
		  control.setRequired(true);
		  this._add(control, {row: 2, column: 1,colSpan: 2});
		  break;
		  
		case "buttonLogIn":
		  control = new qx.ui.form.Button("LogIn", "musicmanager/signIn.png");
		  control.setWidth(200);
		  var loginData = {
			textFieldAccount : this.textFieldAccount.getValue(),
			textFieldPassword : this.textFieldPassword.getValue()
			};
		  control.addListener("execute", function() {
		  this.fireDataEvent("logIn",loginData);
		  }, this);
		  this._add(control, {row: 3, column: 1});
		  break;
		  
		case "buttonClear":
		  control = new qx.ui.form.Button("Clear", "musicmanager/delete.png");
		  control.setWidth(200);
		  control.addListener("execute", function() {
		  this.fireEvent("clear");
		  }, this);
		  this._add(control, {row: 3, column: 2});
		  break;
		}
		
		return control || this.base(arguments, id);

    },
	
	_getPhoto: function(){
		// Singular resource
		var photo = new qx.io.rest.Resource({
		isLogIn: {method: "GET",url: "http://localhost:8080/musicmanager/isLogIn"},
		
		logIn: {method: "POST",url: "http://localhost:8080/musicmanager/logIn?{logIn}"}
		});
		photo.configureRequest(function(req) {
			req.setRequestHeader("Content-Type", "application/json");
		});
		return photo;
	},

	initialize: function(){
		this._photo = this._getPhoto();
	},

    _applyTime : function(value, old){
		var time = this.getChildControl("time");
		time.setValue(this._dateFormat.format(value));
    }
	
  },
  
  events : 
  {
	"clear" : "qx.event.type.Event",
    "logIn" : "qx.event.type.Data"
  },
	destruct : function()
  {
    this._dateFormat.dispose();
    this._dateFormat = null;
  }
});