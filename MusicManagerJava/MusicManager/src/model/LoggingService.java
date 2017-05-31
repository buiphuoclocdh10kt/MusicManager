package model;

import java.lang.reflect.Method;
import java.util.Calendar;
import java.util.Date;

import org.springframework.aop.MethodBeforeAdvice;

public class LoggingService implements MethodBeforeAdvice {

	@Override
	public void before(Method arg0, Object[] arg1, Object arg2) throws Throwable {
		
		Calendar calendar = Calendar.getInstance();
		Date currentTime = calendar.getTime();
		
		
		

				if(arg1[0]!=null&&arg0.getName()!="findById"){
				Song song=(Song)arg1[0];
				System.out.println("Running Method: "+arg0.getName()+" \n\tName: "+song.getName()+"\n\tAuthor: "+song.getAuthor()+"\n\tDate: "+currentTime);}
	}

}
