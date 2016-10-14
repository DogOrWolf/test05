package tvos.webapp.websocket.vo;

import java.util.Date;
import java.util.Set;

public class Message {
	//公共所需信息
	private String type;
	private String from;
	private String to;
	private String message;
	private String date;
	private Integer id;//传过来数据的带的id即谁传过来的
	//群聊时所需信息
	private Integer from_groupid;
	private Set<User> users;
	//公众号时所需信息
	private String title;
	private String imgSrc;
	private String nextPageUrl;
	
	public String getFrom() {
		return from;
	}
	public void setFrom(String from) {
		this.from = from;
	}
	public String getTo() {
		return to;
	}
	public void setTo(String to) {
		this.to = to;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getImgSrc() {
		return imgSrc;
	}
	public void setImgSrc(String imgSrc) {
		this.imgSrc = imgSrc;
	}
	public String getNextPageUrl() {
		return nextPageUrl;
	}
	public void setNextPageUrl(String nextPageUrl) {
		this.nextPageUrl = nextPageUrl;
	}
	public Message() {
		super();
	}
	
	public Set<User> getUsers() {
		return users;
	}
	public void setUsers(Set<User> users) {
		this.users = users;
	}
	public Integer getFrom_groupid() {
		return from_groupid;
	}
	public void setFrom_groupid(Integer from_groupid) {
		this.from_groupid = from_groupid;
	}
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Message(String type, String from, String to, String message, String date) {
		super();
		this.type = type;
		this.from = from;
		this.to = to;
		this.message = message;
		this.date = date;
	}
	@Override
	public String toString() {
		return "Message [type=" + type + ", from=" + from + ", to=" + to + ", message=" + message + ", date=" + date
				+ ", id=" + id + ", from_groupid=" + from_groupid + ", users=" + users + ", title=" + title
				+ ", imgSrc=" + imgSrc + ", nextPageUrl=" + nextPageUrl + "]";
	}
	
}
