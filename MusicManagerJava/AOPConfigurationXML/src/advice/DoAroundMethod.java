package advice;

import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;

public class DoAroundMethod implements MethodInterceptor {

	@Override
	public Object invoke(MethodInvocation arg0) throws Throwable {

		try {
			System.out.println("Do Around before method");
			Object result = arg0.proceed();
			return result;
		} finally {
			System.out.println("Do Around after method");
		}

	}

}
