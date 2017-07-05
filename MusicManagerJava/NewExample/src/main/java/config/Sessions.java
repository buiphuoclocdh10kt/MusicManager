package config;

import static javax.persistence.GenerationType.IDENTITY;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "sessions")
public class Sessions implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int sessionId;
	private String sessionAccount;
	private Date sessionTime;
	private int sessionUserId;

	public Sessions() {
		super();
	}

	public Sessions(int sessionId, String sessionAccount, Date sessionTime, int sessionUserId) {
		super();
		this.sessionId = sessionId;
		this.sessionAccount = sessionAccount;
		this.sessionTime = sessionTime;
		this.sessionUserId = sessionUserId;
	}

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "sessionId", nullable = false)
	public int getSessionId() {
		return sessionId;
	}

	public void setSessionId(int sessionId) {
		this.sessionId = sessionId;
	}

	@Column(name = "sessionAccount",unique = true, nullable = false, length = 30)
	public String getSessionAccount() {
		return sessionAccount;
	}

	public void setSessionAccount(String sessionAccount) {
		this.sessionAccount = sessionAccount;
	}

	@Column(name = "sessionTime")
	public Date getSessionTime() {
		return sessionTime;
	}

	public void setSessionTime(Date sessionTime) {
		this.sessionTime = sessionTime;
	}

	@Column(name = "sessionUserId")
	public int getSessionUserId() {
		return sessionUserId;
	}

	public void setSessionUserId(int sessionUserId) {
		this.sessionUserId = sessionUserId;
	}

}
