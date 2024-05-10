package com.els;

import jakarta.ws.rs.ApplicationPath;
import jakarta.ws.rs.core.Application;;
@ApplicationPath("/api")
public class App extends Application
{
    public static void main( String[] args )
    {
        System.out.println( "Hello World!" );
    }
}
