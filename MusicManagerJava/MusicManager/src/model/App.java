package model;


import java.util.Calendar;
import java.util.Date;

import org.hibernate.engine.spi.SessionOwner;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;


public class App {

	public static void main(String[] args) {

		ApplicationContext appContext = new ClassPathXmlApplicationContext("BeanLocations.xml");

		MusicService musicService = (MusicService) appContext.getBean("simpleServiceProxy");

		/** insert **/
		Calendar calendar = Calendar.getInstance();
		Date currentTime = calendar.getTime();
		

//		Song song = new Song();
//		song.setName("Trả Lại Thời Gian");
//		song.setAuthor("Thanh Sơn");
//		song.setDate(currentTime);
//		musicService.add(song);

		Song song = musicService.findById(72);
		if(song!=null){
			System.out.println(song);
			song.setName("Khác Như Tôi");
			song.setAuthor("Đức Huy");
			song.setDate(currentTime);
			musicService.update(song);
		}
		else{
			System.out.println("The Song doesn't exits!");
		}
		

//		 musicService.delete(song);

		System.out.println("Program finish!");

	}

}
