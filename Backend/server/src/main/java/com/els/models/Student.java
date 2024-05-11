package com.els.models;

import com.els.util.SignupWrapper;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "students")
public class Student extends Account{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "afflication")
    private String afflication;

    @Column(name = "bio")
    private String bio;

    public Student(SignupWrapper wrapper){
        super(wrapper);
        this.afflication = wrapper.afflication;
        this.bio = wrapper.bio;
    }

    public Account getAccount(){
        return super.getAccount();
    }


}
