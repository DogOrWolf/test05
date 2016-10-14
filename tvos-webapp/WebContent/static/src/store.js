const key = "TVOS-CHAT-V1";

//存储在前端的数据
if(!sessionStorage.getItem(key)){
	// alert("wahaha");
	let now = new Date();

	let data = {
		//登陆用户数据
		user : {
			id : 1,
//			name : '张三',
			name: 'Tom',
			img : 'img/icon/zhizhu.jpg'
		},

		//联系人数据
		userlist : [
			{
				id : 2,
				name : 'ss',
				img : 'img/icon/icon2.png'
			},
			{
				id : 3,
				name : '联系人2',
				img : 'img/icon/icon3.jpg'
			},
			{
				id : 4,
				name : '联系人3',
				img : 'img/icon/zhaoyun.jpg'
			},
			{
				id : 5,
				name : 'Tom',
				img : 'img/icon/zhizhu.jpg'
			},
			{
				id : 6,
				name : 'Joy',
				img : 'img/icon/zhaoyun.jpg'
			}

		],
		//当前正在聊天的联系人，群或者新推送的公众号
		//type:chat聊天group群 public公众号 
		currentlist : [
			{
				type : 'chat',
				userid : 6,
			},
			{
				type : 'chat',
				userid : 5,
			},
			{	
				type : 'group',
				groupid : 1,
			},
			{	
				type : 'group',
				groupid : 2,
			},
			{	
				type : 'public',
				publicid : 1,
			}
			,
			{	
				type : 'public',
				publicid : 2,
			}
		],

		//公众号列表数据
		publiclist  : [
			{
				id : 1,
				name : '公众号1',
				img : 'img/icon/icon5.png'
			},{
				id : 2,
				name : '公众号2',
				img : 'img/icon/icon5.png'

			}

		],
		publicinfolist : [
					{
						id : 2,
						type : "public",
						title : "党建答题",
						infoid : 1,
						imgSrc : "img/public/dati.jpg",
						nextPageUrl : "game/questions.html"
					},
					{
						id : 1,
						type : "public",
						title : "党建答题",
						infoid : 1,
						imgSrc : "img/public/dati.jpg",
						nextPageUrl : "game/questions.html"
					}
//  			{
//				id : 1,
//				type : "public",
//				title : "wahaha",
//				infoid : 1,
//				imgSrc : "img/public/dangjiantubiao.jpg",
//				nextPageUrl : "public2.html"
//			},{
//				id : 1,
//				type : "public",
//				infoid : 2,
//				title : "标题22222",
//				imgSrc : "img/public/dangjiantubiao.jpg",
//				nextPageUrl : "public2.html"
//			},{
//				id : 2,
//				type : "public",
//				infoid : 3,
//				title : "标题222",
//				imgSrc : "img/public/dangjiantubiao.jpg",
//				nextPageUrl : "public2.html"
//			}

		],
		//群聊列表
		grouplist  : [
			{
				id : 1,
				name : '群1',
				img : 'img/icon/icon1.png',
				users : [3,2,5,6]
			},{
				id : 2,
				name : '群2',
				img : 'img/icon/icon1.png',
				users : [2,3]
			}

		],
		//
		groupsessionlist : [
			{
				groupid : 1,
				message :[
					{
						text : '大家好 ',
						date : now,
						userid : 5
						
					},{
						text : '哇哈哈',
						date : now,
						userid : 6
					}

				]
			},{
				groupid : 2,
				message :[
					{
						text : '试试 ',
						date : now,
						userid : 2
					},{
						text : '试试就试试',
						date : now,
						userid : 3
					}

				]
			}
		],
		// 回话列表数据
		sessionlist : [
			{
				userid : 2,
				message :[
					{
						text : 'Hello, test 1 ',
						date : now 
					},{
						text : '你好啊啊啊啊啊',
						date : now 
					}

				]
			},{
				userid : 3,
				message :[
					{
						text : 'Hello, test 2 ',
						date : now 
					},{
						text : '你好啊',
						date : now 
					}

				]
			},{
				userid : 4,
				message :[
					{
						text : 'Hello, test 3 ',
						date : now 
					},{
						text : 'hello',
						date : now 
					}

				]
			},{
				userid : 5,
				message :[
					{
						text : 'Hello, test 4 ',
						date : now 
					},{
						text : 'hello',
						date : now 
					}

				]
			},{
				userid : 6,
				message :[
					{
						text : 'Hello, test 5 ',
						date : now 
					},{
						text : 'hello',
						date : now 
					}

				]
			}
		]
	}

	sessionStorage.setItem(key,JSON.stringify(data));  //存入sessionStorage
}

//取数据
var fetch = function(){
	return JSON.parse(sessionStorage.getItem(key));
}

//存数据
var save = function(store){
	sessionStorage.setItem(key,JSON.stringify(store));
}