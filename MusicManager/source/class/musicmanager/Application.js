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
	  
	  //create groupBox and gridLayout
	  var groupBoxMusicSong = new qx.ui.groupbox.GroupBox("SongManager");
      groupBoxMusicSong.setWidth(1000);
      doc.add(groupBoxMusicSong, {left: 10, top: 10});
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
	  
	  var buttonSearch = new qx.ui.form.Button("Search");
	  groupBoxMusicSong.add(buttonSearch,{row:1, column:4});
	  
	  var buttonAdd = new qx.ui.form.Button("Add    ", "musicmanager/.png");
	  groupBoxMusicSong.add(buttonAdd,{row:0, column:4});
	  
	  var buttonDelete = new qx.ui.form.Button("Delete ", "musicmanager/.png");
	  groupBoxMusicSong.add(buttonDelete,{row:0, column:5});
	  
	  var buttonSignIn = new qx.ui.form.Button("Sign in", "musicmanager/.png");
	  groupBoxMusicSong.add(buttonSignIn,{row:0, column:6});
	  
	  //create table and simple data 
	  var tableSongModel = new qx.ui.table.model.Simple();
	  tableSongModel.setColumns(["Name", "Author"]);
	  tableSongModel.setData([["My love", "West Life"],["One Love","A1"],["Yesterday Once More", "Carpenter Brothers"]]);
	  var tableSong = new qx.ui.table.Table(tableSongModel);
	  groupBoxMusicSong.add(tableSong,{row:2, column:0,colSpan: 55});
	  tableSong.setColumnWidth(0, 494);
	  tableSong.setColumnWidth(1, 495); 
	  
      // Add an event listener
      buttonAdd.addListener("execute", function(e) {
        alert("Hello World!");
      });
	  buttonDelete.addListener("execute",function(e){
		alert("OK")
	  });
	  
    }
  }
});
