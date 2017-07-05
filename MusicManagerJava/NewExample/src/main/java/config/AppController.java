package config;

import java.io.IOException;
import java.time.LocalTime;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import javax.servlet.http.HttpServletRequest;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyEmitter;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import service.MusicService;

@RestController
public class AppController {

	private ApplicationContext context;
	private MusicService service;

	public ApplicationContext getContext() {
		context = new ClassPathXmlApplicationContext("beans.xml");
		return context;
	}

	public void setContext(ApplicationContext context) {
		this.context = context;
	}

	public MusicService getService() {
		service = (MusicService) this.getContext().getBean("simpleServiceProxy");
		return service;
	}

	public void setService(MusicService service) {
		this.service = service;
	}

	@RequestMapping(value = "/isLogIn", method = RequestMethod.GET)
	public boolean isLogIn(HttpServletRequest requestContext) {
		String ip = requestContext.getRemoteAddr();
		return this.getService().isLogIn(ip);
	}

	@RequestMapping(value = "/getUserId", method = RequestMethod.GET)
	public int getUserId(HttpServletRequest requestContext) {
		String ip = requestContext.getRemoteAddr();
		return this.getService().getUserId(ip);
	}

	@RequestMapping(value = "/selectSongByUserId", method = RequestMethod.GET)
	public List<Song> selectSongByUserId(HttpServletRequest requestContext) {
		MusicService musicService = this.getService();
		String ip = requestContext.getRemoteAddr();
		int userId = musicService.getUserId(ip);
		return musicService.selectSongByUserId(userId);
	}

	@RequestMapping(value = "/logIn", method = RequestMethod.POST)
	public boolean logIn(@RequestParam(value = "userAccount") String userAccount,
						 @RequestParam(value = "userPassword") String userPassword, 
						 HttpServletRequest requestContext) {
		MusicService musicService = this.getService();
		int userId = musicService.logIn(userAccount, userPassword);
		Sessions session = new Sessions();
		String ip = requestContext.getRemoteAddr();
		Calendar calendar = Calendar.getInstance();
		Date currentTime = calendar.getTime();
		if (userId != 0) {
			session.setSessionAccount(ip);
			session.setSessionTime(currentTime);
			session.setSessionUserId(userId);
			musicService.addSession(session);
			return true;
		} else
			return false;
	}
	
	@RequestMapping(value = "/logOut", method = RequestMethod.POST)
	public boolean logOut(HttpServletRequest requestContext) {
		String ip = requestContext.getRemoteAddr();
		MusicService musicService = this.getService();
			return musicService.deleteSession(ip);
	}

	@RequestMapping(value = "/search", method = RequestMethod.GET)
	public List<Song> search(@RequestParam(value = "name") String name, 
							 HttpServletRequest requestContext) {
		MusicService musicService = this.getService();
		String ip = requestContext.getRemoteAddr();
		int userId = musicService.getUserId(ip);
		return musicService.search(name, userId);
	}

	@RequestMapping(value="/add",method = RequestMethod.POST)
	public boolean add(@RequestParam(value = "name") String name,
					   @RequestParam(value = "author", defaultValue = "Unknow") String author,
					   @RequestParam(value = "status") boolean status, 
					   HttpServletRequest requestContext) {
		MusicService musicService = this.getService();
		String ip = requestContext.getRemoteAddr();
		int userId = musicService.getUserId(ip);
		Users user = musicService.getUserByUserId(userId);
		Song song = new Song();
		Calendar calendar = Calendar.getInstance();
		Date currentTime = calendar.getTime();
		
		try {
			if(author==null){
				author="Unknow";
			}else{}
			song.setName(name);
			song.setAuthor(author);
			song.setDate(currentTime);
			song.setStatus(status);
			song.setUser(user);
			user.getSong().add(song);
			musicService.add(song);
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

	@RequestMapping(value = "/delete", method = RequestMethod.DELETE)
	public boolean delete(@RequestParam(value = "id") int id) {
		MusicService musicService = this.getService();
		Song song = musicService.findById(id);
		if (song != null) {
			musicService.delete(song);
			return true;
		} else {
			return false;
		}
	}

	@RequestMapping(value = "/modify", method = RequestMethod.PUT)
	public boolean update(@RequestParam(value = "id") int id, 
						  @RequestParam(value = "name") String name,
						  @RequestParam(value = "author") String author, 
						  @RequestParam(value = "status") boolean status) {
		MusicService musicService = this.getService();
		Song song = musicService.findById(id);
		Calendar calendar = Calendar.getInstance();
		Date currentTime = calendar.getTime();
		if (song != null) {
			System.out.println(song);
			song.setName(name);
			song.setAuthor(author);
			song.setStatus(status);
			song.setDate(currentTime);
			musicService.update(song);
			return true;
		} else {
			return false;
		}
	}
}
