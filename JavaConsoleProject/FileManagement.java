package JavaConsoleProject;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Scanner;


public class FileManagement {
	
	static File file = new File("userInfo.csv");
	
	static File file2 = new File("properties.csv");
	

	
	static void addUserDetailsToFile(User obj) {
		
		
		try (FileWriter writer = new FileWriter(file, true))
		{
			if(obj instanceof Tenant) {
//				Tenant userNew  = (Tenant) obj;
				writer.write(obj.idOfUser+","+obj.name+","+obj.phoneNumber+","+obj.password+","+"Tenant"+","+obj.age+"\n");
			}
			
			else if(obj instanceof LandLord) {
//				LandLord userNew2  = (LandLord) obj;
				writer.write(obj.idOfUser+","+obj.name+","+obj.phoneNumber+","+obj.password+","+"LandLord"+","+obj.age+"\n");
			}
			
			else {
				writer.write("1,Deepa,8937287640,123456,LandLord,22\n");
				writer.write("2,Varal,8647892794,hello,Tenant,22\n");
			}
			writer.close();
			
		}
		catch(IOException e)
		{
			System.out.println("error occurred while writing");
		}
	}
	
	static void deleteFile(String fileName) {
		File file = new File(fileName);
		file.delete();
	}
	
	
	
	static void addProperties(int idOfowner, Property obj) {
		
		try(FileWriter writer2 = new FileWriter(file2, true)){

			writer2.write(idOfowner+","+obj.location+","+ obj.propertyId+","+obj.rentAmount+","+obj.statusOfProperty+","+obj.size+"\n" );
			writer2.close();
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
		}
		
	}
	
	
	
//	static int getIDOfUser() {
//		int id=0;
//		String line;
//		
////		FileReader reader = new FileReader(file);
//		
//		try(BufferedReader reader1 = new BufferedReader(new FileReader(file))){
//			while((line =reader1.readLine()) !=null) {
//			
//				String[] userDetails = line.split(",");
////				
////				if(Integer.parseInt(userDetails[1]).equals(name)) {
////					
////				}
//				id = Integer.parseInt(userDetails[0]);
//			}
//		}
//		catch(Exception e){
//			System.out.println(e.getMessage());
//		}
//		return id;
//	}

	
//	void addProperty1(int idOfowner, Property obj1) {
//		String line;
//		try(FileWriter writer= new FileWriter(file, true)){
//			writer.write(idOfowner, );
//		}
//				
//	}
//	
	
//	static int getPropertyId() {
//		int id=0;
//		String line;
//		
//		try(BufferedReader reader1 = new BufferedReader(new FileReader(file2))){
//			while((line =reader1.readLine()) !=null) {
//				String[] userDetails = line.split(",");
//				id = Integer.parseInt(userDetails[2]);
//				
//				if( Integer.parseInt(userDetails[0]) )
//			}
//		}
//		catch(Exception e){
//			System.out.println(e.getMessage());
//		}
//		return id;
//	}
//	
	
	static int getUserIdFromExsisting(String name) {
		String line;
		try(BufferedReader file1 = new BufferedReader(new FileReader(file))){
			
			while((line = file1.readLine()) != null) {
				String[] userDetails = line.split(",");

				if(userDetails[1].equals(name)) {
					return Integer.parseInt(userDetails[0]);
				}
				
			}
			file1.close();
		}
		catch(Exception e) {
			System.out.println(e.getMessage());
		}
		return 0;
	}
	
	
}


































