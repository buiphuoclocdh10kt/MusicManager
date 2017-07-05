package dao;

import java.util.List;

import config.Sessions;
import config.Song;
import config.Users;

public interface MusicDAO {
	public void add(Song song);

	public void update(Song song);

	public void delete(Song song);

	public List<Song> search(String name, int userId);
	
	public Song findById(int id);
	
	boolean isLogIn(String ip);

	int getUserId(String ip);

	int logIn(String accountUser, String passwordUser);

	List<Song> selectSongByUserId(int idUser);

	Users getUserByUserId(int UserId);

	void addSession(Sessions session);

	Sessions findSessionBySessionAccount(String ip);

	public boolean deleteSession(String ip);

}
