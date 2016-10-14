package com.webapp.publicNumber.notify;

import java.util.Date;

import com.google.gson.Gson;

import tvos.webapp.websocket.socket.ChatSocket;
import tvos.webapp.websocket.vo.Message;


public class Notify {
	private static Gson json = new Gson();
	public static void main(String[] args) {
		ChatSocket chatSocket = new ChatSocket();
		String msg = "公中号信息";
		Message message = new Message("public", "", "", msg, new Date().toLocaleString());
		
		String  str = json.toJson(message);
//		chatSocket.notify(str);
	}
}
