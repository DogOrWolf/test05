<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<title>index</title>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<link href="bootstrap/css/bootstrap.min.css" rel="stylesheet" media="screen">
	<link rel="stylesheet" type="text/css" href="css/appPanel.css">
	<link rel="stylesheet" type="text/css" href="css/app.css"></link>
	<link rel="stylesheet" type="text/css" href="css/sidebar.css"></link>
	<link rel="stylesheet" type="text/css" href="css/middlebar.css"></link>
	<link rel="stylesheet" type="text/css" href="css/middlebar1.css"></link>
	<link rel="stylesheet" type="text/css" href="css/middlebar2.css"></link>
	<link rel="stylesheet" type="text/css" href="css/chatfield.css">
	<link rel="stylesheet" type="text/css" href="css/public.css">
	<link rel="stylesheet" type="text/css" href="css/userDetail.css">
	<link rel="stylesheet" type="text/css" href="css/puclicPanel.css">
	<script type="text/javascript" src="src/store.js"></script>
	<script type="text/javascript" src="jquery/jquery-1.7.2.js"></script>
	<!--<script type="text/javascript" src="bootstrap/js/bootstrap.js"></script>-->

</head>
	<% 
	String name = request.getParameter("name");//用request的到 
	%>
<body>
	<div id="parameterName" style="display:none;"><%=name%></div>
	<!-- <component is="{{currentview}}"></component> -->
	<div id="appPanel" class="appPanelFor1280x720">
		<div id="chat">
		<tag-main></tag-main>
	</div>
	</div>

	<script type="text/javascript" src="vue/vue.js"></script>
	<script type="text/javascript" src="jquery/jquery-3.1.0.min.js"></script>
	<script type="text/javascript" src="src/publicIframe.js"></script>
	<script type="text/javascript" src="src/publicNum.js"></script>
	<script type="text/javascript" src="src/chat.js"></script>
	<script type="text/javascript" src="src/siderbar.js"></script>
	<script type="text/javascript" src="src/middlebar1.js"></script>
	<script type="text/javascript" src="src/middlebar2.js"></script>
	<script type="text/javascript" src="src/chatPanel.js"></script>
	<script type="text/javascript" src="src/userDetail.js"></script>
	<script type="text/javascript" src="src/app.js"></script>
	
	
</body>
</html>