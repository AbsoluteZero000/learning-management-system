package com.els.models;


import com.els.util.SignupWrapper;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GenerationType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data

@Table(name = "instructors")
public class Instructor extends Student{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "yoe")
    private Integer yoe;


    public Instructor(SignupWrapper wrapper){
        super(wrapper);
        this.yoe = wrapper.yoe;

    }

    public Account getAccount(){
        return super.getAccount();
    }


}
