package com.els.api;

import java.util.List;

import com.els.models.Course;
import com.els.models.Review;
import com.els.repo.CourseRepo;

import jakarta.annotation.Resource;
import jakarta.ejb.EJBContext;
import jakarta.ejb.Stateless;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
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
  CourseRepo courseRepo;

  @POST
  @Path("/addcourse")
  public Response addCourse(Course course) {
    if(courseRepo.addCourse(course))
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
    return courseRepo.getAllCoursesSorted();
  }

  @GET
  @Path("/search/name/{name}")
  @Produces(MediaType.APPLICATION_JSON)
  public List<Course> searchCourseByName(@PathParam("name") String name) {
    return courseRepo.searchCourseByName(name);
  }

  @GET
  @Path("/search/category/{name}")
  @Produces(MediaType.APPLICATION_JSON)
  public List<Course> searchCourseByCategory(@PathParam("name") String name) {
    return courseRepo.searchCourseByCategory(name);
  }

  @POST
  @Path("/enroll/{cid}")
  public Response enrollCourse( @PathParam("cid") String cid) {
    if(courseRepo.enroll(cid))
      return Response.status(Status.OK).entity("Course enrolled successfully!").build();
    return Response.status(Status.INTERNAL_SERVER_ERROR).entity("Failed to enroll course.").build();
  }
  @PUT
  @Path("/update/{id}/{status}")
  public Response updateCourse(@PathParam("id") String id, @PathParam("status") Integer status) {
    if(courseRepo.updateCourse(Integer.valueOf(id), status == 0 ? false : true))
      return Response.status(Status.OK).entity("Course updated successfully!").build();
    return Response.status(Status.INTERNAL_SERVER_ERROR).entity("Failed to update course.").build();
  }

  @GET
  @Path("/pending")
  @Produces(MediaType.APPLICATION_JSON)
  public List<Course> getAllPendingCourses() {
    return courseRepo.getAllPendingCourses();
  }

  @POST
  @Path("/review")
  public Response review(Review review) {
    try{
      courseRepo.review(review);
      return Response.status(Status.OK).entity("Course reviewed successfully!").build();
    }catch(Exception e){return Response.status(Status.INTERNAL_SERVER_ERROR).entity("Failed to review course.").build();}
  }

  @GET
  @Path("/reviews/course/{cid}")
  @Produces(MediaType.APPLICATION_JSON)
  public List<Review> getReviewsByCourse(@PathParam("cid") int cid) {
    return courseRepo.getAllReviewsForCid(cid);
  }

  @GET
  @Path("/reviews/student/{sid}")
  @Produces(MediaType.APPLICATION_JSON)
  public List<Review> getReviewsByStudent(@PathParam("sid") int sid) {
    return courseRepo.getAllReviewsForSid(sid);
  }
}
