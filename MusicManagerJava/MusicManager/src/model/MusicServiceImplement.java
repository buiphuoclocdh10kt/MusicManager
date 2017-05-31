package model;

public class MusicServiceImplement implements MusicService {

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
	public void search(String name) {
		musicDao.search(name);
	}
	
	@Override
	public Song findById(int id) {
		return musicDao.findById(id);
	}

}
