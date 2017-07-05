package service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import dao.MusicDAO;
import model.Song;
@Configuration
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
	public void search() {
		musicDao.search();
	}
	
	@Override
	public Song findById(int id) {
		return musicDao.findById(id);
	}

}
