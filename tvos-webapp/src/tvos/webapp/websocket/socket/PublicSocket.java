package tvos.webapp.websocket.socket;

import java.io.IOException;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

//@ServerEndpoint("/publicSocket")
public class PublicSocket {
	
	private static Set<Session> sessions = new HashSet<Session>();
	private Session session;
	
	@OnOpen
	public void openPublic_Pipe(Session session){
		sessions.add(session);
		System.out.println("¹«ÖÚºÅsession : "+ session.getId());
		System.out.println(sessions);
		
	}
	
	@OnClose
	public void closePublic_pipe(Session session){
		
	}
	
	public void boradcast(Set<Session> sessions,String msg){
		System.out.println(msg);
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
	
	public void notify(String msg){
		boradcast(this.sessions,msg);
	}
}
