$(document).ready(function() 
{  
	if ($("#alertSuccess").text().trim() == "")  
	{   
		$("#alertSuccess").hide();  
	} 
	$("#alertError").hide(); 
}); 

//SAVE ============================================ 
$(document).on("click", "#btnSave", function(event) 
{  
	// Clear alerts---------------------  
	$("#alertSuccess").hide();  
	$("#alertError").text("");  
	$("#alertError").hide(); 

	// Form validation-------------------  
	var status = validatePaymentForm();  
	if (status != true)  
	{   
		$("#alertError").text(status);   
		$("#alertError").show();   
		return;  
	} 

	// If valid------------------------  
	var t = ($("#hidPaymentIDSave").val() == "") ? "POST" : "PUT";
	
	$.ajax(
	{
		url : "PaymentAPI",
		type : t,
		data : $("#formPayment").serialize(),
		dataType : "text",
		complete : function(response, status)
		{
			onPaymentSaveComplete(response.responseText, status);
		}
	});
}); 

function onPaymentSaveComplete(response, status){
	if(status == "success")
	{
		var resultSet = JSON.parse(response);
			
		if(resultSet.status.trim() == "success")
		{
			$("#alertSuccess").text("Successfully Saved.");
			$("#alertSuccess").show();
					
			$("#divItemsGrid").html(resultSet.data);
	
		}else if(resultSet.status.trim() == "error"){
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	}else if(status == "error"){
		$("#alertError").text("Error While Saving.");
		$("#slertError").show();
	}else{
		$("#alertError").text("Unknown Error while Saving.");
		$("#alertError").show();
	}
	$("#hidAppIDSave").val("");
	$("#formAppointment")[0].reset();
}

//UPDATE========================================== 
$(document).on("click", ".btnUpdate", function(event) 
		{     
	$("#hidPaymentIDSave").val($(this).closest("tr").find('#hidPaymentIDUpdate').val()); 
	$("#TransactionID").val($(this).closest("tr").find('td:eq(0)').text());     
	$("#Paymentmethod").val($(this).closest("tr").find('td:eq(1)').text());    
	$("#Amount").val($(this).closest("tr").find('td:eq(2)').text());     
	$("#Bill_No").val($(this).closest("tr").find('td:eq(3)').text());     

});


//Remove Operation
$(document).on("click", ".btnRemove", function(event){
	$.ajax(
	{
		url : "PaymentAPI",
		type : "DELETE",
		data : "PaymentID=" + $(this).data("PaymentID"),
		dataType : "text",
		complete : function(response, status)
		{
			onPaymentDeletedComplete(response.responseText, status);
		}
	});
});

function onPaymentDeletedComplete(response, status)
{
	if(status == "success")
	{
		var resultSet = JSON.parse(response);
			
		if(resultSet.status.trim() == "success")
		{
			$("#alertSuccess").text("Successfully Deleted.");
			$("#alertSuccess").show();
					
			$("#divItemsGrid").html(resultSet.data);
	
		}else if(resultSet.status.trim() == "error"){
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	}else if(status == "error"){
		$("#alertError").text("Error While Deleting.");
		$("#alertError").show();
	}else{
		$("#alertError").text("Unknown Error While Deleting.");
		$("#alertError").show();
	}
}

//CLIENTMODEL
function validatePaymentForm() {  
	// PaymentID
	if ($("#TransactionID").val().trim() == "")  {   
		return "PaymentID";  
		
	} 
	
	 // TransactionID 
	if ($("#TransactionID").val().trim() == "")  {   
		return "Insert TransactionID ";  
		
	} 

	 // Amount
	if ($("#Amount").val().trim() == "")  {   
		return "Insert Payment Price";  
		
	} 
	
		} 

	 // Bill_No
	if ($("#Bill_No").val().trim() == "")  {   
		return "Insert Bill_No";  
		
	} 
		} 

	 // Bank_ID
	if ($("#Amount").val().trim() == "")  {   
		return "Insert Amount";  
		
	} 
	

		 
	 return true; 
	 
}
