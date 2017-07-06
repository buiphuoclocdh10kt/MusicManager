/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/**
 * This is the main application class of your custom application "MUSICMANAGER"
 *
 * @asset(musicmanager/*)
 */
qx.Class.define("musicmanager.Application",
{
  extend : qx.application.Standalone,



  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */

  members :
  {
    /**
     * This method contains the initial application code and gets called 
     * during startup of the application
     * 
     * @lint ignoreDeprecated(alert)
     */
	 song:null,
	 bar:null,
	 view:null,
	 root:null,
	 logIn:null,
	 textFieldAccount:null,
	 textFieldPassword:null,
	 songLogIn:null,
    main : function()
    {
      // Call super class
      this.base(arguments);

      // Enable logging in debug variant
      if (qx.core.Environment.get("qx.debug"))
      {
        // support native logging capabilities, e.g. Firebug for Firefox
        qx.log.appender.Native;
        // support additional cross-browser console. Press F7 to toggle visibility
        qx.log.appender.Console;
      }

      /*
      -------------------------------------------------------------------------
        Below is your actual application code...
      -------------------------------------------------------------------------
      */
	  this.bar = new musicmanager.MainWindow();
	  this.logIn = new musicmanager.LogIn();
	  this.root=this.getRoot();
	  this.initialize();
	  this.root.setBackgroundColor("#87CEFA");
	  this.textFieldAccount = this.logIn.getChildControl("textFieldAccount");
	  this.textFieldPassword = this.logIn.getChildControl("textFieldPassword");
	  this.song.isLogIn();
	  this.song.addListener("isLogInSuccess", function(e){
		  if(e.getData()==true){
			  this._getMusicManagerUI();
		  }
		  else{
			this.root.add(this.logIn,{left:700, top: 300});
		  }
	  }, this);
	  this.logIn.addListener("logIn",this._onLogIn,this);
	this.song.addListener("logInSuccess", function(e){
			if(e.getData()==true){
				this._getMusicManagerUI();
			}
			else{
				alert("Account or Password not match!");
				this.textFieldAccount.setValue(null);
				this.textFieldPassword.setValue(null);
			}
		},this);
	this.logIn.addListener("clear", function() {
		this.textFieldAccount.setValue(null);
		this.textFieldPassword.setValue(null);
	}, this);
	this.bar.addListener("logOut",function(){
		this.song.logOut();
		this.song.addListener("logOutSuccess",function(e){
			if(e.getData()==true){
				window.location.reload();
			}
		},this);
	},this);

    },
	
	_getSong: function(){
		var photo = new qx.io.rest.Resource({
		isLogIn: {method: "GET",url: "http://localhost:8080/musicmanager/isLogIn"},
		logIn: {method: "POST",url: "http://localhost:8080/musicmanager/logIn?{logIn}"},
		logOut: {method: "POST",url: "http://localhost:8080/musicmanager/logOut"}	
		});
		photo.configureRequest(function(req) {
			req.setRequestHeader("Content-Type", "application/json");
		});
		return photo;
	},

	initialize: function(){
		this.song = this._getSong();
	},
	
	_getMusicManagerUI: function(){
		  this.root.add(this.bar, {left: 10, top: 5});
		  this.view = new musicmanager.CustomWidget();
		  this.root.add(this.view,{left:10, top: 45});
	},
	
	_onLogIn: function(){
		var managerlogIn = new qx.ui.form.validation.Manager();
		managerlogIn.add(this.textFieldAccount);
		managerlogIn.add(this.textFieldPassword);
		if (managerlogIn.validate()) {
			this.song.logIn({logIn:"userAccount="+this.textFieldAccount.getValue()+"&userPassword="+this.textFieldPassword.getValue()});
		}
	
	}
  }
});
