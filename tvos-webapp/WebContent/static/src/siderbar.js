
var Siderbar = Vue.extend({
	data : function(){
		return {
			siderbarstyle : {
				height:'100%',
				width:'6%',
				// border:'1px solid blue',
				float: 'left',
				margin:'4px',
				marginRight:'0px',
				backgroundImage: 'url(img/siderbar/u0.png)',
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
			}
		}
	},
	props : ['middlebarflag','userdetailflag','width_current','height_current'],
	methods : {
		changeTobar1 : function(){
			this.middlebarflag = true;
		},

		changeTobar2 : function(){
			this.middlebarflag = false;
			
		},
		hideOrShow : function(){
			if(window.screen.width == 1280 && window.screen.height == 720){
				document.getElementById("userDetail").setAttribute("class","userDetailFor1280x720");
			}
			this.userdetailflag = !this.userdetailflag;
		}
	},
	template:   '<div v-bind:style="siderbarstyle">' +
					'<div id="siderbarimg1" @click="hideOrShow()"><a href="#"><img src="img/icon/zhizhu.jpg" /></a>' +
					'</div>' +
					'<div id="siderbarimgArea">'+
						'<div id="siderbarimg2" @click="changeTobar1()"><a href="#"><img src="img/siderbar/u4.png"/></a>' +
						'</div>' +
					'</div>'+
					'<div id="siderbarimg2_blank">'+
					'</div>' +
					'<div id="siderbarimg3" @click="changeTobar2()"><a href="#"><img src="img/siderbar/u6.png" /></a>' +
					'</div>' +
				'</div>'
	
})