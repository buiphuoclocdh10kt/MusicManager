package dao;

import java.util.List;

import org.hibernate.FlushMode;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.springframework.dao.DataAccessException;
import org.springframework.orm.hibernate4.support.HibernateDaoSupport;

import config.Sessions;
import config.Song;
import config.Users;

public class MusicDAOImplement extends HibernateDaoSupport implements MusicDAO {
	@Override
	public void add(Song song) {
		Session s = getSessionFactory().openSession();
		try {
			s.setFlushMode(FlushMode.ALWAYS);
			s.saveOrUpdate(song);
			s.flush();
		} catch (DataAccessException e) {
			e.printStackTrace();
		} finally {
			s.close();
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
			e.printStackTrace();
		} finally {
			s.close();
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Song> search(String name, int userId) {
		Session session = getSessionFactory().openSession();
		Query query = session.createQuery("from Song where (userId = ? or status = true) and name like ?");
		query.setString(1, "%" + name + "%");
		query.setParameter(0, userId);
		List<Song> list = query.list();
		return list;
	}

	@Override
	public Song findById(int id) {
		Song song = (Song) getHibernateTemplate().get(Song.class, id);
		if (song != null)
			return song;
		else
			return null;
	}

	@Override
	public Sessions findSessionBySessionAccount(String ip) {
		Sessions session = (Sessions) getHibernateTemplate().find("from Sessions where sessionAccount= ? ", ip).get(0);
		if (session != null)
			return session;
		else
			return null;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Song> selectSongByUserId(int userId) {
		List<Song> listSong = (List<Song>) getHibernateTemplate().find("from Song where userId= ? or status = true",
				userId);
		return listSong;
	}

	@SuppressWarnings("unchecked")
	@Override
	public int logIn(String userAccount, String userPassword) {
		Session session = getSessionFactory().openSession();
		String hql = "from Users where userAccount = ? and userPassword = ?";
		List<Users> listUser = session.createQuery(hql).setString(0, userAccount).setParameter(1, userPassword).list();
		if (listUser.isEmpty())
			return 0;
		else {
			return listUser.get(0).getUserId();
		}

	}

	@SuppressWarnings("unchecked")
	@Override
	public boolean isLogIn(String ip) {
		Session session = getSessionFactory().openSession();
		Query query = session.createQuery("from Sessions where sessionTime>= now()-3600*24 and sessionAccount= ?");
		query.setParameter(0, ip);
		List<Users> listUser = query.list();
		if (listUser.isEmpty())
			return false;
		else
			return true;
	}

	@SuppressWarnings("unchecked")
	@Override
	public int getUserId(String ip) {
		List<Sessions> listUser = (List<Sessions>) getHibernateTemplate().find("from Sessions where sessionAccount= ? ",ip);
		int userId = listUser.get(0).getSessionUserId();
		return userId;
	}

	@Override
	public Users getUserByUserId(int UserId) {
		Users song = (Users) getHibernateTemplate().get(Users.class, UserId);
		if (song != null)
			return song;
		else
			return null;
	}

	@Override
	public void addSession(Sessions session) {
		Session s = getSessionFactory().openSession();
		try {
			s.setFlushMode(FlushMode.ALWAYS);
			s.saveOrUpdate(session);
			s.flush();
		} catch (DataAccessException e) {
			e.printStackTrace();
		} finally {
			s.close();
		}
	}

	@Override
	public boolean deleteSession(String ip) {
		Session session = getSessionFactory().openSession();
		try {
			String hql = "delete from Sessions where sessionAccount=?";
			Query query = session.createQuery(hql);
			query.setString(0, ip);
			query.executeUpdate();
			return true;
		} catch (HibernateException e) {
			e.printStackTrace();
			return false;
		} finally {
			session.close();
		}
	}

}
