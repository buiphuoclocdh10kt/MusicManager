package model;

import java.util.List;

import org.hibernate.FlushMode;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.springframework.dao.DataAccessException;
import org.springframework.orm.hibernate4.support.HibernateDaoSupport;

public class MusicDAOImplement extends HibernateDaoSupport implements MusicDAO {

	@Override
	public void add(Song song) {
		try {
			Session s = getSessionFactory().openSession();
			s.setFlushMode(FlushMode.ALWAYS);
			s.saveOrUpdate(song);
			s.flush();
			s.close();
		} catch (HibernateException|DataAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}

	@Override
	public void update(Song song) {
		
		
			if(song!=null){
			Session s = getSessionFactory().openSession();
			s.setFlushMode(FlushMode.ALWAYS);
			s.update(song);
			s.flush();
			s.close();
			}
		
	}

	@Override
	public void delete(Song song) {
		
			
				if(song!=null){
				Session s = getSessionFactory().openSession();
				s.setFlushMode(FlushMode.ALWAYS);
				s.delete(song);
				s.flush();
				s.close();
				}
				else{
					System.out.println("The Song doesn't exits!");
				}

	}

	@Override
	public void search(String name) {

		try {
			List list = getHibernateTemplate().find("from Song where name=?", name);
			
		} catch (DataAccessException|IndexOutOfBoundsException e) {
			// TODO Auto-generated catch block
			
		}
	}
	
	@Override
	public Song findById(int id) {

			Song song = (Song) getHibernateTemplate().get(Song.class,id);
			if(song!=null)
				return song;
			else return null;
	}

}
