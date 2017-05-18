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

      // Create a button
	  var label1 = new qx.ui.basic.Label("Name: ");
	  var label2 = new qx.ui.basic.Label("Author: ");
	  var txtTextField1= new qx.ui.form.TextField("");
	  var txtTextField2= new qx.ui.form.TextField("");
      var button1 = new qx.ui.form.Button("Add", "musicmanager/test.png");
	  var button2 = new qx.ui.form.Button("Delete", "musicmanager/test.png");
	  
	  var tableModel = new qx.ui.table.model.Simple();
	  tableModel.setColumns(["Name", "Author"]);
	  tableModel.setData([["My love", "West Life"],["One Love","A1"],["Yesterday Once More", "Carpenter Brothers"]]);
	  
	  var table = new qx.ui.table.Table(tableModel);
	  this.getRoot().add(table,{left:100, top:140});
	  txtTextField1.setWidth(150);
	  txtTextField2.setWidth(150);
	  table.setWidth(300);
	  table.setHeight(200);



		
	
      // Document is the application root
      var doc = this.getRoot();

      // Add button to document at fixed coordinates
	  this.getRoot().add(label1, {left:100, top:10});
	  this.getRoot().add(label2, {left:100, top:40});
	  doc.add(txtTextField1,{left: 150, top: 10});
	  doc.add(txtTextField2,{left: 150, top: 40});
	  doc.add(button1, {left: 120, top: 80});
	  doc.add(button2, {left: 210, top: 80});

      // Add an event listener
      button1.addListener("execute", function(e) {
        alert("Hello World!");
      });
	  button2.addListener("execute",function(e){
		alert("OK")
	  });
    }
  }
});
