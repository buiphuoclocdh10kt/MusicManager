package service;
import java.util.Calendar;
import java.util.Date;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;

import model.Song;

@Aspect
public class LoggingServiceAnnotation {
	@Before("execution(* dao.MusicDAO.*(..))")
	public void logBefore(JoinPoint joinPoint) {

		Calendar calendar = Calendar.getInstance();
		Date currentTime = calendar.getTime();
		
		if(joinPoint.getArgs()!=null&&joinPoint.getClass().getName()!="findById"&&joinPoint.getClass().getName()!="search"){
		//Song song=(Song)joinPoint.getArgs();
		System.out.println("Running Method: "+joinPoint.getClass().getName());}//+" \n\tName: "+joinPoint.getArgs()+
				//"\n\tAuthor: "+song.getAuthor()+"\n\tDate: "+currentTime);}
	}


}
