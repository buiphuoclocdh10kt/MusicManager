package model;

import static org.junit.Assert.*;

import java.util.Calendar;
import java.util.Date;

import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class MusicDAOImplementTest {
	
	ApplicationContext appContext = new ClassPathXmlApplicationContext("BeanLocations.xml");

	MusicService musicService = (MusicService) appContext.getBean("simpleServiceProxy");
	Calendar calendar = Calendar.getInstance();
	Date currentTime = calendar.getTime();

	@Test
	public void testAdd() {

		Song song = new Song();
		song.setName("Trả Lại Thời Gian");
		song.setAuthor("Thanh Sơn");
		song.setDate(currentTime);
		musicService.add(song);

		Song song2 = musicService.findById(song.getId());
		assertNotNull(song2);
//		assertTrue(song2.equals(song));

	}

	@Test
	public void testUpdate() {
		Song song = musicService.findById(79);
		song.setName("Khác Như Tôi");
		song.setAuthor("Đức Huy");
		song.setDate(currentTime);
		musicService.update(song);

		Song song2 = musicService.findById(song.getId());
		assertTrue(song2.getName().equals("Khác Như Tôi"));
	}

	@Test
	public void testDelete() {
		Song song = musicService.findById(80);
		musicService.delete(song);
		Song song2 = musicService.findById(song.getId());
			assertNull(song2);
	}

}
