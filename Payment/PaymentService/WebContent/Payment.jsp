<%@page import="model.Payment"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>ElectroGrid (Payment Managment)</title>
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<link rel="stylesheet" href="Views/bootstrap.min.css"> 
<script src="components/jquery-3.2.1.min.js"></script>
<script src="components/main.js"></script>
</head>
<body>
<div class="container"> 
		<div class="row">  
		
			<div class="col-8">       
				<h1 class="m-3">ElectroGrid (EG)</h1><br>
				  <h3 class="m-3">Payment Managment</h3>   <br>
				  
				  <div id="alertSuccess" class="alert alert-success"></div>  
				  <div id="alertError" class="alert alert-danger"></div>      
				
				<form id="formPayment" name="formPayment" method="post" action="Payment.jsp"> 
				    
				    TransactionID:   <br>
					<input id="TransactionID" name="TransactionID" type="text"  readonly>   <br>
					
					<br> 
					Paymentmethod:   <br>
					<input id="Paymentmethod" name="Paymentmethod" type="text" >   <br>
					
					<br> 
					Amount:  <br> 
					<input id="Amount:" name="Amount:" type="text" >   <br>
					
					<br>
					Bill_No:  <br>
					 <input id="BillNo" name="BillNo" type="text" >  <br>
					 
					 <br>
					Bank_ID:  <br>
					 <input id="BankID" name="BankID" type="text" >  <br>
					 
					 
					 <br>  
					 <input id="btnSave" name="btnSave" type="button" value="Save" class="btn btn-primary">  
					 <input type="hidden" id="hidPaymentIDSave" name="hidPaymentIDSave" value=""> 
					 
				</form> 
				
				<br>  
				<div  id="divItemsGrid" style="margin:10px 300px 40px 100px">   
					<%    
						Payment appObj = new Payment();
						out.print(appObj.readPayment());   
					%>  
					
				</div> 
				  
 			</div>
 		 
 		</div>    
 		
 
	</div> 

</body>

</html>