/* ************************************************************************

   Copyright:

   License:

   Authors:

************************************************************************ */

/**
 * This is the main application class of your custom application "MusicManager"
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
	  // Document is the application root
      var doc = this.getRoot();
	  
	  //create menuBar
	  var bar = this.getMenuBar();
      doc.add(bar, {left: 20, top: 0});
	  
	  //create groupBox and gridLayout
	  var groupBoxMusicSong = new qx.ui.groupbox.GroupBox("SongManager");
      groupBoxMusicSong.setWidth(1000);
      doc.add(groupBoxMusicSong, {left: 20, top: 35});
      var gridMusicSong = new qx.ui.layout.Grid();
      gridMusicSong.setSpacing(5);
	  gridMusicSong.setSpacingX(10);
      groupBoxMusicSong.setLayout(gridMusicSong);
	  
	  //create button, label, textField
	  var labelName = new qx.ui.basic.Label("Name: ");
	  groupBoxMusicSong.add(labelName, {row:0, column:0});
	  
	  var textFieldName= new qx.ui.form.TextField("");
	  groupBoxMusicSong.add(textFieldName,{row:0, column:1});
	  textFieldName.setRequired(true);
	  
	  var labelAuthor = new qx.ui.basic.Label("Author: ");
	  groupBoxMusicSong.add(labelAuthor,{row:0, column:2});
	  
	  var textFieldAuthor= new qx.ui.form.TextField("");
	  groupBoxMusicSong.add(textFieldAuthor,{row:0, column:3});
	  
	  var labelSearch = new qx.ui.basic.Label("Search: ");
	  groupBoxMusicSong.add(labelSearch,{row:1, column:0});
	  
	  var textFieldSearch= new qx.ui.form.TextField("");
	  groupBoxMusicSong.add(textFieldSearch,{row:1, column:1,colSpan:3});
	  
	  var buttonSearch = new qx.ui.form.Button("Search", "musicmanager/search.png");
	  groupBoxMusicSong.add(buttonSearch,{row:1, column:4});
	  
	  var buttonAdd = new qx.ui.form.Button("Add    ", "musicmanager/add.png");
	  groupBoxMusicSong.add(buttonAdd,{row:0, column:4});
	  
	  var buttonDelete = new qx.ui.form.Button("Delete ", "musicmanager/delete.png");
	  groupBoxMusicSong.add(buttonDelete,{row:0, column:5});
	  
	  var buttonSignIn = new qx.ui.form.Button("Sign in", "musicmanager/signIn.png");
	  groupBoxMusicSong.add(buttonSignIn,{row:0, column:6});
	  buttonSignIn.setEnabled(false);
	  
	  //create table and simple data 
	  var tableSongModel = new qx.ui.table.model.Simple();
	  tableSongModel.setColumns(["Name", "Author"]);
	  tableSongModel.setData([["My love", "West Life"],["One Love","A1"],["Yesterday Once More", "Carpenter Brothers"]]);
	  var tableSong = new qx.ui.table.Table(tableSongModel);
	  groupBoxMusicSong.add(tableSong,{row:2, column:0,colSpan: 55});
	  tableSong.setColumnWidth(0, 550);
	  tableSong.setColumnWidth(1, 499); 
	  tableSong.setContextMenu(this.getContextMenu());

      // binding /////////////////////////

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

      // invoke the serialization
      buttonAdd.addListener("execute", function() {
        if (manager.validate()) {
          alert("You added: " + qx.util.Serializer.toUriParameter(model, qxSerializer));
        }
      }, this);

      // Add an event listener
	  buttonDelete.addListener("execute",function(e){
		alert("Do you want delete this Song?");
	  });
    },
	getContextMenu : function()
    {
      var menu = new qx.ui.menu.Menu;
	  
      var buttonAdd = new qx.ui.menu.Button("Add", "musicmanager/add.png");
	  var buttonModify = new qx.ui.menu.Button("Modify", "musicmanager/modify.png");
	  var buttonDelete = new qx.ui.menu.Button("Delete", "musicmanager/delete.png");

      //menu.add(buttonAdd);
      menu.add(buttonModify);
      menu.add(buttonDelete);
	  menu.setArrowColumnWidth(50);

      return menu;
    },
	getMenuBar : function()
    {
      var frame = new qx.ui.container.Composite(new qx.ui.layout.Grow);

      var menubar = new qx.ui.menubar.MenuBar;
      //menubar.setWidth(600);
      frame.add(menubar);

      var fileMenu = new qx.ui.menubar.Button("File", null, this.getFileMenu());
      var systemMenu = new qx.ui.menubar.Button("System", null, this.getSystemMenu());
      var aboutMenu = new qx.ui.menubar.Button("About", null, this.getAboutMenu());

      menubar.add(fileMenu);
      menubar.add(systemMenu);
      menubar.add(aboutMenu);
      
      return frame;
    },
	getFileMenu : function()
    {
      var menu = new qx.ui.menu.Menu;

      var buttonAdd = new qx.ui.menu.Button("Add", "musicmanager/add.png");
      var buttonModify = new qx.ui.menu.Button("Modify", "musicmanager/modify.png");
      var buttonDelete = new qx.ui.menu.Button("Delete", "musicmanager/delete.png");
      var buttonExit = new qx.ui.menu.Button("Exit", "musicmanager/exit.png");

      menu.add(buttonAdd);
      menu.add(buttonModify);
      menu.add(buttonDelete);
      menu.add(buttonExit);
	  menu.setArrowColumnWidth(50);

      return menu;
    },
	getSystemMenu : function()
    {
      var menu = new qx.ui.menu.Menu;

      var buttonSignIn = new qx.ui.menu.Button("Sign In", "musicmanager/signIn.png");
      var buttonSignUp = new qx.ui.menu.Button("Sign Up", "musicmanager/signUp.png");
	  var buttonSignOut = new qx.ui.menu.Button("Sign Out", "musicmanager/signOut.png");
      
      menu.add(buttonSignIn);
      menu.add(buttonSignUp);
      menu.add(buttonSignOut);
	  menu.setArrowColumnWidth(50);
      
      return menu;
    },
	getAboutMenu : function()
    {
      var menu = new qx.ui.menu.Menu;

      var buttonAbout = new qx.ui.menu.Button("About us", "musicmanager/about.png");
      var buttonContact = new qx.ui.menu.Button("Contact", "musicmanager/contact.png");
	  
      menu.add(buttonAbout);
      menu.add(buttonContact);

      menu.setArrowColumnWidth(50);
      return menu;
    }
  }
});
