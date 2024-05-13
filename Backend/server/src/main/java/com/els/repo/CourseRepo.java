package com.els.repo;

import java.util.List;

import com.els.models.Course;
import com.els.models.Enrollment;
import com.els.models.Notification;
import com.els.models.Review;

import jakarta.ejb.Singleton;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;

@Singleton
public class CourseRepo {

  @PersistenceContext(unitName = "DB")
  private EntityManager em;


  public boolean addCourse(Course course) {
      try {
          course.setStatus("pending");
          em.persist(course);
          return true;
        } catch (Exception e) {
          e.printStackTrace();
          return false;
        }
  }


  public List<Course> searchCourseByName(String name) {
    String query = "SELECT c FROM Course c WHERE UPPER(c.name) LIKE UPPER(:name) AND c.status = :status";
    TypedQuery<Course> typedQuery = em.createQuery(query, Course.class);
    typedQuery.setParameter("status", "accepted");
    typedQuery.setParameter("name", "%" + name + "%");
    return typedQuery.getResultList();
  }

  public List<Course> getAllPendingCourses() {
    String query = "SELECT c FROM Course c WHERE c.status = :status";
    TypedQuery<Course> typedQuery = em.createQuery(query, Course.class);
    typedQuery.setParameter("status", "pending");
    return typedQuery.getResultList();
  }

  public Boolean updateCourse(int id, Boolean status) {
    Course course = em.find(Course.class, id);
    if(course == null) return false;
    if(status) course.setStatus("accepted");
    else course.setStatus("rejected");
    em.merge(course);
    return true;
  }
  public List<Course> searchCourseByCategory(String catgeory) {
    String query = "SELECT c FROM Course c WHERE UPPER(c.name) LIKE UPPER(:category) AND c.status = :status";
    TypedQuery<Course> typedQuery = em.createQuery(query, Course.class);
    typedQuery.setParameter("category", "%" + catgeory + "%");
    typedQuery.setParameter("status", "accepted");
    return typedQuery.getResultList();
  }


  public List<Course> getAllCoursesSorted() {
    String query = "SELECT c FROM Course c WHERE c.status = :status ORDER BY c.rating DESC";
    TypedQuery<Course> typedQuery = em.createQuery(query, Course.class);
    typedQuery.setParameter("status", "accepted");
    return typedQuery.getResultList();

  }

  public Boolean delteCourse(int id) {
    Course course = em.find(Course.class, id);
    if(course == null) return false;
    em.remove(course);
    return true;
  }

  public Course updateCourse(Course course){
    em.merge(course);
    return course;
  }

  public boolean enroll(Integer cid, Integer sid){
    String query = "SELECT c FROM Course c WHERE c.id = :cid";
    TypedQuery<Course> typedQuery = em.createQuery(query, Course.class);
    typedQuery.setParameter("cid", cid);
    Course course = typedQuery.getSingleResult();
    if(course == null) return false;

    if(course.getStatus().equals("accepted") && course.getCapacity() > 0){
      course.setCapacity(course.getCapacity() - 1);
      em.merge(course);
      Enrollment enrollment = new Enrollment();
      enrollment.setCid(cid);
      enrollment.setSid(sid);
      enrollment.setStatus("pending");
      em.persist(enrollment);
      return true;
    }
    return false;
  }
  public Boolean review(Review review){
    em.persist(review);
    return true;
  }
  public List<Review> getAllReviewsForSid(int sid){
    String query = "SELECT r FROM Review r WHERE r.sid = :sid";
    TypedQuery<Review> typedQuery = em.createQuery(query, Review.class);
    typedQuery.setParameter("sid", sid);
    return typedQuery.getResultList();
  }

  public List<Review> getAllReviewsForCid(int cid){
    String query = "SELECT r FROM Review r WHERE r.cid = :cid";
    TypedQuery<Review> typedQuery = em.createQuery(query, Review.class);
    typedQuery.setParameter("cid", cid);
    return typedQuery.getResultList();
  }


  public boolean updateEnrollment(Integer cid, Integer sid, boolean b) {
    String query = "SELECT e FROM Enrollment e WHERE e.cid = :cid AND e.sid = :sid";
    TypedQuery<Enrollment> typedQuery = em.createQuery(query, Enrollment.class);
    typedQuery.setParameter("cid", cid);
    typedQuery.setParameter("sid", sid);
    Enrollment enrollment = typedQuery.getSingleResult();

    query = "Select c FROM Course c WHERE c.id = :cid";
    TypedQuery<Course> courseQuery = em.createQuery(query, Course.class);
    courseQuery.setParameter("cid", cid);
    Course course = courseQuery.getSingleResult();

    if(enrollment == null) return false;
    if(b) enrollment.setStatus("accepted");
    else {
      enrollment.setStatus("rejected");
      course.setCapacity(course.getCapacity()-1);
    }

    Notification notification = new Notification();
    notification.setCid(cid);
    notification.setSid(sid);
    notification.setMessage("Enrollment for course " + course.getName() + " " + (b ? "accepted" : "rejected"));
    notification.setRead(false);

    em.merge(course);
    em.persist(notification);
    em.merge(enrollment);

    return true;
  }


public List<Notification> getNotfications(Integer sid) {
  String query = "SELECT n FROM Notification n WHERE n.sid = :sid AND n.read = :read";
  TypedQuery<Notification> typedQuery = em.createQuery(query, Notification.class);
  typedQuery.setParameter("read", false);
  typedQuery.setParameter("sid", sid);
  List<Notification> notifications = typedQuery.getResultList();
  for(Notification notification : notifications) {
    notification.setRead(true);
    em.merge(notification);
  }
  return notifications;
}


public List<Course> getEnrolledCourses(Integer sid) {
  String query = "SELECT c FROM Course c WHERE c.id IN (SELECT e.cid FROM Enrollment e WHERE e.sid = :sid AND e.status = :status)";
  TypedQuery<Course> typedQuery = em.createQuery(query, Course.class);
  typedQuery.setParameter("status", "accepted");
  typedQuery.setParameter("sid", sid);
  return typedQuery.getResultList();
}


public boolean deleteEnrollment(Integer valueOf) {
  Enrollment enrollment = em.find(Enrollment.class, valueOf);
  if(enrollment == null) return false;
  em.remove(enrollment);
  return true;
}
}
