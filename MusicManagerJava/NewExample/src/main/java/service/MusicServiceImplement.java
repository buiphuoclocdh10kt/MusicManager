package service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import config.Sessions;
import config.Song;
import config.Users;
import dao.MusicDAO;



public class MusicServiceImplement implements MusicService {
	@Autowired
	MusicDAO musicDao;
	

	public void setSongDao(MusicDAO songDao) {
		this.musicDao = songDao;
	}

	@Override
	public void add(Song song) {
		musicDao.add(song);

	}

	@Override
	public void update(Song song) {
		musicDao.update(song);

	}

	@Override
	public void delete(Song song) {
		musicDao.delete(song);

	}

	@Override
	public List<Song> search(String name, int userId) {
		return musicDao.search(name, userId);
	}
	
	@Override
	public Song findById(int id) {
		return musicDao.findById(id);
	}

	@Override
	public List<Song> selectSongByUserId(int idUser) {
		return musicDao.selectSongByUserId(idUser);
	}
	
	@Override
	public int logIn(String accountUser, String passwordUser) {
		return musicDao.logIn(accountUser, passwordUser);
	}

	@Override
	public boolean isLogIn(String ip) {
		return musicDao.isLogIn(ip);
	}

	@Override
	public int getUserId(String ip) {
		return musicDao.getUserId(ip);
	}

	@Override
	public Users getUserByUserId(int UserId) {
		return musicDao.getUserByUserId(UserId);
	}
	@Override
	public void addSession(Sessions session){
		musicDao.addSession(session);
	}
	@Override
	public boolean deleteSession(String ip){
		return musicDao.deleteSession(ip);
	}
	@Override
	public Sessions findSessionBySessionAccount(String ip){
		return musicDao.findSessionBySessionAccount(ip);
	}

}
