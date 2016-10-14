/**
 * 聊天
 */

let storeData = fetch();
//var user = storeData.user;
var name_parameter = document.getElementById("parameterName").innerHTML;
var currentUserId = null;

//alert(name);
var target="ws://192.168.1.104:8080/tvos-webapp/chatSocket?username="+name_parameter;
var ws = null;

window.onload = function(){
	if("WebSocket" in window){
		ws = new WebSocket(target);
	}else if ("MozWebSocket" in window){
		ws = new MozWebSocket(target);
	}else{
		alert("不支持websocket")
	}
	
//**********************************根据分辨率设置样式 开始符*****************************************
//   alert(window.screen.height);
	if(window.screen.width == 1920 && window.screen.height == 1280){

		document.getElementById("chatFieldTextareaId").setAttribute("class","textareaFor1280x720");
		 document.getElementById("userDetail").setAttribute("class","userDetailFor1280x720");
		
	}
	if(window.screen.width == 1280 && window.screen.height == 720){

//		document.getElementById("chatFieldTextareaId").setAttribute("class","textareaFor1280x720");
//		 document.getElementById("userDetail").setAttribute("class","userDetailFor1280x720");
		document.getElementById("appPanel").setAttribute("class","appPanelFor720x567");
		document.getElementById("userDetail").setAttribute("class","userDetailFor720x567");
		

		
	}

	if(window.screen.width == 720 && window.screen.height == 576){

		document.getElementById("appPanel").setAttribute("class","appPanelFor720x567");
		document.getElementById("userDetail").setAttribute("class","userDetailFor720x567");
	}
//**********************************根据分辨率设置样式 结束符*****************************************	
//**********************************取得当前用户id 开始符*****************************************		
	var getCurrentUserId = function(name_parameter){
		var storeData = fetch();
		for(item in storeData.userlist){
			if(storeData.userlist[item].name == name_parameter){
				return storeData.userlist[item].id;
			}
		}
	};
	currentUserId = getCurrentUserId(name_parameter);
//**********************************取得当前用户id 结束符*****************************************	
		
//**********************************通信(单聊、群聊、公众号、题) 开始符*****************************************		
	ws.onmessage = function(event) {
		 eval("var msg ="+event.data);
		 console.info(msg);
		 
//		 //定义一个列表上移至第一行的函数
//		 var moveToTopByAlterStore = function(obj){
//			 
//		 }
		 
		 //type=chat表示聊天 
		//************************单聊 开始符******************
		 if(msg.type == "chat"){
//			 var sessionId = document.getElementById("getSessionIdInput").value;
			 var from_name = msg.from;
			 let currentData = fetch();
			 var from_Id = null;
			 for( item in currentData.userlist){
				 if(currentData.userlist[item].name == from_name){
					 from_Id = currentData.userlist[item].id;
				 }
			 }
			 if( from_Id !=null ){
				 for(item in currentData.sessionlist ){
					 if(currentData.sessionlist[item].userid == from_Id ){
						 var obj = {
								text : msg.message,
								date : msg.date,
								self : false
						 }
						 currentData.sessionlist[item].message.push(obj);
					 }
				 }
				 
				 console.info(currentData);
				 save(currentData);
				 
				 document.getElementById("refreshDataBtn").click();
			 }
			//***********************单聊 结束符***********************	
			 
			//***********************群聊 开始符****************
		 }else if(msg.type == "group"){
			 console.info(msg.message);
			 var from_name = msg.from;//实际上应该是id不该是name
//			 var sessionId = document.getElementById("getSessionIdInput").value;
			 var groupId = msg.from_groupid;
			 let currentData = fetch();
			 var from_id = null;
			 for(item in currentData.userlist){
				 if(currentData.userlist[item].name == from_name){
					 from_id =  currentData.userlist[item].id;
				 }
			 }
			 if( groupId !=null && from_id != null){
				 for(item in currentData.groupsessionlist ){
					 if(currentData.groupsessionlist[item].groupid == groupId ){
						 var obj = {
								text : msg.message,
								date : msg.date,
								self : false,
								userid : from_id
						 }
						 currentData.groupsessionlist[item].message.push(obj);
					 }
				 }
				 
				 save(currentData);
				 document.getElementById("refreshDataBtn").click();
			 }
		 
			//***********************群聊 结束符****************
			 
			//***********************公众号信息推送 开始符****************
		 }else if(msg.type == "public"){
				 console.info(msg.message);
				 var storeData = fetch();
				//判断currentlist中有没有这个公众号
				 var existFlag = function(_obj){ 
					 for(item in storeData.currentlist){
						 var _id = msg.type+"id";
						 if(_id in storeData.currentlist[item]){
							 if(_obj.id == storeData.currentlist[item][_id]){
								 return true;
							 }
						 }
						 
					 }
					 return false;
				 }
				 var changePublicList = function(data){
					 var obj = {
							 	id : msg.id,
								type : "public",
								title : msg.title,
								infoid : 1,
								imgSrc : msg.imgSrc,
								nextPageUrl : msg.nextPageUrl
					 };
					 data.publicinfolist.push(obj);
					 
					 return data;
				 }
				 
				//通过改变store将公众号上移至第一行  flag表示是否是新增的
				 var moveToTopByAlterStore = function(obj,flag){
					 var newStoreData = fetch();
					 var getCurrentSessionIndexByTypeAndId = function(type,id){
						 var id_ = obj.type+"id";
						 for(item_ in newStoreData.currentlist){
							 if(type == newStoreData.currentlist[item_].type && id == newStoreData.currentlist[item_][id_]){
								 return item_;
							 }
						 }
						 return null;
					 }
					 if(flag){
						 newStoreData.currentlist.splice(0,0,obj.newpublic);
					 }else {
						 var index = getCurrentSessionIndexByTypeAndId(msg.type,msg.id);//取得这个type跟id下的currnentlist index
						 var newpublic = newStoreData.currentlist[index];
						 newStoreData.currentlist.splice(index,1);//先删除以前的
						 newStoreData.currentlist.splice(0,0,newpublic);//添加至第一行
						 
						 newStoreData=changePublicList(newStoreData);//改变公众号list
						 save(newStoreData);
						 document.getElementById("refreshDataBtn").click();
					 }
				 }
				 
				 //判断currentlist中有没有这个公众号 有就提示消息 没有就新建一条
				 if(existFlag(msg)){
					 var public_div_id = "typepublicid"+msg.id;
					 $("#"+public_div_id+" span").css({"display":"inline-block"});
//					 $("#"+public_div_id+" a").append('<span class="badge">1</span>');
					 $("#siderbarimgArea").css({"background-color":"brown"});
					 moveToTopByAlterStore(msg,false);
	//				 $("#searchinfolist span").css({"display":"inline-block"});
				 }else{
					 var newpublic = {
							 type : 'public',
							 publicid : msg.id,
					 }
					 msg.newpublic = newpublic;
					 moveToTopByAlterStore(msg,true);
				 }
			};
			
			//***********************公众号信息推送 结束符****************
		
//		 casualData = fetch();
//		 console.info(casualData);
//		 alert(sessionId);
	};
	
//**********************************通信(单聊、群聊、公众号、题) 结束符*****************************************
}
