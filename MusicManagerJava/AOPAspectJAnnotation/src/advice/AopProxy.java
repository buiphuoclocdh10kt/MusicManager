package advice;

import java.util.Arrays;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@Aspect
public class AopProxy {

	@Before("execution(* service.Service.*(..))")
	public void before(JoinPoint joinPoint) {

		System.out.println("TheBeforeAdvice is running!");

	}

//	@After("execution(* service.Service.printString(..))")
//	public void after(JoinPoint joinPoint) {
//
//		System.out.println("TheAfterAdvice is running!");
//
//	}

//	@AfterReturning(pointcut = "execution(* service.Service.printString(..))", returning = "result")
//	public void afterReturning(JoinPoint joinPoint, Object result) {
//
//		System.out.println("TheAfterReturningAdvice is running!");
//		System.out.println("Method returned value is : " + result);
//
//	}

//	@AfterThrowing(
//		      pointcut = "execution(* service.Service.throwExceptionAdvice(..))",throwing= "error")
//		    public void afterThrowing(JoinPoint joinPoint, Throwable error) {
//
//			System.out.println("AfterThrowingAdvice is running!");
//			System.out.println("Exception : " + error);
//
//		    }
//
//	@Around("execution(* service.Service.printString(..))")
//	public void around(ProceedingJoinPoint joinPoint) throws Throwable {
//
//		System.out.println("AroundBeforeAdvice is running!");
//		joinPoint.proceed(); // continue on the intercepted method
//		System.out.println("AroundAfterAdvice is running!");
//
//	}

}
