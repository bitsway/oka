
// Put your custom code here=========== Latitude and Longitude

function getLatLong() {
	navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

// onSuccess Geolocation
function onSuccess(position) {
	$("#lat").val(position.coords.latitude)
	$("#long").val(position.coords.longitude)
	$("#lat_IM").val(position.coords.latitude)
	$("#long_IM").val(position.coords.longitude)
	//var element = document.getElementById('geolocation');
//        element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
//                            'Longitude: '          + position.coords.longitude             + '<br />' +
//                            'Altitude: '           + position.coords.altitude              + '<br />' +
//                            'Accuracy: '           + position.coords.accuracy              + '<br />' +
//                            'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
//                            'Heading: '            + position.coords.heading               + '<br />' +
//                            'Speed: '              + position.coords.speed                 + '<br />' +
//                            'Timestamp: '          +                                   position.timestamp          + '<br />';
//alert (position.coords.latitude);
//alert ('nadira');
}

// onError Callback receives a PositionError object
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
    }

//====================================================================== Details Code

//var apipath='http://127.0.0.1:8000/mreporting/sync_mobile/';
//var dmpathUrl= "http://localhost/dmpath/index.php?CID=";
//var apipath='http://127.0.0.1:8000/mreporting/';
//var apipath=location.protocol + "//" + location.hostname + (location.port && ":" + location.port) + "/mrepmobile/mrep_order_new/";
var apipath="http://m.businesssolutionapps.com/mrepmobile/mrep_order_new/";
var cidValue=''
var repid='';
var password='';
var loginResult='';
var memListStr='';

var errror_str='Network Error. Please Check that you have Internet active or Mobile have network signal.';


var im_number=0;
var delivery_str_IM="";

//========================================
// $(document).ready(function(){
// set_route_combo();
// });



	
$(function() {	
	
	
	// $('#routeID').change(function() {
		// alert ('nadira');
        // // var nextpage = $(this).children('option:selected').attr('value');
        // // $.mobile.changePage( nextpage + '.html' );
    // });
	/*$(document).ready(function(){
	  $('#itemComboDiv').empty();
	  $('#itemComboDiv').append(localStorage.itemCombo).trigger('create');
	}); */
	
	
$('#basicSync').click(function() {
		localStorage.cid="";
		localStorage.userid="";
		localStorage.password="";
		localStorage.synccode="";
		localStorage.routeList="";
		localStorage.itemList="";
		localStorage.itemDivCount="";
		
		 cidValue=$("#cid").val() ;
		 repid=$("#repid").val() ;
		 password=$("#password").val() ;
		 if (cidValue==""||repid==""||password==""){
			 $("#mySyncError").html('Authorization Failed');	
			 var url = "#pageSync";
			 $.mobile.navigate(url); 
				//$(location).attr('href',url);
		 }else{			 

		if (apipath==''){
			$("#mySyncError").html('Error: 10001 Configuration Data not Found. Please contact your system admin.');
			
		}else{
			 //alert(apipath+'syncRepJMobileSS?cid='+cidValue+'&repid='+repid+'&mobile=8801234567890&password='+password);
			// $("#mySyncError").html(apipath+'syncRepSS?cid='+cidValue+'&repid='+repid+'&mobile=8801234567890&password='+password) ;
			 $.ajax({
				 //http://127.0.0.1:8000/mreporting/sync_mobile/syncRepSS?cid=DELTA&repid=13073&mobile=8801234567890&password=123
				 //url: apipath+'sync_mobile/syncRepSS?cid=DEMO&dpid='+mobile+'&mobile=8801234567890&password='+password,
				 url: apipath+'syncRepSS?cid='+cidValue+'&repid='+repid+'&mobile=8801234567890&password='+password,
				 success: function(result) {
						loginResult=result
						if (loginResult==''){
							$("#mySyncError").html('Error: 10002 Network Time out');
						}
						var loginResultArray = loginResult.split('rdrd');			
						if (loginResultArray[0]=='YES'){
							
							syncCode=loginResultArray[1];
							routeListStr=loginResultArray[2];
							itemListStr=loginResultArray[3];
							dvCount=loginResultArray[4];
							itemCombo=loginResultArray[5];
							itemComboIM=loginResultArray[6];
							
							
							//alert (loginResult);		
							localStorage.cid=cidValue;
							localStorage.userid=repid;
							localStorage.password=password;
							localStorage.synccode=syncCode;
							localStorage.routeList=routeListStr;
							localStorage.itemList=itemListStr;
							localStorage.itemDivCount=dvCount;
							localStorage.itemCombo=itemCombo;
							localStorage.itemComboIM=itemComboIM
							
							//alert (localStorage.itemCombo);
							//$("#mySyncError").html(loginResult);
							$("#mySyncError").html("Authorization and basic data synchronized. Please Sync route.");
							$("#cid").val("") ;
							$("#repid").val("") ;
							$("#password").val("") ;
							
							
							// ================end route================
							$("#routeList").html(localStorage.routeList)
							
							//$('#itemComboDiv_IM').empty();
							//$('#itemComboDiv_IM').append(localStorage.itemComboIM).trigger('create');
							
							var url = "#pageSync";
							 
							
							$.mobile.navigate(url);
							$("#mySyncError").html("Authorization and basic data synchronized. Please Sync route.");
							//$(location).attr('href',url);
							
							//---------------
						}else if (loginResultArray[0]=='NO'){
							var url = "#pageSync";      
							
							//$(location).attr('href',url);
							$.mobile.navigate(url); 
							$("#mySyncError").html('Authentication Error. Please contact your company system admin');			
						}
				  },
				  error: function(result) {
					  $("#mySyncError").html(errror_str);
					  var url = "#pageSync";
					  $.mobile.navigate(url); 
					//	$(location).attr('href',url);
				  }
				  
			});//end ajax
		  }//end else of blank apipath
		};//end else of blank field
		 
	});//end check click
	
	//================================set_route_combo
	
	$('#routeSync').click(function() {
		$("#routeID").val();
		var routeIdName=$("#routeID").val();
		if (routeIdName=="" || routeIdName==undefined){
			$("#mySyncError_route").html('Select Route');			
			
			var url = "#pageSyncRoute";      
			$(location).attr('href',url);
		
		}else{
			$("#mySyncError_route").text("");
			
			var routeIdNameArray = routeIdName.split('-');
			var routeId=routeIdNameArray[0];
			var routeName=routeIdNameArray[1];
			
			//localStorage.selected_route=routeId;
			//$("#mySyncError_route").html(apipath+'syncClientSS?cid='+localStorage.cid+'&repid='+localStorage.userid+'&password='+localStorage.password+'&synccode='+localStorage.synccode+'&routeid='+routeId);
			$.ajax({
				 //http://127.0.0.1:8000/mreporting/sync_mobile/syncClientSS?cid=DELTA&repid=101&password=123&synccode=8943&routeid=BP33
				 url: apipath+'syncClientSS?cid='+localStorage.cid+'&repid='+localStorage.userid+'&password='+localStorage.password+'&synccode='+localStorage.synccode+'&routeid='+routeId,
				 success: function(result) {
						
						if (result==''){
							alert ('Sorry Network not available');
						}
						//alert (result);
						var clientResArray = result.split('rdrd');			
						if (clientResArray[0]=='YES'){
							
							clientListStr=clientResArray[1];
																
							localStorage.routeId=routeId;
							localStorage.routeName=routeName;
							localStorage.clientListStr=clientListStr;
							
							
							
							
							
							
							 $("#mySyncError_route").text("Route '"+localStorage.routeName+" ("+localStorage.routeId+" )' Synced Successfully");	
							
							
							//$('#clientList').empty();
							//$('#clientList').append(temp).trigger('create');
							
							$('#clientList').html(localStorage.clientListStr.toString());
							
							/*var url = "#pageClient";
							$(location).attr('href',url);*/
							
							//---------------
						}else if (clientResArray[0]=='NO'){
							$("#mySyncError_route").text('Authentication Error');		
							
							var url = "#pageSyncRoute";
							$.mobile.navigate(url); 
							//$(location).attr('href',url);
						}
				  },
				  error: function(result) {
					alert(errror_str);
				  }
				  
			});//end ajax
			
			}	
		
		
		});
	
	
	
}); 

//================== Sync page
function getSyncPage() {
		if (localStorage.routeList=="" || localStorage.routeList=="None"){
			$("#mySyncError").html('Required Basic Sync');	
			$('#routeList').empty();
					
		}else{
			$('#routeList').empty();			
			$('#routeList').append(localStorage.routeList).trigger('create');
			}
		
		var url = "#pageSync";      
		//$(location).attr('href',url);	
		$.mobile.navigate(url); 
	}


//================== Clear Sync
function clearSync() {
	localStorage.cid="";
	localStorage.userid="";
	localStorage.password="";
	localStorage.synccode="";
	localStorage.routeList="";
	localStorage.itemList="";
	localStorage.itemDivCount="";
	localStorage.routeId="";
	localStorage.routeName="";
	localStorage.clientListStr="";
	localStorage.itemCombo="";
}



//==============client sync================


	
	$('#clientSync').click(function() {
		// atert ('nadira')
		var clientIdName=$("#clientID").val();
		//alert (clientIdName);
		if (clientIdName=="" || clientIdName==undefined){
			$("#mySyncError_client").html('Select Client');			
			
			var url = "#pageClient";      
			//$(location).attr('href',url);
			$.mobile.navigate(url); 
		
		}else{
			$("#mySyncError_client").text("");
			var clientIdNameArray = clientIdName.split('-');
			var clientId=clientIdNameArray[0];
			var clientName=clientIdNameArray[1];
			
			// getOrder(clientIdName)
		}
		}); 
			


//==============client sync end========


function refreshclientList() {	
	$('#clientID_S').empty();
	
	$("#clientSearch").val('');
	var clientArray=localStorage.clientListStr.split('rtrt')	
	var ob = $("#clientID_S");
	var value="";
	var text="Select Client";
	// ob.prepend("<option value="+ blank +">" + text + "</option>");
	
	for (var c=0; c<clientArray.length-1; c++){
		
		var clientIdNameArray = clientArray[c].split('-');
		
		var client_id=clientIdNameArray[1]
		 // alert (client_id);
		var client_name=clientIdNameArray[0]
		ob.prepend("<option value="+ client_name+'-'+client_id +">" + client_name +"(" +client_id +")" + "</option>");
		}
	
	
}
//================== Client List
function clientList() {	
	
	// ====================client combo==================			
							
				
	$('#clientID_S').empty();
	var clientArray=localStorage.clientListStr.split('rtrt')	
	var ob = $("#clientID_S");
	var value="";
	var text="Select Client";
	// ob.prepend("<option value="+ blank +">" + text + "</option>");
	
	for (var c=0; c<clientArray.length-1; c++){
		
		var clientIdNameArray = clientArray[c].split('-');
		 
		var client_id=clientIdNameArray[1]
		var client_name=clientIdNameArray[0]
		
		//alert ("<option value="+ client_name+','+client_id +">" + client_name +"(" +client_id +")" + "</option>");
		ob.prepend("<option value='"+ client_name+'_'+client_id +"'>" + client_name +"(" +client_id +")" + "</option>");
		}						
	var url = "#pageClient";
	//$(location).attr('href',url);
	$.mobile.navigate(url); 
	// ob.prepend("<option value="+ blank +">" + text + "</option>");
	// =====================client combo end=================
	
	
	// var clientList=localStorage.clientListStr;
// 				
	// if (clientList=="" || clientList==undefined){
			// $("#myerror").text("Required Route Synced");
// 		
		// }else{
			// //$('#clientList').empty();
			// //$('#clientList').append(clientList).trigger('create');
// 			
			// $('#clientList').html(clientList);
// 			
			// var url = "#pageClient";
			// $(location).attr('href',url);
			// }
			
}


//================== Order
function getOrder() {
		$("#clientErrMsg").text("");
		// $("#itemListDiv_hidden").html("")
		// $("#itemListDiv").html("")
		var clientIdName= $("#clientID_S").val();
		var submit_type= $("#submit_type").val();
		
	//	alert (clientIdName);
//		var clientIdName=clientIdName;
		var itemList=localStorage.itemList;
		//alert(itemList);
		if (itemList==""){
			$("#clientErrMsg").text("Client not available");	
		}else{	
				var clientArray=clientIdName.split("_");
				var clientName=clientArray[0];
				var clientId=clientArray[1];
				//alert (clientIdName);
				$("#clientID_1").val(clientId);
				$("#clientID").val(clientId);
				$("#clientName").val(clientName);
				
				
				//Delivery IM
				$("#clientID_1_IM").val(clientId);
				$("#clientID_IM").val(clientId);
				$("#clientName_IM").val(clientName);
				//alert(clientArray);				
				
				
				var clientStr='<table data-mode="reflow" class="ui-responsive table-stroke" style="width:100%;"><tr><td style="width:25%"> Client </td><td >: '+clientName+' ('+clientId+' )</td></tr></table>';//<tr><td style="width:25%"> Client Name</td><td>: '+clientName+'</td></tr><tr><td>'+'&nbsp;'+'</td><td>&nbsp;</td></tr></table>';
				
				
				
				$('#clientDiv').empty();
				$('#clientDiv').append(clientStr).trigger('create');
				
				
				
				
				
				
				
				
				if (submit_type=='DELIVERYIM'){
					
					
					$('#clientDiv_IM').empty();
					$('#clientDiv_IM').append(clientStr).trigger('create');
					
					
					localStorage.clientStr=clientStr;
					//$('#delListDiv_IM').empty();
//				    $('#delListDiv_IM').append(itemList).trigger('create');
					
					$('#itemCountDiv_IM').empty();
					$('#itemCountDiv_IM').append(localStorage.itemDivCount).trigger('create');
					
					$('#itemComboDiv_IM').empty();
					$('#itemComboDiv_IM').append(localStorage.itemComboIM).trigger('create');
					
					var url = "#pageDeliveryIM";  
					$.mobile.navigate(url);   
					location.reload();
					
					//$('#itemComboDiv_IM').empty();
					//alert (localStorage.itemComboIM);
					///$('#itemComboDiv_IM').html(localStorage.itemComboIM);
					//$(location).attr('href',url);
				}
				else{
					
					
				
				$('#orderListDiv').empty();
				$('#orderListDiv').append(itemList).trigger('create');
				
				$('#itemCountDiv').empty();
				$('#itemCountDiv').append(localStorage.itemDivCount).trigger('create');
				
				$('#itemComboDiv').empty();
				$('#itemComboDiv').append(localStorage.itemCombo).trigger('create');
				
				var url = "#pageOrder";      
				$(location).attr('href',url);
				}
			}
				  
}

//================== Order Next
function ordNext() {
		$("#ordErrMsg").text("");
		
		var clientID=$("#clientID").val();
		var clientName=$("#clientName").val();
		
		if (clientID==""){
			$("#reqErrMsg").text("Required Client");
		}else{
						
			var tableStr='<table data-mode="reflow" class="ui-responsive" style="width:100%;">'
			tableStr+='<tr><td >'+'<b>Client ID</b>'+'</td><td>:&nbsp;'+ clientID +'</td></tr>'
			tableStr+='<tr><td>'+'<b>Client Name</b>'+'</td><td>:&nbsp;'+ clientName +'</td></tr>'
			tableStr+='<tr><td>'+'&nbsp;'+'</td><td>&nbsp;</td></tr>'
			tableStr+='</table>'
			
			
			tableStr+='<table data-mode="reflow" class="ui-responsive" style="width:100%;" >'
        	tableStr+='<tr><td ><b>Item Name (ID)</b></td><td style="text-align:right"><b>Rate</b></td><td style="text-align:right">&nbsp;<b>Qty</b></td><td style="text-align:right"><b>Amount</b></td></tr>'
			
			var divCount=$("#divCount").val();
			// alert (divCount);
			var count=0;
			var submitStr='';
			var amount=0.0
			var totalAmt=0.0
			for (i=0; i<divCount; i++){
				count=count+1
				var itemIdNameRate=$("#itemId"+count).val();
				var itemIdNameRateArray = itemIdNameRate.split('-');
				// alert (itemIdNameRate);
				var itemId=itemIdNameRateArray[0]
				var itemName=itemIdNameRateArray[1]
				var itemRate=itemIdNameRateArray[2]	
				
				// var itemQty=$("#itemQty"+count).val();
				var itemQty=$("#"+itemId).val();
				// alert (itemQty)
				var amount=0
				if (itemQty=='' || itemQty==0){
					continue
				}else{                
					if (isNaN(itemQty)){
						continue
					}else{
						amount=(itemQty*itemRate)
						totalAmt=totalAmt+amount
						}
				}
				
				if (submitStr==''){
					submitStr=itemId+'fdfd'+itemName+'fdfd'+itemRate+'fdfd'+itemQty						
				}else{
					submitStr=submitStr+'fdrd'+itemId+'fdfd'+itemName+'fdfd'+itemRate+'fdfd'+itemQty
				}
				
			    tableStr+='<tr><td style="font-size:12px;" >'+itemName+' ('+itemId+')'+'</td><td style="font-size:10px; text-align:right">'+itemRate+'</td><td style="font-size:10px; text-align:right">'+ itemQty +'</td><td style="font-size:10px; text-align:right">'+ amount.toFixed(2) +'</td></tr>'
				
			}//end for loop
			//alert(totalAmt.toFixed(2))	
			tableStr+='<tr><td style="font-size:11px"><b>Total</b></td><td >'+''+'</td><td >'+ '' +'</td><td style="font-size:11px; text-align:right"><b>'+ totalAmt.toFixed(2) +'</b></td></tr>'
			tableStr+='</table>'
			
			submitStr=clientID+'rdrd'+submitStr
			//alert(submitStr)
			if (totalAmt > 0){				
				$("#voucherItem").val(submitStr);
				
				$('#voucherDiv').empty();
				$('#voucherDiv').append(tableStr).trigger('create');
				
				var url = "#pageVoucher";      
				$(location).attr('href',url);
				
			}else{
				$("#ordErrMsg").text("Required Item");
				$("#ordErrMsg").focus();
				}
				
		}
}

//========================== voucher Submit
function orderSubmit() {
		var voucherItem=$("#voucherItem").val();
		
		if (voucherItem!=''){
			getLatLong();
			
			var latitude=$("#lat").val();
			var longitude=$("#long").val();
			
		//	$("#alert_show").html (apipath+'getSubmitResultOrd?cid='+localStorage.cid+'&repid='+localStorage.userid+'&password='+localStorage.password+'&synccode='+localStorage.synccode+'&routeid='+localStorage.routeId+'&mLatitude='+latitude+'&mLongitude='+longitude+'&data='+encodeURI(voucherItem));
			$.ajax({
					 //http://127.0.0.1:8000/mreporting/sync_mobile/orderSubmit?cid=DELTA&repid=101&password=123&synccode=6520&routeid=DE15&mLatitude=&mLongitude=&data=14891rdrd170fdfdACTIVIT%20B%20100ML.%20SYRUPfdfd15.74fdfd5fdrd204fdfdACTIVIT%20GOLD%20TABfdfd135.34fdfd6
					  url: apipath+'getSubmitResultOrd?cid='+localStorage.cid+'&repid='+localStorage.userid+'&password='+localStorage.password+'&synccode='+localStorage.synccode+'&routeid='+localStorage.routeId+'&mLatitude='+latitude+'&mLongitude='+longitude+'&data='+encodeURI(voucherItem),
					  success: function(result) {
						  
						if (result!='NO'){
							resArray=result.split(',')
							if (resArray[0]=='success'){
								var vRes="Order "+"Voucher No. "+resArray[1]
								$('#successVno').empty();
								$('#successVno').append(vRes).trigger('create');
											
								url = "#pageEnd"; 
								$(location).attr('href',url);
							}							
						}else{
							alert('Authentication Error');
							}
						
					  },
					  error: function(result) {
						alert(errror_str);
					  }				  
			});
			
		}else{	
			alert (errorStr);		
			}
}

function pageEndNextClient() {
			clientList();
			url = "#pageClient";	
			$.mobile.navigate(url);
}

//===================

function exit() {
navigator.app.exitApp();
}


//==============route list=====

function set_route_combo() {
//	alert ('nadira');
	var routeArray=localStorage.routeList.split('rtrt')	;
	var ob = $("#routeID");
	
	$('#routeID').empty()
	
	var value="";
	var text="Select Route";
	// ob.prepend("<option value="+ blank +">" + text + "</option>");
	//alert (routeArray.length);
	for (var r=0; r<routeArray.length-1; r++){
		var routeIdNameArray = routeArray[r].split('-');
		var route_id=routeIdNameArray[0]
		var route_name=routeIdNameArray[1]
		ob.append("<option value='"+ route_id+'-'+route_name +"'>" + route_name +"(" +route_id +")" + "</option>");
		}			
	// ob.prepend("<option value="+ blank +">" + text + "</option>");						
	  //create route list=========
	
}


//================add item to list==================

function set_item_combo() {
	// alert (localStorage.itemCombo.length);
	var itemArray=localStorage.itemCombo.split('rtrt')	;
	var ob = $("#itemID_add");
	// alert ('nadira')
	$('#itemID_add').empty()
	
	var value="";
	var text="Select Item";
	// ob.prepend("<option value="+ blank +">" + text + "</option>");
	for (var i=0; i<itemArray.length-1; i++){
		var itemIdNameArray = itemArray[i].split('-');
		var item_id=itemIdNameArray[0]
		var item_name=itemIdNameArray[1]
		ob.append("<option value="+ item_id +">" + item_name +"(" +item_id +")" + "</option>");
		// "<option value='"+ item_id +"'>" + item_name +"(" +item_id +")" + "</option>");
		}			
	// ob.prepend("<option value="+ blank +">" + text + "</option>");						
	// var url = "#pageOrder";      
	// $(location).attr('href',url);
			
}

function set_item_combo_IM() {
	// alert (localStorage.itemCombo.length);
	var itemArray=localStorage.itemCombo.split('rtrt')	;
	var ob = $("#itemCombo_IM");
	// alert ('nadira')
	$('#itemCombo_IM').empty()
	
	var value="";
	var text="Select Item";
	// ob.prepend("<option value="+ blank +">" + text + "</option>");
	for (var i=0; i<itemArray.length-1; i++){
		var itemIdNameArray = itemArray[i].split('-');
		var item_id=itemIdNameArray[0]
		var item_name=itemIdNameArray[1]
		ob.append("<option value="+ item_id +">" + item_name +"(" +item_id +")" + "</option>");
		// "<option value='"+ item_id +"'>" + item_name +"(" +item_id +")" + "</option>");
		}			
	// ob.prepend("<option value="+ blank +">" + text + "</option>");						
	// var url = "#pageOrder";      
	// $(location).attr('href',url);
			
}


//==============client sync================



    
function add_item() {
	$("#"+item_value).focus();
	}
//==================submit type

function submit_value() {
	// alert ('nadira');
	var submit_type=$("#submit_type").val()
	if (submit_type=='ORDER'){
		orderSubmit();
	}
	if (submit_type=='DELIVERY'){
		deliverySubmit();
	}
	// alert (submit_type)
	
}
function set_submit_type_ord() {
	// alert ('nadira');
	$("#submit_type").val('ORDER');
	localStorage.submit_type='ORDER';
}
function set_submit_type_del() {
	// alert ('nadira');
	$("#submit_type").val('DELIVERY');
	localStorage.submit_type='DELIVERY';
}
function set_submit_type_del_im() {
	// alert ('nadira');
	$("#submit_type").val('DELIVERYIM');
	localStorage.submit_type='DELIVERYIM';
}
// =====================delivery submit=============
function deliverySubmit() {
		var voucherItem=$("#voucherItem").val();
		
		if (voucherItem!=''){
			getLatLong();
			
			var latitude=$("#lat").val();
			var longitude=$("#long").val();
			
		//	$("#alert_show").html (apipath+'getSubmitResultDel?cid='+localStorage.cid+'&repid='+localStorage.userid+'&password='+localStorage.password+'&synccode='+localStorage.synccode+'&routeid='+localStorage.routeId+'&mLatitude='+latitude+'&mLongitude='+longitude+'&data='+encodeURI(voucherItem));
			$.ajax({
					 //http://127.0.0.1:8000/mreporting/sync_mobile/orderSubmit?cid=DELTA&repid=101&password=123&synccode=6520&routeid=DE15&mLatitude=&mLongitude=&data=14891rdrd170fdfdACTIVIT%20B%20100ML.%20SYRUPfdfd15.74fdfd5fdrd204fdfdACTIVIT%20GOLD%20TABfdfd135.34fdfd6
					  url: apipath+'getSubmitResultDel?cid='+localStorage.cid+'&repid='+localStorage.userid+'&password='+localStorage.password+'&synccode='+localStorage.synccode+'&routeid='+localStorage.routeId+'&mLatitude='+latitude+'&mLongitude='+longitude+'&data='+encodeURI(voucherItem),
					  success: function(result) {
						  
						if (result!='NO'){
							resArray=result.split(',')
							if (resArray[0]=='success'){
								var vRes="Delivery "+"Voucher No. "+resArray[1]
								$('#successVno').empty();
								$('#successVno').append(vRes).trigger('create');
											
								url = "#pageEnd"; 
								$(location).attr('href',url);
							}							
						}else{
							alert('Authentication Error');
							}
						
					  },
					  error: function(result) {
						alert(errror_str);
					  }				  
			});
			
		}else{	
			alert (errorStr);		
			}
}


function dcrDataSubmit(){
		var drName=$("#doctor").val();
		var drCampaign=$("#dr_camp").val();
		var drGift=$("#dr_gift").val();
		var drSample=$("#dr_sample").val();
		var drSampleQty=$("#dr_sample_qty").val();
		
	}

/*function add_theme(a) {
	localStorage.theme='"static/'+a+'.css"';
	alert (localStorage.theme);	
	location.reload();
	}
*/

//====================Delivery IM Item add Start==========
function addItemIM(){
	var item_value=$("#itemID_add_IM").val();
	var itemArray = item_value.split('#');
	//alert (itemArray[0]);
	//$("#title_table").show();
	
	itemID=itemArray[1];
	itemName=itemArray[0];
	//alert (itemID)
	if ((itemID != 0) && (itemID != undefined) && (itemID != 'undefined')){
		im_number= im_number+1;
		$('#item_table').append('<tr id="'+im_number.toString()+'_row"><td style="color:#063">'+itemName+
		'<input name="'+im_number.toString()+'_IMID" id="'+im_number.toString()+'_IMID"  value="'+itemID+'" type="hidden">'+
		'<input name="'+im_number.toString()+'_item_name" id="'+im_number.toString()+'_item_name"  value="'+itemName+'" type="hidden">'+		
		'</td><td> <input style="height:25px; width:90%;color:#063;background-color:#E6F2FF; font-size:15px; font-weight:bold;border:thin; border-radius:5%;" name="'+im_number.toString()+'_IM" id="'+im_number.toString()+'_IM" placeholder="" value="" type="number"></td><td><input style="background-color:#B6DADA; color:#0AA; border:thin; border-radius:5%" name="'+im_number.toString()+'_IM_del" id="'+im_number.toString()+'_IM_del" type="button" onClick="deleteItem('+im_number+')" value="X"></td> </tr>');
	}
}

function deleteItem(im_number){
	$('#'+im_number.toString()+'_row').remove();
}

function confirmDeliveryIM(){
	
	$('#combo_div').hide();
	var delivery_submit_string ="";
	for (var i=1; i < im_number+1; i++){
		var item_id=$("#"+i.toString()+"_IMID").val();
		var item_name=$("#"+i.toString()+"_item_name").val();
		var item_IM=$("#"+i.toString()+"_IM").val();
		
		if ((item_id != undefined) && (item_IM != undefined) & (item_id != "") && (item_IM != "")) {
			delivery_submit_string=delivery_submit_string+item_id+'fdfd'+item_name+'fdfd'+item_IM+'rdrd'
		}
	}
	
	//alert (delivery_submit_string.length);
	if (delivery_submit_string.length ==0){
		$("#erro_IM").html ('Need IMEI' );
		$('#sub_button_IM').hide();
		$('#cnf_button_IM').show();
		
	}
	else{
		$("#erro_IM").hide ('');
		$('#itm_IM').find('input, textarea, button, select').attr('disabled','disabled');
		$('#submit_string_IM').val(delivery_submit_string);
	
		$('#sub_button_IM').show();
		$('#cnf_button_IM').hide();
		
		getLatLong();
	}
}

function submitDeliveryIM(){
	var submit_string_IM=$('#submit_string_IM').val();
	var clientID_IM=$('#clientID_IM').val();
	
	
	
	
	if (submit_string_IM!=''){
		var latitude=$("#lat_IM").val();
		var longitude=$("#long_IM").val();
			
			//$("#erro_IM").html (apipath+'getSubmitResultDel_IM?cid='+localStorage.cid+'&repid='+localStorage.userid+'&password='+localStorage.password+'&synccode='+localStorage.synccode+'&routeid='+localStorage.routeId+'&mLatitude='+latitude+'&mLongitude='+longitude+'&client='+clientID_IM+'&data='+submit_string_IM);
		$.ajax({
			  type: 'POST',
			  url: apipath+'getSubmitResultDel_IM?cid='+localStorage.cid+'&repid='+localStorage.userid+'&password='+localStorage.password+'&synccode='+localStorage.synccode+'&routeid='+localStorage.routeId+'&mLatitude='+latitude+'&mLongitude='+longitude+'&client='+clientID_IM+'&data='+submit_string_IM,
			  success: function(result) {
				  
				if (result!='NO'){
					resArray=result.split(',')
					if (resArray[0]=='success'){
						var vRes="Delivery "+"Voucher No. "+resArray[1]
						$('#successVno').empty();
						$('#successVno').append(vRes).trigger('create');
									
						url = "#pageEnd"; 
						$.mobile.navigate(url);
						location.reload();
						//$(location).attr('href',url);
						
						
					}							
				}else{
					alert('Authentication Error');
					}
				
			  },
			  error: function(result) {
				alert(errror_str);
			  }				  
			});
			
		}else{	
			alert (errorStr);		
			}
	
	
}

//====================Delivery IM Item add End=================

function go_home(){
	$.mobile.navigate("#pageHome"); 
	location.reload();
}