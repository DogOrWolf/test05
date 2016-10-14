package com.mybatis.crud.vo;

public class Order {
	private int orderId;
	private int orderPrice;
	private String orderNumber;
	public int getOrderId() {
		return orderId;
	}
	public void setOrderId(int orderId) {
		this.orderId = orderId;
	}
	public int getOrderPrice() {
		return orderPrice;
	}
	public void setOrderPrice(int orderPrice) {
		this.orderPrice = orderPrice;
	}
	public String getOrderNumber() {
		return orderNumber;
	}
	public void setOrderNumber(String orderNumber) {
		this.orderNumber = orderNumber;
	}
	@Override
	public String toString() {
		return "Order [orderId=" + orderId + ", orderPrice=" + orderPrice + ", orderNumber=" + orderNumber + "]";
	}
	public Order() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Order(int orderId, int orderPrice, String orderNumber) {
		super();
		this.orderId = orderId;
		this.orderPrice = orderPrice;
		this.orderNumber = orderNumber;
	}
	
	
}
