package main;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import service.Service;

public class MainClass {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		ApplicationContext appContext = new ClassPathXmlApplicationContext(new String[] { "beans.xml" });

		Service service = (Service) appContext.getBean("before");
		service.printString("Hello World!");
		service.printString("Hello");
		
		
		
		
		
		
		
		
		
		
		
//		try {
//			service.throwExceptionAdvice();
//		} catch (Exception e) {
//			
//		}

	}

}
