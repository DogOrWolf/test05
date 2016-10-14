var PublicIframe = Vue.extend({
	data : function(){
		return{
			publicIframestyle : {
				height:'96%',
				width:'100%',
				// border:'1px solid black',
				float: 'left',
				margin:'4px 0px',
				marginLeft:"0px",
				position : "relative",
				background:'white'
			}
		}

	},
	props : ['iframesrc'],
	computed : {
		
	},
	methods : {
		
	},
	filters : {
		
	},
    components : {
    	
    },
	template : 
		'<div id="pubic_area_iframe" v-bind:style="publicIframestyle">'+
      		'<iframe name="ifraRight" id="ifraRight" v-bind:src="iframesrc" frameborder="0" width="100%" height="100%" scrolling="yes"></iframe>'+
      	'</div>'
})