package com.els.api;

import java.util.List;

import com.els.models.Course;
import com.els.repo.CourseRepo;

import jakarta.annotation.Resource;
import jakarta.ejb.EJBContext;
import jakarta.ejb.Stateless;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.Response.Status;

@Stateless
@Path("/course")
public class CourseAPI {

  @Resource
  EJBContext context;

  @PersistenceContext(unitName = "DB")
  private EntityManager em;

  @Inject
  CourseRepo repo;

  @POST
  @Path("/addcourse")
  public Response addCourse(Course course) {
    if(repo.addCourse(course))
      return Response.status(Status.CREATED).entity("Course created successfully!").build();
    return Response.status(Status.INTERNAL_SERVER_ERROR).entity("Failed to create course.").build();

  }


  @GET
  @Path("/get/{id}")
  public String getCourse(@PathParam("id") String id) {
    Course course = em.find(Course.class, Integer.valueOf(id));
    return course.getName();
  }

  @GET
  @Path("/sorted")
  @Produces(MediaType.APPLICATION_JSON)
  public List<Course> getAllCoursesSorted() {
    return repo.getAllCoursesSorted();
  }

  @GET
  @Path("/search/name/{name}")
  @Produces(MediaType.APPLICATION_JSON)
  public List<Course> searchCourseByName(@PathParam("name") String name) {
    return repo.searchCourseByName(name);
  }

  @GET
  @Path("/search/category/{name}")
  @Produces(MediaType.APPLICATION_JSON)
  public List<Course> searchCourseByCategory(@PathParam("name") String name) {
    return repo.searchCourseByCategory(name);
  }

}
