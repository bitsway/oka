
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
//var apipath=location.protocol + "//" + location.hostname + (location.port && ":" + location.port) + "/okapia/mrep_okapia/";
//var apipath="http://m.businesssolutionapps.com/mrepmobile/mrep_okapia/";
//var apipath="http://e.businesssolutionapps.com/okapiamobile/mrep_okapia/";


//var apipath=location.protocol + "//" + location.hostname + (location.port && ":" + location.port) + "/okapia/mrep_okapia_without_item/";
var apipath="http://e.businesssolutionapps.com/okapiamobile/mrep_okapia_without_item/";
    

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
			//$("#mySyncError").html(apipath+'syncRepSS?cid='+cidValue+'&repid='+repid+'&mobile=8801234567890&password='+password) ;
			 
			 $("#mySyncError").text("Sync in Progress. Pleae Wait...");
			 $("#syncButton").hide();
			 
			
			 
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
							//alert (loginResult);
							syncCode=loginResultArray[1];
							routeListStr=loginResultArray[2];
							itemListStr=loginResultArray[3];
							dvCount=loginResultArray[4];
							itemCombo=loginResultArray[5];
							itemComboIM=loginResultArray[6];
							ime_range=loginResultArray[7];
							
							//$("#mySyncError").html(ime_range);
							//alert (ime_range);
							ime_rangeArray = ime_range.split(',');	
							ime_min=ime_rangeArray[0];
							ime_max=ime_rangeArray[1];
							
							
							//alert (ime_min);	
							//alert (ime_max);
							localStorage.cid=cidValue;
							localStorage.userid=repid;
							localStorage.password=password;
							localStorage.synccode=syncCode;
							localStorage.routeList=routeListStr;
							localStorage.itemList=itemListStr;
							localStorage.itemDivCount=dvCount;
							localStorage.itemCombo=itemCombo;
							localStorage.itemComboIM=itemComboIM
							
							localStorage.ime_min=ime_min
							localStorage.ime_max=ime_max
							
							//alert (localStorage.itemCombo);
							//$("#mySyncError").html(loginResult);
							$("#mySyncError").html("Authorization and basic data synchronized. Please Sync Route.");
							$("#cid").val("") ;
							$("#repid").val("") ;
							$("#password").val("") ;
							
							
							// ================end route================
							$("#routeList").html(localStorage.routeList)
							
							//$('#itemComboDiv_IM').empty();
							//$('#itemComboDiv_IM').append(localStorage.itemComboIM).trigger('create');
							
							//var url = "#pageSync";
							//$.mobile.navigate(url);
						//	$("#mySyncError").html("Authorization and basic data synchronized. Please Sync Route.");
							
							$("#syncButton").show();
							//$(location).attr('href',url);
							
							//---------------
						}else if (loginResultArray[0]=='NO'){
							var url = "#pageSync";      
							
							//$(location).attr('href',url);
							$.mobile.navigate(url); 
							$("#mySyncError").html('Authentication Error. Please contact your company system admin');
							$("#syncButton").show();			
						}
				  },
				  error: function(result) {
					  $("#mySyncError").html(errror_str);
					  $("#syncButton").show();
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
			$("#mySyncError_route").text("Sync in Progress. Pleae Wait...");
			
			$("#routeButton").hide();
			
			
			
			
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
							//alert ('Sorry Network not available');
							$("#mySyncError_route").text('Sorry Network not available. Please check network signal and try to submit again.');	
						}
						//alert (result);
						var clientResArray = result.split('rdrd');			
						if (clientResArray[0]=='YES'){
							
							clientListStr=clientResArray[1];
																
							localStorage.routeId=routeId;
							localStorage.routeName=routeName;
							localStorage.clientListStr=clientListStr;
							
							
							
							
							var set_route="Route '"+localStorage.routeName+" ("+localStorage.routeId+" )' Synced Successfully"
							localStorage.set_route_msg=set_route
							
							$("#mySyncError_route").text(localStorage.set_route_msg);	
							
							
							$("#routeButton").show();
							
							//$('#clientList').empty();
//							$('#clientList').append(temp).trigger('create');
//							
							//$('#clientList').html(localStorage.clientListStr.toString());
							//location.reload();
							
							/*var url = "#pageClient";
							$(location).attr('href',url);*/
							//var url = "#pageSyncRoute";
							//$.mobile.navigate(url); 
							//location.reload();
							
							//---------------
						}else if (clientResArray[0]=='NO'){
							$("#mySyncError_route").text('Authentication Error');		
							
							$("#routeButton").show();
							
							var url = "#pageSyncRoute";
							$.mobile.navigate(url); 
							//location.reload();
							//$(location).attr('href',url);
						}
				  },
				  error: function(result) {
					$("#mySyncError_route").text(errror_str);	
					$("#routeButton").show();
					var url = "#pageSyncRoute";
					$.mobile.navigate(url); 
					//alert(errror_str);
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
		//location.reload();
	
	}else{
		$("#mySyncError_client").text("");
		var clientIdNameArray = clientIdName.split('-');
		var clientId=clientIdNameArray[0];
		var clientName=clientIdNameArray[1];
		
		// getOrder(clientIdName)
		
		
	}
}); 
			

//================== Order
function getdelivery() {
		$("#clientErrMsg").text("");

		var clientIdName= $("#clientID_S").val();
		var submit_type= $("#submit_type").val();

		var itemList=localStorage.itemList;
		//alert(itemList);
		if (itemList==""){
			$("#clientErrMsg").text("Client or Outlet not available");	
		}else{	
				var clientArray=clientIdName.split("-");
				var clientName=clientArray[0];
				var clientId=clientArray[1];
				//alert (clientIdName);
				$("#clientID_1").val(clientId);
				$("#clientID").val(clientId);
				$("#clientName").val(clientName);
				
				
				//Delivery IM
				localStorage.clientId=clientId
				localStorage.clientName=clientName
				
				
				$("#clientID_1_IM").val(localStorage.clientId);
				$("#clientID_IM").val(localStorage.clientId);
				$("#clientName_IM").val(localStorage.clientName);
				//alert(clientArray);				
				
				
				var clientStr='<table data-mode="reflow" class="ui-responsive table-stroke" style="width:100% ;color:#95004A"><tr><td> '+clientName+' ('+clientId+')</td></tr></table>';//<tr><td style="width:25%"> Client Name</td><td>: '+clientName+'</td></tr><tr><td>'+'&nbsp;'+'</td><td>&nbsp;</td></tr></table>';
				
				
				
				$('#clientDiv').empty();
				$('#clientDiv').append(clientStr).trigger('create');
				
					submit_type=='DELIVERYIM';
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
					

		
			}
				  
}

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
		ob.prepend("<option value='"+ client_name+'-'+client_id +"'>" + client_name +"(" +client_id +")" + "</option>");
		}						
	//var url = "#pageClient";
	//$(location).attr('href',url);
	//$.mobile.navigate(url); 
	//location.reload();
	// ob.prepend("<option value="+ blank +">" + text + "</option>");
	// =====================client combo end=================
	
	

			
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







//==============client sync================
function add_item() {
	$("#"+item_value).focus();
	}
//==================submit type

function set_submit_type_del_im() {
	// alert ('nadira');
	$("#submit_type").val('DELIVERYIM');
	localStorage.submit_type='DELIVERYIM';
}
// =====================delivery submit=============

//====================Delivery IM Item add Start==========
function addItemIM(){
	im_number= im_number+1;
	localStorage.im_number=im_number;
	
	$('#item_table').append('<tr id="'+im_number.toString()+'_row" style="height:35px;  font-size:24px"><td style="color:#95004A">IMEI'+
		'</td><td> <input style="height:30px; width:90%;background-color:#F4F4F4; color:#95004A; font-size:15px; font-weight:bold;border:thin; border-radius:5%;" name="'+im_number.toString()+'_IM" id="'+im_number.toString()+'_IM" placeholder="" value="" type="number"></td><td><input style="background-color:#F4F4F4; color:#95004A; border:thin; border-radius:5%" name="'+im_number.toString()+'_IM_del" id="'+im_number.toString()+'_IM_del" type="button" onClick="deleteItem('+im_number+')" value="   X   "></td> </tr>');

}

function deleteItem(im_number){
	$('#'+im_number.toString()+'_row').remove();
}

function confirmDeliveryIM(){
	var delivery_submit_string ="";
	//alert (localStorage.im_number);
	var ime_error=0;
	
	for (var i=1; i < im_number+1; i++){
		//var item_id=$("#"+i.toString()+"_IMID").val();
//		var item_name=$("#"+i.toString()+"_item_name").val();
		var item_IM=$("#"+i.toString()+"_IM").val();
		//alert (item_IM);
		
		if ((item_IM != undefined) && (item_IM != "")){
			
			if ((item_IM.length < parseInt(localStorage.ime_min)) || (item_IM.length > parseInt(localStorage.ime_max)) || (delivery_submit_string.indexOf(item_IM) != -1)){
				ime_error=1;
				$("#"+i.toString()+"_row").css({ 'background-color' : '#FDE'});
			}
			else{
				//ime_error=0;
				$("#"+i.toString()+"_row").css({ 'background-color' : 'transparent'});
			}
			//alert ('nadira');
			if (ime_error != 1) {
				delivery_submit_string=delivery_submit_string+item_IM+'rdrd'
				//delivery_submit_string=delivery_submit_string+item_id+'fdfd'+item_name+'fdfd'+item_IM+'rdrd'
			}
		}
	}
	
	//alert (delivery_submit_string.length);
	if ((delivery_submit_string.length ==0) || (ime_error==1)){
		$("#erro_IM").html ('Error in IMEI' );
		$('#sub_button_IM').hide();
		$('#cnf_button_IM').show();
		
	}
	else{
		//$("#erro_IM").hide ();
		$('#itm_IM').find('input, textarea, button, select').attr('disabled', true);
		$('#submit_string_IM').val(delivery_submit_string);
	
		$('#combo_div').hide();
		$('#sub_button_IM').show();
		$('#cnf_button_IM').hide();
		
		$("#erro_IM").html ('' );
		
		getLatLong();
	}
}

function submitDeliveryIM(){
	var submit_string_IM=$('#submit_string_IM').val();
	var clientID_IM=$('#clientID_IM').val();
	
	if (submit_string_IM!=''){
		
		var latitude=$("#lat_IM").val();
		var longitude=$("#long_IM").val();
		//var latitude='13133';
		//var longitude='1354646';
		
		//alert (latitude);
		if ((latitude=='') || (longitude=='')){
			
			$("#erro_IM").html("Location can not be confirmed. Please check you have the GPS and AGPS on.");
			$("#erro_IM").show();			
						
			$('#sub_button_IM').hide();
			$('#cnf_button_IM').show();
			$('#combo_div').show();
			$('#itm_IM').find('input, textarea, button, select').attr('disabled', false);
		}
		
		else{
			//$('#sub_button_IM').hide();
			//alert ('nadira');
			//$("#erro_IM").html (apipath+'getSubmitResultDel_IM?cid='+localStorage.cid+'&repid='+localStorage.userid+'&password='+localStorage.password+'&synccode='+localStorage.synccode+'&routeid='+localStorage.routeId+'&mLatitude='+latitude+'&mLongitude='+longitude+'&client='+clientID_IM+'&data='+submit_string_IM);
			
			$('#sub_button_IM').hide();
			$('#erro_IM').html("Sync in progress. Please Wait ..");
			$("#erro_IM").show();
			$.ajax({
				  type: 'POST',
				  url: apipath+'getSubmitResultDel_IM?cid='+localStorage.cid+'&repid='+localStorage.userid+'&password='+localStorage.password+'&synccode='+localStorage.synccode+'&routeid='+localStorage.routeId+'&mLatitude='+latitude+'&mLongitude='+longitude+'&client='+clientID_IM+'&data='+submit_string_IM,
				  success: function(result) {
					//alert (result);  
					if (result!='NO'){
						resArray=result.split('#')
						//alert (result)
						if (resArray[0]=='success'){
							var vRes="Delivery "+"Voucher No. "+resArray[1]
							//$('#successVno').empty();
							$('#successVno').html(vRes);
										
							url = "#pageEnd"; 
							$.mobile.navigate(url);
							//location.reload();
						}
						if (resArray[0]=='invalidIM'){
							
							$("#erro_IM").html(resArray[1]);
							$("#erro_IM").show();			
							
							var error_ime_found=resArray[1].replace('Invalid IM:','')
							//$("#erro_IM").html(error_ime_found);
							check_invalid_ime(error_ime_found);
							
							$('#sub_button_IM').hide();
							$('#cnf_button_IM').show();
							$('#combo_div').show();
							$('#itm_IM').find('input, textarea, button, select').attr('disabled', false);
							
							
						}
						
					}else{
						$("#erro_IM").html('Authentication Error');
						
						$('#sub_button_IM').hide();
						$('#cnf_button_IM').show();
						$('#combo_div').show();
						$('#itm_IM').find('input, textarea, button, select').attr('disabled', false);
						//alert('Authentication Error');
						}
					
				  },
				  error: function(result) {
					  $("#erro_IM").html(errror_str);
					  
					  $('#sub_button_IM').hide();
					  $('#cnf_button_IM').show();
					  $('#combo_div').show();
					  $('#itm_IM').find('input, textarea, button, select').attr('disabled', false);
					//alert(errror_str);
				  }				  
				});
			}//end else
		} // end if submit string
		else{	
			$("#erro_IM").html(errror_str);
			//alert (errorStr);		
			}
	
	
}

function check_invalid_ime(str){
	//alert (localStorage.im_number);
	
	//alert (str);
	resArray=str.split(',')
	
	for (var j=0; j < resArray.length -1; j++){
		for (var i=1; i < im_number+1; i++){
			var item_IM=$("#"+i.toString()+"_IM").val();
			if (item_IM==resArray[j]){
				$("#"+i.toString()+"_row").css({ 'background-color' : '#FDE'});
			}
			
		}
	}
}


//====================Delivery IM Item add End=================

function go_home(){
	$.mobile.navigate("#pageHome"); 
	location.reload();
}


//===================Notice Board=====================
function notice_board() {
		
		//$('#notice_error').html(apipath+'getNotice?cid='+localStorage.cid+'&repid='+localStorage.userid+'&password='+localStorage.password+'&synccode='+localStorage.synccode);
		$.ajax({
			  type: 'POST',
			  url: apipath+'getNotice?cid='+localStorage.cid+'&repid='+localStorage.userid+'&password='+localStorage.password+'&synccode='+localStorage.synccode,
			  success: function(result) {
				  
				if (result!=''){
					
					resArray=result.split('rdrd')
					var notice_string ='';
					for (var i=0; i<resArray.length-1; i++){
						var notice_singleArray = '';
						var sl ='';
						var notice_date ='';
						var notice ='';
						
						notice_singleArray = resArray[i].split('fdfd');
						sl =notice_singleArray[0];
						notice_date =notice_singleArray[1].substr(0,10);
						notice =notice_singleArray[2];
						notice_string=notice_string+'<div style="color:#BC073E"> '+notice_date+':</div><div style="color:#BC073E">'+notice+'</div></br>'
					}
					
					localStorage.notice=notice_string;
					$('#notice').html(localStorage.notice);
								
					//url = "#pageEnd"; 
					//$.mobile.navigate(url);
					//location.reload();					
				}else{
					$('#notice').html('Authentication Error');
					//alert('Authentication Error');
					}
				
			  },
			  error: function(result) {
				$('#notice').html(errror_str);
				//alert(errror_str);
			  }				  
			});
	}
	
	
//===================Report=====================
function show_report() {
		
		var date_from=$("#date_from").val();
		var date_to=$("#date_to").val();
		
		//alert (date_from);
		//$('#reporterror').html(apipath+'getReport?cid='+localStorage.cid+'&repid='+localStorage.userid+'&password='+localStorage.password+'&synccode='+localStorage.synccode+'&date_from='+date_from+'&date_to='+date_to);
		
		$('#reporterror').html("Sync in progress. Please Wait ..");
		$('#reportShow').hide();
		$.ajax({
			  type: 'POST',
			  url: apipath+'getReport?cid='+localStorage.cid+'&repid='+localStorage.userid+'&password='+localStorage.password+'&synccode='+localStorage.synccode+'&date_from='+date_from+'&date_to='+date_to,
			  success: function(result) {
				  
				if (result!=''){
					$('#report_table').empty()
					$('#report_table').append(' <tr style="background-color:#6F0037 ; font-weight:bold" ><td width="5px" ></td><td >Model</td><td>QTY</td></tr>');

					resArray=result.split('rdrd')
					var notice_string ='';
					for (var i=0; i<resArray.length-1; i++){
						var report_singleArray = '';
						var item_name ='';
						var report_count ='';
						
						
						report_singleArray = resArray[i].split('fdfd');
						item_name =report_singleArray[0];
						report_count =report_singleArray[1];
						
						var row_string=''
						if (i%2==0){
							row_string='<tr style="background-color:#F7F7F7"><td></td><td style="color:#003E3E">'+item_name+
													'</td><td style="color:#003E3E" align="left">'+report_count+'</td></tr>'
						}
						else{
							row_string='<tr ><td></td><td style="color:#003E3E">'+item_name+
													'</td><td style="color:#003E3E" align="left">'+report_count+'</td></tr>'
						}
						$('#report_table').append(row_string);

						
					}
					
					
					$('#reporterror').html("");
					$('#reportShow').show();
								
					//url = "#pageEnd"; 
					//$.mobile.navigate(url);
					//location.reload();					
				}else{
					$('#reporterror').html("Authentication Error");
					$('#reportShow').show()
					//alert('Authentication Error');
					}
				
			  },
			  error: function(result) {
				  $('#reporterror').html("Authentication Error");
				  $('#reportShow').show()
				//alert(errror_str);
			  }				  
			});
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
	
	localStorage.itemComboIM="";
	localStorage.ime_min="";
	localStorage.ime_max="";

	localStorage.set_route_msg="";
	
	localStorage.notice="";
	
	url = "#pageSync"; 
	$.mobile.navigate(url);
	location.reload();
	
}

function check_auth (){
	
	if (localStorage.synccode==""){
		url = "#pageSync"; 
		$.mobile.navigate(url);
	}
	else{
		url = "#pageHome"; 
		$.mobile.navigate(url);
		
	}
}

function set_paget (){
		url = "#pageClient"; 
		$.mobile.navigate(url);
		location.reload();
	
}