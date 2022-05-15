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
	$("#alertSuccess").text("");  
	$("#alertSuccess").hide();  
	$("#alertError").text("");  
	$("#alertError").hide(); 

	// Form validation-------------------  
	var status = validateUnitForm();  
	if (status != true)  
	{   
		$("#alertError").text(status);   
		$("#alertError").show();   
		return;  
	} 

	// If valid------------------------  
	var t = ($("#hidUnitIDSave").val() == "") ? "POST" : "PUT";
	
	$.ajax(
	{
		url : "UnitAPI",
		type : t,
		data : $("#formUnit").serialize(),
		dataType : "text",
		complete : function(response, status)
		{
			onUnitSaveComplete(response.responseText, status);
		}
	});
}); 

function onUnitSaveComplete(response, status){
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
	$("#hidUnitIDSave").val($(this).closest("tr").find('#hidUnitIDUpdate').val()); 
	$("#UnitID").val($(this).closest("tr").find('td:eq(0)').text());     
	$("#Dist").val($(this).closest("tr").find('td:eq(1)').text());    
	$("#DistID").val($(this).closest("tr").find('td:eq(2)').text());     
	$("#UnitP").val($(this).closest("tr").find('td:eq(3)').text());     

});


//Remove Operation
$(document).on("click", ".btnRemove", function(event){
	$.ajax(
	{
		url : "UnitAPI",
		type : "DELETE",
		data : "unitID=" + $(this).data("UnitID"),
		dataType : "text",
		complete : function(response, status)
		{
			onUnitDeletedComplete(response.responseText, status);
		}
	});
});

function onUnitDeletedComplete(response, status)
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
function validateUnitForm() {  
	// District 
	if ($("#Dist").val().trim() == "")  {   
		return "Insert District";  
		
	} 
	
	 // DistrictID  
	if ($("#DistID").val().trim() == "")  {   
		return "Insert District ID";  
		
	} 

	 // Unit Price
	if ($("#UnitP").val().trim() == "")  {   
		return "Insert unit Price";  
		
	} 
		 
	 return true; 
	 
}
