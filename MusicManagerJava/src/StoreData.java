  
import java.util.Calendar;
import java.util.Date;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

public class StoreData {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		//creating configuration object  
	    Configuration cfg=new Configuration();  
	    cfg.configure("hibernate.cfg.xml");//populates the data of the configuration file  
	      
	    //creating seession factory object  
	    SessionFactory factory=cfg.buildSessionFactory();  
	      
	    //creating session object  
	    Session session=factory.openSession();  
	      
	    //creating transaction object  
	    Transaction t=session.beginTransaction();  
	          
	    SongMusic e1=new SongMusic();  
	    e1.setId_song(6); 
	    e1.setName_song("Nhật Ký Đời Tôi");
	    e1.setAuthor_song("Thanh Sơn");
	    Calendar cal = Calendar.getInstance();
	    Date currentTime = cal.getTime();
	    e1.setDate_add_song(currentTime);
	    e1.setPublic_song(false);
	    
	      
	    session.persist(e1);//persisting the object  
	      
	    t.commit();//transaction is committed  
	    session.close();  
	      
	    System.out.println("successfully saved");  

	}

}
