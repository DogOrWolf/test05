var informations = null;
var target="ws://localhost:8080/tvos-webapp/chatSocket?username=publicNotify";
window.onload = function(){
	if("WebSocket" in window){
		ws = new WebSocket(target);
	}else if ("MozWebSocket" in window){
		ws = new MozWebSocket(target);
	}else{
		alert("不支持websocket")
	}
	
	informations = [
	                {
				title : "上外图书馆直属党支部赴陈云纪念馆开展组织生活title11",
				imgSrc : "img/public/dangjiantubiao.jpg",
				nextPageUrl : "public2.html"
			}
			// ,{
			// 	title : "上外图书馆直属党支部赴陈云纪念馆开展组织生活title22",
			// 	imgSrc : "img/public/dangjiantubiao.jpg"
			// }
			];

//		$.ajax({ 
//		   type: "GET",
//		   url:  'http://192.168.1.101:8080/AndroidTv/tv/commonreq.html',
//		   // data: ,
//		   dataType: "json",
//		   complete: function(datas){
//		   		console.info(datas);
//		   		eval("var dataList = "+datas.responseText);
//		   		console.info(dataList);
//		   		for(i in dataList){
//		   			// console.info(dataList[data]);
//		   			var obj = {
//			   			title : dataList[i].news_title,
//			   			imgSrc : dataList[i].pic_url,
//			   			nextPageUrl : dataList[i].url
//			   		}
//
//			   		informations.push(obj);
//		   		}
//		   		
//		   		console.info(informations);
//		       //在这里做些事情，假设返回的json数据里有name这个属性
//		       //有时候可以直接data.name或者data['name']去访问
//		       //但有时候，却要通过var jsonData = eval("("+data.responseText+")");才可以通过jsonData.name访问，而且这种情况下，需要是complete而不是success
//		   }
//	   });


	var publicComponent = new Vue({
		el : '#public',
		data : {
			information : informations
		},
		
	});
	ws.onmessage = function(event) {
		 eval("var msg ="+event.data);
		 console.info(msg);
		 var obj = {
				title : msg.title,
				imgSrc : "img/public/dangjiantubiao.jpg",
				nextPageUrl : msg.nextPageUrl	 
		 }
		 informations.push(obj);
	}
}

