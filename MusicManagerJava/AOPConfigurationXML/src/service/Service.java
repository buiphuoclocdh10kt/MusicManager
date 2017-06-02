package service;

public class Service {
	private String a;

	public String getA() {
		return a;
	}

	public void setA(String a) {
		this.a = a;
	}

	public void printString(String a) {
		System.out.println("String : " + a);
	}
	
	public void printString2(String a) {
		System.out.println("String : " + a+" Spring AOP Framework  ");
	}

	public void throwExceptionAdvice() {
		throw new IllegalArgumentException();
	}

}
