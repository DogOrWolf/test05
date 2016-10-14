
var ChatPanel = Vue.extend({
	data : function(){
		return{
			mainstyle : {
				height:'100%',
				width:'62%',
				// border:'1px solid black',
				float: 'left',
				margin:'4px',
				marginLeft:"0px",
				position : "relative"

			},
			inputtext : ''

		}
	},
	methods : {
		intostore : function(e){
//			alert(this.sessionid)
			if(e.ctrlKey && e.keyCode === 13 && this.inputtext.length){
				//通过websocket ws.send给服务器发送数据
				var selectUserName = "";
				for(num in this.userlist){
//					console.info(user)
					if(this.userlist[num].id == this.sessionid){
						selectUserName = this.userlist[num].name;
					}
				}
				var obj = {
						type : "chat",
						from :name_parameter,
						to : selectUserName,
						message : this.inputtext
				}
				var str = JSON.stringify(obj);
				ws.send(str);
				
				//改变view中的图样 新建一个聊天记录
				this.session.message.push({
					text : this.inputtext,
					date : new Date(),
					self : true

				});
				this.inputtext = "";
				// alert("aaa");
			}
		},
		intostore_group : function(e){
//			alert(this.sessionid)
			if(e.ctrlKey && e.keyCode === 13 && this.inputtext.length){
				//通过websocket ws.send给服务器发送数据
				
				
				var obj = {
						type : "group",
						from :name_parameter,
						from_groupid : this.selectedgroupid,
						message : this.inputtext,
						users : this.usersInSelectedGroup
				}
				var str = JSON.stringify(obj);
				ws.send(str);
				
				//改变view中的图样 新建一个聊天记录
				this.groupsession.message.push({
					text : this.inputtext,
					date : new Date(),
					userid : currentUserId,
					self : true
				});
				this.inputtext = "";
				// alert("aaa");
			}
		}
	},
	filters : {
		time : function(date){
			if (typeof date === 'string') {
                    date = new Date(date);
                }
			return date.getHours() + ':' + date.getMinutes();
		},
		imgSrc :function(groupSession){
			if(groupSession){
				for(item in this.userlist){
					if(groupSession.userid == this.userlist[item].id){
						return this.userlist[item].img;
					}
				}
			}
			return null;
		}
	},
	props : ['session','user','userlist','chatpanelflag','sessionid','selectedgroupid','grouplist','groupsessionlist','publicinfolist','publiclist','selectedpublicid','iframeflag'],
	computed : {
		//单聊
		selectedUsername : function(){
			if(this.session != null){
				var selectUserId = this.session.userid;
				if(selectUserId){
					for (item in this.userlist){
						if(selectUserId==this.userlist[item].id){
							return this.userlist[item].name;
						}
					}
					return null;
				}
			}
			return null;
		},
		messageSingleChatFlag : function(){
			if(this.session != null){
				return true;
			}else{
				return false;
			}
		},
		
		//群聊
		messageGroupChatFlag : function(){
			if(this.groupsession != null){
				return true;
			}else{
				return false;
			}
		},
		usersInSelectedGroup : function(){
			if(this.selectedgroupid){
				var userlist = this.userlist;
				var grouplist = this.grouplist;
				var usersId = null;
				var usersInselected = [];
				for(item in grouplist){
					if(this.selectedgroupid == grouplist[item].id){
						usersId = grouplist[item].users;//users 是一个userid的数组
					}
				}
				if(usersId){
					for(var i=0;i<usersId.length;i++){
						for(item in userlist){
							if(usersId[i] == userlist[item].id){
								usersInselected.push(userlist[item]);
							}
						}
						
					}
				}
				return usersInselected;
			}
		},
		usersNameInSelectedGroup : function(){
			if(this.selectedgroupid){
				var userlist = this.userlist;
				var grouplist = this.grouplist;
				var usersId = null;
				var usersName = [];
				for(item in grouplist){
					if(this.selectedgroupid == grouplist[item].id){
						usersId = grouplist[item].users;
					}
				}
				if(usersId){
					for(var i=0;i<usersId.length;i++){
						for(item in userlist){
							if(usersId[i] == userlist[item].id){
								usersName.push(userlist[item].name);
							}
						}
						
					}
				}
				return usersName;
			}
		},
		groupsession : function(){
			var groupsessionlist = this.groupsessionlist;
			if(this.selectedgroupid){
				if(groupsessionlist != undefined){
					for(item in groupsessionlist){
						if(groupsessionlist[item].groupid == this.selectedgroupid){
							return groupsessionlist[item];
						}
					}
				}
			}
			return null;
		}
	},
	directives: {
            // 发送消息后滚动到底部
            scrollbottom : function() {
            	var my = this;
                Vue.nextTick(function() {
                	my.el.scrollTop = my.el.scrollHeight - my.el.clientHeight;
                });
            }
        },
    components : {
    	'tag-public' : PublicNum 
    },
	template:
		//如果chatpanelflag==1 聊天
		'<div v-bind:style="mainstyle" id="chatPanel" v-if="chatpanelflag==1">' +
			'<div id="contacts">{{selectedUsername}}</div>' +
			// '<input type="search" x-webkit-speech="x-webkit-speech"/>'+
			'<div id="message" v-if="!messageSingleChatFlag">'+
			'</div>'+
			'<div id="message" v-if="messageSingleChatFlag">'+
				'<div id="messageArea"  v-scrollbottom="session.message">'+
//				'<input type=text v-model="sessionid"/>'+
//				'<input type="text" id="getSessionIdInput" v-model="sessionid" style="display:none"/>' +
					'<ul>' +
						'<li v-for="item in session.message">' +
							'<p class="time"><span>{{item.date | time}}</span></p>' +
							'<div v-bind:class="{ self: item.self }">' +
								'<img class="portrait" v-bind:src="user.img"/>' +
								'<div class="text" id="messageText">' +
									'{{item.text}}'+
								'</div>' +
							'</div>'+
						'</li>' +
					'</ul>'+
					'<div></div>'+
				'</div>'+
			'</div>'+
			'<div id="textinput" >' +
				'<div class="utils"><img src="img/chat/u85.png"/><img src="img/chat/u82.png"/></div>'+
				'<textarea id="chatFieldTextareaId" v-model="inputtext" placeholder="请按下确认键或者Ctrl+Enter提交" class="textarea" @keyup="intostore"></textarea>' +
			'</div>'+
		'</div>'+

		//如果chatpanelflag==2 公众号 获取test.html内嵌
		'<tag-public v-if="chatpanelflag==2" :iframeflag.sync="iframeflag" v-bind:user="user" :publicinfolist.sync="publicinfolist" :publiclist="publiclist" :selectedpublicid="selectedpublicid">' +
		'</tag-public >'+
//		'<div id="publicPanel" v-if="chatpanelflag==2" v-bind:style="mainstyle">'+
//			'<iframe name="ifraRight" id="ifraRight" src="publicEntrance.html" frameborder="0" width="100%" height="100%" scrolling="yes"></iframe>'+
//		'</div>'+
		

		//如果chatpanelflag==3 群聊
		'<div v-bind:style="mainstyle" id="chatPanel" v-if="chatpanelflag==3">' +
			'<div id="contacts">{{usersNameInSelectedGroup}}</div>' +
			// '<input type="search" x-webkit-speech="x-webkit-speech"/>'+
			'<div id="message" v-if="!messageGroupChatFlag">'+
				'<div id="messageArea">'+
				'</div>'+
			'</div>'+
			'<div id="message" v-if="messageGroupChatFlag">'+
				'<div id="messageArea" v-scrollbottom="groupsession.message">'+
					'<ul>' +
						'<li v-for="item in groupsession.message">' +
							'<p class="time"><span>{{item.date | time}}</span></p>' +
							'<div v-bind:class="{ self: item.self }">' +
								'<img class="portrait" v-bind:src="item | imgSrc"/>' +
								'<div class="text" id="messageText">' +
									'{{item.text}}'+
								'</div>' +
							'</div>'+
						'</li>' +
					'</ul>'+
					'<div></div>'+
				'</div>'+
			'</div>'+
			'<div id="textinput" >' +
				'<div class="utils"><img src="img/chat/u85.png"/><img src="img/chat/u82.png"/></div>'+
				'<textarea id="chatFieldTextareaId" v-model="inputtext" placeholder="请按下确认键或者Ctrl+Enter提交" class="textarea" @keyup="intostore_group"></textarea>' +
			'</div>'+
		'</div>'
})