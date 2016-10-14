//点击聊天图片后的中间栏
var Middlebar1 = Vue.extend({
	data : function(){
		return{
			middlebarstyle : {
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
	props : ['user','selectedgroupid','currentlist','grouplist','publiclist','searchkey','userlist','sessionlist','sessionindex','chatpanelflag','sessionid','selectedpublicid','iframeflag'],
	methods : {
		select : function (item) {
			if("chat"==item.type){
//				alert(this.sessionid);
				this.chatpanelflag = 1;
				this.sessionindex = this.userlist.indexOf(item);
				this.sessionid = item.id;
//				alert(item.id);
			}else if("group"==item.type){
				this.selectedgroupid = item.id;
				this.chatpanelflag = 3;
			}else if("public"==item.type){
				this.iframeflag = false;
				this.selectedpublicid = item.id;
				this.chatpanelflag = 2;
			}

		},
		clearStamp : function(item){
			var selected_id = "type"+item.type+"id"+item.id;
			$("#"+selected_id+" span").css({"display":"none"});
			$("#siderbarimgArea").css({"background-color":"transparent"});
		}
	},
	filters: {
        searchfilter : function (list) {
            return list.filter(item => item.name.indexOf(this.searchkey) > -1);
             // console.log(list);
            // return list;

        },
        checkforlist :function(currentlist){
        	console.info(currentlist);
        	var userlist = this.userlist;
        	var grouplist = this.grouplist;
        	var publiclist = this.publiclist;
        	var currentlist_new = [];
        	
    		var getUserById = function(id){
    			for(item in userlist){
    				if(id == userlist[item].id){
    					userlist[item].type="chat";
    					return userlist[item];
    				}
    			}
    			return null;
    		};
    		var getGroupById = function(id){
    			for(item in grouplist){
    				if(id == grouplist[item].id){
    					grouplist[item].type="group";
    					return grouplist[item];
    				}
    			}
    			return null;
    		};
    		var getPublicById = function(id){
    			for(item in publiclist){
    				if(id == publiclist[item].id){
    					publiclist[item].type="public";
    					return publiclist[item];
    				}
    			}
    			return null;
    		};
        	
        	if(currentlist){
        		for(item in currentlist){
        			if("chat" == currentlist[item].type){
        				var currentUser = getUserById(currentlist[item].userid);
        				 currentlist_new.push(currentUser);
            		}else if("group" == currentlist[item].type){
        				var currentGroup = getGroupById(currentlist[item].groupid);
        				currentlist_new.push(currentGroup);
            		}else if("public" == currentlist[item].type){
            			this.iframeflag = false;
        				var currentPublic = getPublicById(currentlist[item].publicid);
        				currentlist_new.push(currentPublic);
            		}
        		}
        	}
        	return currentlist_new;
        	
        }
        
    },
	template:
		'<div v-bind:style="middlebarstyle">' +
			'<div id="searchtextarea">' +
				'<div id="search">' +
					'<div class="input-append" >' +
						'<input class="span2"  id="searchtextinfo" type="text" placeholder="请输入搜索内容"  v-model="searchkey"/>' +
//						 '<input type="text" v-model="sessionid"/>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<div id="searchinfolist">' +
				'<div class="title">联系列表</div>' +
				'<ul>' +
					// '<li><img src="img/middlebar/u22.png"/><p>业主一</p></li>' +
					// '<li><img src="img/middlebar/u22.png"/><p>业主一</p></li>'+
					'<li v-for="item in currentlist |checkforlist |searchfilter" v-on:click="select(item)" >' +
						'<div id="type{{item.type}}id{{item.id}}" v-on:click="clearStamp(item)">'+
							'<a href="#">'+
								'<img v-bind:src="item.img" alt="头像"}/>' +
								'<p>{{item.name}}</p>' +
								'<span class="badge" style="display:none">1</span>'+
							'</a>'+
						'</div>'+
					'</li>'+
					// '<input type="text" v-model="userlist[0].id">'+
				'</ul>'+
			'</div>' +
		'</div>'
})