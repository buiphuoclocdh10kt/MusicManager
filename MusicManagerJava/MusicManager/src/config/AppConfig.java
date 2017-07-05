package config;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.AnnotationConfiguration;
import org.springframework.aop.framework.ProxyFactoryBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import dao.MusicDAO;
import dao.MusicDAOImplement;
import service.MusicService;
import service.MusicServiceImplement;

@Configuration
public class AppConfig {
	@Bean(name="musicServiceBean")
	public MusicService musicService() {
        return new MusicServiceImplement();
    }
	@Bean(name="musicDAOBean")
	public MusicDAO musicDAO(){
		return new MusicDAOImplement();
	}
	
	
	private static final SessionFactory sessionFactory = buildSessionFactory();
    private static SessionFactory buildSessionFactory() {
        try {
            // Create the SessionFactory from hibernate.cfg.xml
            return new AnnotationConfiguration().configure().buildSessionFactory();
        } catch (Throwable ex) {
            System.err.println("Initial SessionFactory creation failed." + ex);
            throw new ExceptionInInitializerError(ex);
        }
    }
    @Bean(name="sessionFactoryBean")
    public static SessionFactory getSessionFactory() {
        return sessionFactory;
    }
	

}
