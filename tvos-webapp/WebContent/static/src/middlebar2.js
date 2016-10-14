//点击聊天图片后的中间栏
var Middlebar2 = Vue.extend({
	data : function(){
		return{
			middlebar2style : {
				height:'100%',
				width:'30%',
				// border:'1px solid yellow',
				float:'left',
				margin:'4px',
				marginLeft:"0px",
				marginRight:"0px",
				background:'#EAEAEA',
				padding:'0px'
			}
		}
	},
	props : ['user','search','sessionid','userlist','sessionlist','searchkey','sessionindex','publiclist','grouplist','chatpanelflag','selectedgroupid','selectedpublicid','iframeflag'],
	methods : {
		selectContacts : function (item) {
			this.chatpanelflag = 1;
			this.sessionindex = this.userlist.indexOf(item);
			this.sessionid = item.id;
		},
		selectPublic : function(item) {
			this.iframeflag = false;
			var ifraRight = document.getElementById("ifraRight");
			console.log("ifraRight");
			// if(ifraRight){ifraRight.location.reload(true)};
			this.selectedpublicid = item.id;
			this.chatpanelflag = 2;
			// alert('public');
		},
		selectGroups : function(item) {
			 this.selectedgroupid = item.id;
			 this.chatpanelflag = 3;
//			alert('groups');	
		},
		contactsListMoveUp :function(){
			var maxHeight=document.getElementById("contactLists").getElementsByTagName("ul")[0].getElementsByTagName("li").length*50;
			//一次滚动距离
			var targety = 80;
			//滚动速度 dx*0.3
			var dx = 20;
			var i = 0;
			var moveFun = function(){
				document.getElementById("contactLists").scrollTop-=dx*0.3;
				i++;
				// var a=null;
				// var le=parseInt(document.getElementById("contactLists").scrollTop)+211;
				// document.getElementById("contactLists").scrollTop+=dx*0.3;
				var rest = targety - dx*0.3*i;
				var clearScroll = setTimeout(moveFun,50);
				if(rest*.3<1){
					clearTimeout(clearScroll);
					i = 0;

				}
			};
			moveFun();
		},
		contactsListMoveDown :function(){
			// alert('contactsListMoveDown');
			var maxHeight=document.getElementById("contactLists").getElementsByTagName("ul")[0].getElementsByTagName("li").length*50;
			//一次滚动距离
			var targety = 80;
			//滚动速度 dx*0.3
			var dx = 20;
			var i = 0;
			var moveFun = function(){
				document.getElementById("contactLists").scrollTop+=dx*0.3;
				i++;
				// var a=null;
				// var le=parseInt(document.getElementById("contactLists").scrollTop)+211;
				// document.getElementById("contactLists").scrollTop+=dx*0.3;
				var rest = targety - dx*0.3*i;
				var clearScroll = setTimeout(moveFun,50);
				if(rest*.3<1){
					clearTimeout(clearScroll);
					i = 0;

				}
			};
			moveFun();
			
		},
	},
	filters : {
		searchfilter : function(list){
			return list.filter(item => item.name.indexOf(this.searchkey)>-1);
		}
	} ,
	template:
		'<div v-bind:style="middlebar2style">' +
			//搜索框区域
			'<div id="searchtextarea">' +
				'<div id="search">' +
					'<div class="input-append" >' +
						'<input class="span2" id="searchtextinfo" v-model="searchkey" type="text" placeholder="请输入搜索内容"/>' +
					'</div>' +
				'</div>' +
			'</div>' +
			//联系人区域
			'<div id="contactsAndPublic">' +
				// '<div class="newFriends">' +
				// 	'<div class="newFriendsTitle">新的朋友</div>' +
				// 	'<div class="newFriendsList">' +
				// 	'</div>' +
				// '</div>'+

				//公众号
				'<div class="area publicNumber">' +
					'<div class="title publicNumberTitle">公众号</div>' +
					'<div class="publicNumberList">' +
						'<ul>' +
							'<a href="#"><li v-for="item in publiclist | searchfilter" v-on:click="selectPublic(item)"><img v-bind:src="item.img" alt="头像"}/><p>{{item.name}}</p></li></a>'+
							// '<input type="text" v-model="userlist[0].id">'+
						'</ul>'+
					'</div>' +
				'</div>'+
				//群组
				'<div class="area chatGroups">' +
					'<div class="title chatGroupsTitle">群聊</div>' +
					'<div class="chatGroupsList">' +
						'<ul>' +
							'<a href="#"><li v-for="item in grouplist | searchfilter" v-on:click="selectGroups(item)"><img v-bind:src="item.img" alt="头像"}/><p>{{item.name}}</p></li></a>'+
							// '<input type="text" v-model="userlist[0].id">'+
						'</ul>'+
					'</div>' +
				'</div>'+
				//联系人
				'<div class="area">' +
					'<div class="title contacts">联系人</div>' +
					'<div id="contactsListArea">' +
						'<div id="contactLists">'+
							'<ul>' +
								'<a href="#"><li v-for="item in userlist | searchfilter" v-on:click="selectContacts(item)"><img v-bind:src="item.img" alt="头像"}/><p>{{item.name}}</p></li></a>'+
								// '<input type="text" v-model="userlist[0].id">'+
							'</ul>'+
						'</div>'+
						'<div id="contactsListMove">'+
							'<div id="contactsListMoveUp" v-on:click="contactsListMoveUp()"><img src="img/icon/arrow414.png"></div>'+
							'<div id="contactsListMoveDown" v-on:click="contactsListMoveDown()"><img src="img/icon/arrow414xia.png"></div>'+
						'</div>'+
					'</div>' +
				'</div>'+
			'</div>' +
		'</div>'
})