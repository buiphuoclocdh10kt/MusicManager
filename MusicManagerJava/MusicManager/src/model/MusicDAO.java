package model;

public interface MusicDAO {
	public void add(Song song);

	public void update(Song song);

	public void delete(Song song);

	public void search(String name);
	
	public Song findById(int id);

}
