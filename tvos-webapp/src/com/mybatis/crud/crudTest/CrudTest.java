package com.mybatis.crud.crudTest;

import java.io.IOException;
import java.io.Reader;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import com.mybatis.crud.vo.Order;
import com.mybatis.crud.vo.User;

public class CrudTest {
	
	public static void main(String[] args) throws IOException {
		
		Reader inputStream = Resources.getResourceAsReader("mybatis_config.xml");
		SqlSessionFactory sessionFactory = new SqlSessionFactoryBuilder().build(inputStream );
		SqlSession session = sessionFactory.openSession(true);
		
		String statement = "com.mybatis.crud.crudMap.getUserById";
		User user = session.selectOne(statement,1);
		
		System.out.println(user);
//		
//		
//		String statement2 = "com.mybatis.crud.crudMap.getOrderById";
//		Order order = session.selectOne(statement2,2);
//		
//		System.out.println(order);
//		
//
//		String statement3 = "com.mybatis.crud.crudMap.getOrderByIDWithResultMap";
//		Order order2 = session.selectOne(statement3,2);
//		
//		System.out.println(order);
		
		
//		String insertStr = "com.mybatis.crud.crudMap.insertIntoUsers";
//		User user = new User();
//		user.setAge(18);
//		user.setId(-1);
//		user.setName("李四");
//		
//		int result = session.insert(insertStr, user);
////		session.commit();
//		System.out.println(result);
		
		
		
//		String insertStr2 = "com.mybatis.crud.crudMap.insertIntoOrders";
//		Order order = new Order(-1, 20, "ex12");
//		int result2 = session.insert(insertStr2, order);
//		System.out.println(result2);
		
//		String deleteStr = "com.mybatis.crud.crudMap.deleteUser";
//		session.delete(deleteStr,6);
		
//		String deleteStr = "com.mybatis.crud.crudMap.updateUser";
//		User user = new User();
//		user.setAge(18);
//		user.setId(3);
//		user.setName("李四");
//		session.delete(deleteStr,user);
//	}
//	
//	public void selectOneUser(){
//		
	}
	
}
