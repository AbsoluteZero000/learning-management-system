package com.els.util;

import com.els.models.Course;

public class CourseWrapper {
        public Integer id;
        public String name;
        public String description;
        public Integer duration;
        public String category;
        public String content;
        public Float rating;
        public Integer capacity;
        public String status;
        public Integer instructorid;

        public CourseWrapper(Course course, String status){
            this.id = course.getId();
            this.name = course.getName();
            this.description = course.getDescription();
            this.duration = course.getDuration();
            this.category = course.getCategory();
            this.content = course.getContent();
            this.rating = course.getRating();
            this.capacity = course.getCapacity();
            this.status = status;
            this.instructorid = course.getInstructorid();
        }
}
