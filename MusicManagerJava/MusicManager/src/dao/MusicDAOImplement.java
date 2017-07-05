package dao;

import java.util.List;

import org.hibernate.FlushMode;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.orm.hibernate4.support.HibernateDaoSupport;
import org.springframework.web.bind.annotation.RestController;

import config.AppConfig;
import model.Song;

public class MusicDAOImplement extends HibernateDaoSupport implements MusicDAO {

	@Override
	public void add(Song song) {
		SessionFactory sessionFactory = AppConfig.getSessionFactory();
		Session session = sessionFactory.openSession();
		try {
			session.beginTransaction();
			session.setFlushMode(FlushMode.ALWAYS);
			session.saveOrUpdate(song);
			session.getTransaction().commit();

		} catch (HibernateException | DataAccessException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			session.close();
		}
	}

	@Override
	public void update(Song song) {

		Session s = getSessionFactory().openSession();
		try {
			if (song != null) {

				s.setFlushMode(FlushMode.ALWAYS);
				s.update(song);
				s.flush();
			}
		} catch (HibernateException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			s.close();
		}

	}

	@Override
	public void delete(Song song) {

		Session s = getSessionFactory().openSession();
		try {
			if (song != null) {
				s.setFlushMode(FlushMode.ALWAYS);
				s.delete(song);
				s.flush();
			}
		} catch (HibernateException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		finally {
			s.close();
		}

	}
	@Override
	public void search() {

			List<?> listSong = getHibernateTemplate().loadAll(Song.class);
			for(int i=0;i<listSong.size();i++){
			    System.out.println(listSong.get(i));
			}
			
		
	}

	@Override
	public Song findById(int id) {

		Song song = (Song) getHibernateTemplate().get(Song.class, id);
		if (song != null)
			return song;
		else
			return null;
	}

}
