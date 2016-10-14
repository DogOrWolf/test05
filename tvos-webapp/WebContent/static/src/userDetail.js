var UserDetail = Vue.extend({
	data : function(){
		return {
			title : ""
		}
	},
	props : ['user'],
	methods : {

	},
	template : 
		'<div id="userDetail" class="userDetailFor720x567">'+
			'<div class="userDetailImage">'+
				'<img src="img/icon/zhizhu.jpg"/> '+
			'</div>'+
			'<div class="userDetailInfo">'+
				'用户姓名:{{user.name}} '+
			'</div>'+

		'</div>'


})

