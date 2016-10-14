
var parameter_notify = document.getElementById("parameter_notify").innerHTML;
var target="ws://localhost:8080/tvos-webapp/chatSocket?username="+parameter_notify;
var ws = null;
window.onload = function(){
	if("WebSocket" in window){
		ws = new WebSocket(target);
	}else if ("MozWebSocket" in window){
		ws = new MozWebSocket(target);
	}else{
		alert("不支持websocket")
	}
	
	ws.onmessage = function(event) {
		 eval("var msg ="+event.data);
		 console.info(msg);
	}
	
	
	$("#notify1").click(function(){
			var notify1_title = $("#notify1_title").val();
			var notify1_message = $("#notify1_message").val();
			notify(1,notify1_message,notify1_title);
		});
	
	$("#notify2").click(function(){
			var notify2_title = $("#notify2_title").val();
			var notify2_message = $("#notify2_message").val();
			notify(2,notify2_message,notify2_title)
		});
}

//***********************公众号信息推送 开始符****************
var notify = function(id,message,title){
	var obj = {
			type : "public",
			from :"",
			to : "",
			id : id,
			message : message,
			title : title,
			imgSrc : "img/public/dangjiantubiao.jpg",
			nextPageUrl : "public2.html"
	}

	var str = JSON.stringify(obj);
	ws.send(str);
}
//***********************公众号信息推送 结束符****************


