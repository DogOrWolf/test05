package tvos.webapp.websocket.socket;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import com.google.gson.Gson;

import tvos.webapp.websocket.vo.Message;
import tvos.webapp.websocket.vo.User;


@ServerEndpoint("/chatSocket")

public class ChatSocket {
	
	private static Map<String, Session> map = new HashMap<String,Session>();
	private Gson json = new Gson();
	private static Set<Session> sessions = new HashSet<Session>();
	private  Set<Session> sessionsInGroup = new HashSet<Session>();
	@OnOpen
	public void chatOpen(Session session){
		System.out.println("打开一个singleChat聊天管道："+session.getId());
		sessions.add(session);
		System.out.println(sessions);
		String username = session.getQueryString().split("=")[1];
		System.out.println("socket:"+username);
		map.put(username, session);
	}
	
	@OnClose
	public void chatClose(Session session){
		
	}
	
	@OnMessage
	public void chatMessage(Session session,String msg){
		System.out.println("传过来的数据："+ msg);
		System.out.println(sessions);
		Message message = new Message();
		String date = new Date().toLocaleString();
		message = json.fromJson(msg, Message.class);
		message.setDate(date);
		System.out.println(message);
		if("chat".equals(message.getType())){
			Session to_session = map.get(message.getTo());
//			Session from_session = map.get(message.getFrom());
			
			try {
				to_session.getBasicRemote().sendText(json.toJson(message));
//				from_session.getBasicRemote().sendText(json.toJson(message));
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}else if("group".equals(message.getType())){
			for(Iterator iterator = message.getUsers().iterator();iterator.hasNext();){
				User user = (User) iterator.next();
				if(map.get(user.getName()) != null && !message.getFrom().equals(user.getName())){
					sessionsInGroup.add(map.get(user.getName()));
				}	
			}
			boradcast(sessionsInGroup,json.toJson(message));
		}else if("public".equals(message.getType())){
	
			
			boradcast(sessions,json.toJson(message));
		}
	}
	
	
	public void boradcast(Set<Session> sessions,String msg){
		System.out.println(msg);
		System.out.println(sessions);
		for(Iterator iterator = sessions.iterator();iterator.hasNext();){
			Session session = (Session) iterator.next();
			try {
				session.getBasicRemote().sendText(msg);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	
//	public void  notify(String msg){
//		boradcast(sessions,msg);
//	}
//	
}
