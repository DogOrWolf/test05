var PublicNum = Vue.extend({
	data : function(){
		return{
			publicpanelstyle : {
				height:'100%',
				width:'62%',
				// border:'1px solid black',
				float: 'left',
				margin:'4px 0px',
				marginLeft:"0px",
				position : "relative",
				background:'white'
			},
			iframesrc:''
		}

	},
	props : ['publicinfolist','publiclist','selectedpublicid','iframeflag'],
	computed : {
		//根据选择的公众号Id判断需要显示的信息列表
		pulicInfoBySelectedId : function(){
			var selectedId = this.selectedpublicid;
			var publicinfolist = this.publicinfolist;
			var pulicInfoList = [];
			for(item in publicinfolist){
				if(selectedId == publicinfolist[item].id ){
					pulicInfoList.push(publicinfolist[item]);
				}
			}
			return pulicInfoList;
		}
	},
	methods : {
		showOrHideIframe : function(url){
			this.iframeflag = true;
			this.iframesrc = url;
		}
		
	},
	filters : {
		
	},
    components : {
    	'tag-iframe' : PublicIframe 
    },
	template : 
		'<div id="public_panel" v-bind:style="publicpanelstyle">'+
		   '<div class="col-xs-12 "  id="pubic_area" v-if="!iframeflag">'+
		    	'<ul id="entrance">'+
				      '<li class="firstLi"><img  class="firstImgClass"src="img/public/dangjian.jpg" /></li>'+
//				      '<li>'+
//					      '<a href="public2.html">'+
//						      '<p>上外图书馆直属党支部赴陈云纪念馆开展组织生活</p>'+
//						      '<img src="img/public/dangjiantubiao.jpg" class="imgClass" />'+
//					      '</a>'+
//				      '</li>'+
				      '<li v-for="info in pulicInfoBySelectedId">'+
				        '<a href="#" v-on:click="showOrHideIframe(info.nextPageUrl);">'+
					         '<p>{{info.title}}</p>'+
					         '<img v-bind:src="info.imgSrc" class="imgClass" />'+
				        '</a>'+
				      '</li>'+
				  '</ul>'+
	      '</div>'+
	      '<tag-iframe  v-if="iframeflag" v-bind:iframesrc="iframesrc">' +
	      '</tag-iframe >'+
      '</div>'
//	      '<div   id="pubic_area_iframe" v-show="!iframeflag">'+
//	      	'<iframe name="ifraRight" id="ifraRight" v-bind:src="imgsrc" frameborder="0" width="100%" height="100%" scrolling="yes"></iframe>'+
//	      '</div>'
})