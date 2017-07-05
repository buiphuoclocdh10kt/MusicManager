package model;
import java.io.Serializable;
import java.util.Date;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
@Entity
@Table(name="song", catalog="musicmanager")
public class Song implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int id;
	private String name;
	private String author;
	private Date date;
	private boolean status;
	
	
	public Song() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Song(int id, String name, String author, Date date, boolean status) {
		super();
		this.id = id;
		this.name = name;
		this.author = author;
		this.date = date;
		this.status = status;
	}

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "id", unique = true, nullable = true)
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	@Column(name = "name", nullable = false, length = 100)
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	@Column(name = "author", nullable = true, length = 100)
	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}
	@Column(name = "date", nullable = true)
	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}
	@Column(name = "status", nullable = true)
	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}
	
	@Override
	public String toString() {
		return "Select Song: [Name: " +name+ ", Author: " + author
				+ ", Status: " + status +", Date: " +date+"]";
	}
	@Override
	public boolean equals(Object obj) {
		Song a= (Song) obj;
        return (this.getId() == a.getId());
    }

}
