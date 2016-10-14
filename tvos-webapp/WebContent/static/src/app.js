// 屏幕分辨率
var width_current = window.screen.width;
var height_current = window.screen.height;
var casualData = null;
var MainPanel = Vue.extend({
	data : function(){
		let casualData = fetch();
		return {
			//登陆用户
			user : casualData.user,
			//联系人数据
			userlist :casualData.userlist,
			//当前正在聊天的联系人，群或者新推送的公众号
			currentlist : casualData.currentlist,
			//搜索框的值
			searchkey : '',
			//中间一栏显示middlebar1还是middlebar2的标志
			middlebarflag : true,
			//chatpanel显示部分 0表示空白 1表示聊天框 2表示公众号 3表示群聊
			chatpanelflag : 1,
			//用户详细标志
			userdetailflag : false,
			// 屏幕分辨率
			width_current : width_current,
			height_current : height_current,
			
			//公众号
			publiclist : casualData.publiclist,
			//公众号具体信息列表
			publicinfolist : casualData.publicinfolist,
			//当前选中的publicId
			selectedpublicid : 1,
			//网页显示标志
			iframeflag : false,
			
			
			//群聊
			grouplist : casualData.grouplist,
			//群聊回话列表
			groupsessionlist : casualData.groupsessionlist,
			//选中的groupId
			selectedgroupid : 1,
			
			//回话列表
			sessionlist : casualData.sessionlist,
			//选中的回话序号
			sessionindex : null,
			//选中的联系人的ID
			sessionid : 0,
			//选中的联系人index
			userListIndex : 0
		}
	},
	computed : {
		session : function(){
			if(this.sessionindex !=null){
				return this.sessionlist[this.sessionindex];
			}else{
				return null;
			}
			
		}
	},
	methods : {
		refreshData : function(){
			let newData = fetch();
			this.sessionlist = newData.sessionlist;
			this.groupsessionlist = newData.groupsessionlist;
			this.currentlist = newData.currentlist;
			this.publicinfolist = newData.publicinfolist;
		}
	},
	//改变sessionlist后需要存储
	watch : {
		sessionlist : {
			deep : true,
			handler : function(){
				// alert("改变值");
				save({
					user : this.user,
					userlist : this.userlist,
					currentlist : this.currentlist,
					publiclist : this.publiclist,
					publicinfolist : this.publicinfolist,
					grouplist : this.grouplist,
					groupsessionlist : this.groupsessionlist,
					sessionlist : this.sessionlist
				});
			}

		},
		groupsessionlist : {
			deep : true,
			handler : function(){
				// alert("改变值");
				save({
					user : this.user,
					userlist : this.userlist,
					currentlist : this.currentlist,
					publiclist : this.publiclist,
					publicinfolist : this.publicinfolist,
					grouplist : this.grouplist,
					groupsessionlist : this.groupsessionlist,
					sessionlist : this.sessionlist
				});
			}

		},
		currentlist : {
			deep : true,
			handler : function(){
				save({
					user : this.user,
					userlist : this.userlist,
					currentlist : this.currentlist,
					publiclist : this.publiclist,
					publicinfolist : this.publicinfolist,
					grouplist : this.grouplist,
					groupsessionlist : this.groupsessionlist,
					sessionlist : this.sessionlist
				});
			}

		},
		publicinfolist : {
			deep : true,
			handler : function(){
				save({
					user : this.user,
					userlist : this.userlist,
					currentlist : this.currentlist,
					publiclist : this.publiclist,
					publicinfolist : this.publicinfolist,
					grouplist : this.grouplist,
					groupsessionlist : this.groupsessionlist,
					sessionlist : this.sessionlist
				});
			}
		}
	
	},
	components : {
		'tag-siderbar' : Siderbar ,
		'tag-middlebar1' : Middlebar1,
		'tag-middlebar2' : Middlebar2,
		'tag-chat' : ChatPanel,
		'tag-userdetail' : UserDetail
	},
	template :  '<tag-siderbar v-bind:middlebarflag.sync="middlebarflag" v-bind:userdetailflag.sync="userdetailflag" v-bind:width_current="width_current" v-bind:height_current="height_current">' +
				'</tag-siderbar >' +
				'<tag-middlebar1 v-show="middlebarflag" :iframeflag.sync="iframeflag" :selectedpublicid.sync="selectedpublicid" v-bind:grouplist="grouplist" v-bind:publiclist="publiclist" v-bind:currentlist.sync="currentlist" v-bind:chatpanelflag.sync="chatpanelflag" v-bind:user="user" v-bind:searchkey.sync="searchkey" v-bind:userlist="userlist" v-bind:sessionlist="sessionlist" v-bind:sessionindex.sync="sessionindex" v-bind:sessionid.sync="sessionid" v-bind:selectedgroupid.sync="selectedgroupid">' +
				'</tag-middlebar1 >' +
				'<tag-middlebar2 v-if="!middlebarflag" :iframeflag.sync="iframeflag" :selectedpublicid.sync="selectedpublicid" v-bind:sessionid.sync="sessionid" v-bind:chatpanelflag.sync="chatpanelflag" v-bind:user="user" v-bind:searchkey.sync="searchkey" v-bind:userlist="userlist" v-bind:publiclist="publiclist" v-bind:grouplist="grouplist" v-bind:sessionlist="sessionlist" v-bind:sessionindex.sync="sessionindex" v-bind:selectedgroupid.sync="selectedgroupid">' +
				'</tag-middlebar2 >' +
				'<tag-chat :iframeflag.sync="iframeflag" :selectedpublicid.sync="selectedpublicid" :publiclist.sync="publiclist" :publicinfolist.sync="publicinfolist" :session="session" :user="user" :userlist="userlist" :chatpanelflag.sync="chatpanelflag" :sessionid="sessionid" v-bind:selectedgroupid="selectedgroupid" v-bind:grouplist="grouplist" v-bind:groupsessionlist.sync="groupsessionlist">' +
				'</tag-chat>'+
				'<tag-userdetail v-show="userdetailflag" v-bind:user="user" >' +
				'</tag-userdetail >'+
				'<button id="refreshDataBtn" style="display:none" v-on:click="refreshData()"></button>'
});

Vue.component('tag-main',MainPanel);

var app = new Vue({
	el:"#chat",
	methods : {
		select : function () {
			
		}
	},
	data : {
		//middlebar当前的组件
		currentview :'MainPanel'
	}
});

