package JavaConsoleProject;

import java.io.BufferedReader;
//import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Scanner;


public class Authentication {
	
//	static User authenticationCheck(String name, String password) {
//		for(User person: Admin.allUsers) {
////			 System.out.println("Checking: " + person.name + " with " + name);
//			if(person.name.equals(name) && (person.password).equals(password)) {
//				return person;
//			}
//		}
//		return null;
//	}
//	
	  
	 
//	static {
//		File file = new File("userInfo.csv");
//		 try {
//			 if(file.createNewFile())
//			 {
//				 System.out.println("File created");
//			 }
//			 else {
//				 System.out.println("File already exsist");
//			 }
//		 }
//		 catch(IOException e)
//		 {
//			 System.out.println(e.getMessage());
//		 }
//	}

	    static User authenticationCheck(String name, String password) {
	    	
	    	
	        try (BufferedReader reader = new BufferedReader(new FileReader("userInfo.csv"))) {
	            String line;
	            
	            while ((line = reader.readLine()) != null) {
	                String[] userDetails = line.split(",");
	                
	                String storedName = userDetails[1];
	                String storedPassword = userDetails[3];

	                // Check if the name and password match
	                if (storedName.equals(name) && storedPassword.equals(password)) {
	                    if (userDetails[4].equals("Tenant")) {
	                        return new Tenant(storedName, userDetails[2],storedPassword,  (byte)Integer.parseInt(userDetails[5]));
	                    } 
	                    else if (userDetails[4].equals("LandLord")) {
	                        return new LandLord(storedName, userDetails[2],storedPassword, (byte)Integer.parseInt(userDetails[5]));
	                    }
	                    break;
	                }
	            }
	        } catch (IOException e) {
	            System.out.println("Error occurred while reading the file.");
	        }
	        return null;  
	    }
	
//	static User checkProperties(int ownerId, int propertyId) {
//		
//	}
	    
	    
}
