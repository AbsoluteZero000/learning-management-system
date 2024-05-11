package com.els.repo;

import java.util.List;

import com.els.models.Course;

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
          em.persist(course);
          return true;
        } catch (Exception e) {
          e.printStackTrace();
          return false;
        }
  }


  public List<Course> searchCourseByName(String name) {
    String query = "SELECT c FROM Course c WHERE UPPER(c.name) LIKE UPPER(:name)";
    TypedQuery<Course> typedQuery = em.createQuery(query, Course.class);
    typedQuery.setParameter("name", "%" + name + "%");
    return typedQuery.getResultList();
  }


  public List<Course> searchCourseByCategory(String catgeory) {
    String query = "SELECT c FROM Course c WHERE UPPER(c.name) LIKE UPPER(:category)";
    TypedQuery<Course> typedQuery = em.createQuery(query, Course.class);
    typedQuery.setParameter("category", "%" + catgeory + "%");
    return typedQuery.getResultList();
  }


  public List<Course> getAllCoursesSorted() {
    String query = "SELECT c FROM Course c ORDER BY c.rating DESC";
    TypedQuery<Course> typedQuery = em.createQuery(query, Course.class);
    return typedQuery.getResultList();

  }


public boolean enroll(String sid, String cid) {
    String query = "SELECT c FROM Course c WHERE c.id = :cid";
    TypedQuery<Course> typedQuery = em.createQuery(query, Course.class);
    typedQuery.setParameter("cid", cid);
    Course course = typedQuery.getSingleResult();
    if(course.getCapacity() > 0){
      course.setCapacity(course.getCapacity() - 1);
      em.merge(course);
      return true;
    }
    return false;
}
}
