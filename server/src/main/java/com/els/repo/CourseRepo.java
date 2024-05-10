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
          // Handle exceptions (optional)
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
}
