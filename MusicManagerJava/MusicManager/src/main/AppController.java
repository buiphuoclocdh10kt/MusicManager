package main;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AppController {
	
	
	
	
	//Song song = new Song();
//	try {
//		song.setName("Trả Lại Thời Gian");
//		song.setAuthor("Thanh Sơn");
//		song.setDate(currentTime);
//		musicService.add(song);
//		System.out.println("Added song: --"+song.getName()+"-- succeed!");
//	} catch (Exception e) {
//		System.out.println("The song existed!");
//	}
		@RequestMapping("/get")
		public void search(){
			//ApplicationContext appContext = new AnnotationConfigApplicationContext("AppConfig.class");
			//MusicService musicService = (MusicService) appContext.getBean("musicServiceBean");
//			musicService.search();
		}
	
	
	
//	Song song = musicService.findById(6);
//	if(song!=null){
//		System.out.println(song);
//		song.setName("Khác Như Tôi");
//		song.setAuthor("Đức Huy");
//		song.setDate(currentTime);
//		musicService.update(song);
//		System.out.println("Modified succeed!");
//	}
//	else{
//		System.out.println("The song doesn't exist!");
//	}
	
	
	
	
	
//	Song song = musicService.findById(6);
//	System.out.println(song);
//	if(song!=null){
//	musicService.delete(song);
//	System.out.println("Deleted succeed!");
//	}else{
//		System.out.println("The song doesn't exist!");
//	}



}
