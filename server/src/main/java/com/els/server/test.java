package com.els.server;

import com.els.models.Course;

import jakarta.annotation.Resource;
import jakarta.ejb.EJBContext;
import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;

@Stateless
@Path("/sample")
public class test {

  @Resource
  EJBContext context;

  @PersistenceContext(unitName = "DB")
  private EntityManager em;

  @GET
  @Path("/test1")
  public String getString() {
    return "test123123123";
  }

  @GET
  @Path("/test2")
  public boolean getString2() {

    Course course = new Course(1, "Java","Java is a programming language", "test");
    em.persist(course);
    return true;
  }

  @GET
  @Path("/test3")
  public String getString3() {
    Course course = em.find(Course.class, 1);
    return course.getName();
  }

}
