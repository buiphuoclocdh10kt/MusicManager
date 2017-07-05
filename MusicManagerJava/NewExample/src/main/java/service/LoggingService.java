package service;

import java.lang.reflect.Method;
import java.util.Calendar;
import java.util.Date;

import org.springframework.aop.MethodBeforeAdvice;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import config.Song;
@Configuration
public class LoggingService implements MethodBeforeAdvice {

	@Override
	public void before(Method arg0, Object[] arg1, Object arg2) throws Throwable {

		Calendar calendar = Calendar.getInstance();
		Date currentTime = calendar.getTime();

		if (arg1.length != 0 && arg1[0] != null
				&& (arg0.getName() == "add" || arg0.getName() == "update" || arg0.getName() == "delete")) {
			Song song = (Song) arg1[0];
			System.out.println("Running Method: " + arg0.getName() + " \n\tName: " + song.getName() + "\n\tAuthor: "
					+ song.getAuthor() + "\n\tDate: " + currentTime);
		}
	}
}
