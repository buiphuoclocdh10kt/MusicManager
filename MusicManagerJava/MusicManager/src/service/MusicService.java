package service;

import java.util.List;

import model.Song;

public interface MusicService {
	public void add(Song song);

	public void update(Song song);

	public void delete(Song song);

	public void search();
	
	public Song findById(int id);

}
