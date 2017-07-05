package service;

import java.util.List;

import config.Sessions;
import config.Song;
import config.Users;



public interface MusicService {
	public void add(Song song);

	public void update(Song song);

	public void delete(Song song);

	public List<Song> search(String name,int userId);
	
	public Song findById(int id);
	
	public List<Song> selectSongByUserId(int idUser);
	
	public int logIn(String accountUser, String passwordUser);
	
	public boolean isLogIn(String ip);
	
	public int getUserId(String ip);
	
	public Users getUserByUserId(int UserId);

	public void addSession(Sessions session);

	public boolean deleteSession(String ip);

	public Sessions findSessionBySessionAccount(String ip);
}
