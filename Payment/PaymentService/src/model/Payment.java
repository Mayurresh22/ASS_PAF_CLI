package model;

import java.sql.*;

public class Payment {
	
  //A common method to connect to the DB
  private Connection connect()
  {
    Connection con = null;
    try
      {
        Class.forName("com.mysql.jdbc.Driver");
        //Provide the correct details: DBServer/DBName, username, password
        con = DriverManager.getConnection("jdbc:mysql://127.0.0.1:3308/power", "root", "");
        
      //For testing          
		 System.out.print("Successfully connected");
      }
    catch (Exception e)
      {
        e.printStackTrace();
      }
      return con;
  }
 
  
  
	//POST part
  public String insertPayment(String TransactionID, String Paymentmethod, String  Amount, String BillNo, int bank_id)
  {
     String output = "";
    try
    {
      Connection con = connect();
      if (con == null)
    {
      
      return "Error while connecting to the database for inserting."; 
    }
  
      // create a prepared statement
      String query = " INSERT INTO Payments(PaymentID,dist,distID,Paymentp)"+ " values (?,?,?,?)";
      PreparedStatement preparedStmt = con.prepareStatement(query);
         
        // binding values
      preparedStmt.setInt(1, TransactionID);
      preparedStmt.setString(2, Paymentmethod);
      preparedStmt.setString(3, Amount);
      preparedStmt.setString(4, Bill_No);
      preparedStmt.setString(5, Bank_id);
	  preparedStmt.setInt(6, Integer.parseInt(Payment_ID));

      
      preparedStmt.execute();
      con.close();
    //create JSON Object
	  String newPayment = readPayments();
	  output = "{\"status\":\"success\", \"data\": \"" + newPayment + "\"}";
    }
    catch (Exception e)
    {
      output = "{\"status\":\"error\", \"data\": \"Error while inserting the Payment.\"}";
      System.err.println(e.getMessage());
    }
    return output;
  }
  
  
  
	//GET part
  public String readPayments()
  {
    String output = "";
    
      try
      {
        Connection con = connect();
        if (con == null) {  
        return "Error while connecting to the database for reading."; 
        }
        
        // Prepare the html table to be displayed
        output = "<table align='center' border ='3px' style='border-radius:10px;'><tr align='center'>"
        		+ "<th> TransactionID </th><th> Paymentmethod </th>"
        		+ "<th>Amount NO</th><th>  Bill_No</th> "
        		+"<th> Update </th><th> Delete </th>";
        
        String query = "SELECT * FROM Payments  ";
        Statement stmt = con.createStatement();
        ResultSet rs = stmt.executeQuery(query);
    
       // iterate through the rows in the result set
      
      while (rs.next())
      {
        String TransactionID = Integer.toString(rs.getInt("TransactionID"));
        String Paymentmethod = rs.getString("Paymentmethod");
        String Amount = Integer.toString(rs.getInt("Amount"));
        String Bill_No = rs.getString("Bill_No");
        String Bankid = rs.getString("Bankid");
        
       
        // Add into the html table
        output += "<tr align='center'><td>" + TransactionID + "</td>";
        output += "<td>" + Paymentmethod+ "</td>";
        output += "<td>" + Amount + "</td>";
        output += "<td>" +"Rs."+ Paymentp + "</td>";
        
     // buttons     
		output += "<td><input name='btnUpdate' type='button' value='Update' class='btnUpdate btn btn-secondary'></td>"
		+ "<td><input name='btnRemove' type='button' value='Remove' class='btnRemove btn btn-danger' data-appID='"+ PaymentID +"'>"+"</td></tr>";
       
      }
        con.close();
        // Complete the html table
        output += "</table>";
      }
      catch (Exception e)
      {
        output = "Error while reading the Payments.";
        System.err.println(e.getMessage());
      }
    return output;
  }
  
  
  
	//PUT part
  public String updatePayment(String PaymentID, String Dist,String DistID,String PaymentP)
  {
    String output = "";
      try
      {
        Connection con = connect();
        if (con == null)
      {
        return "Error while connecting to the database for updating."; 
      }
        
        // create a prepared statement
          String query = "UPDATE Payments SET dist=?,distID=?,Paymentp=? WHERE PaymentID=?";
          PreparedStatement preparedStmt = con.prepareStatement(query);
        
        // binding values
        preparedStmt.setString(1, TransactionID);
        preparedStmt.setInt(2, Integer.parseInt(Paymentmethod));
        preparedStmt.setString(3, Amount);
        preparedStmt.setInt(4, Integer.parseInt(PaymentID));
        
        preparedStmt.execute();
        con.close();
        
        
      //create JSON Object
		  String newPayment = readPayments();
		  output = "{\"status\":\"success\", \"data\": \"" + newPayment + "\"}";
      }
      catch (Exception e)
      {
        output = "{\"status\":\"error\", \"data\": \"Error while updating the Payment.\"}";
        System.err.println(e.getMessage());
      }
    return output;
  }
    
  
  
//DELETE part 
  public String deletePayment(String PaymentID)
  {
    String output = "";
      try
      {
          Connection con = connect();
          
       if (con == null)
      {
        return "Error while connecting to the database for deleting."; 
      }
          
      // create a prepared statement
          String query = "DELETE FROM Payments WHERE PaymentID=?";
          PreparedStatement preparedStmt = con.prepareStatement(query);
      
      // binding values
          preparedStmt.setInt(1, Integer.parseInt(PaymentID));
      
      // execute the statement
          preparedStmt.execute();
          con.close();          
          
        //create JSON Object
		  String newPayment = readPayments();
		  output = "{\"status\":\"success\", \"data\": \"" + newPayment + "\"}";
      }
      catch (Exception e)
      {
          output = "{\"status\":\"error\", \"data\": \"Error while deleting the Payment.\"}";
          System.err.println(e.getMessage());
      }
      return output;
      }
  }