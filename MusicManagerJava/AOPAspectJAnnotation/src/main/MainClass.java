package main;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import service.Service;

public class MainClass {

	public static void main(String[] args) {
		ApplicationContext appContext = new ClassPathXmlApplicationContext(new String[] { "beans.xml" });

		Service service = (Service) appContext.getBean("service");
		service.printString("Hello World!");
		service.printString2("Bye!");
		
		
			try {
				service.throwExceptionAdvice();
			} catch (Exception e) {
				
				
			}

	}

}
