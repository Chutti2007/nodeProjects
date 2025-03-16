package JavaConsoleProject;

import java.util.ArrayList;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class Tenant extends User{
	String role = "Tenant";

	static ArrayList <Property> stayingProperty = new ArrayList<Property>();
	
	static ArrayList <Property> allAvailableProperty = new ArrayList<Property>();

	
	Tenant(String name, String phoneNumber,String password, byte age){
		super(name,password,phoneNumber,age);

	}
	
	String viewTentantDetails() {
		return (super.getUserDetails()+"        Role : "+role+"\n"+"\n─── ⋆⋅☆⋅⋆ ─── ─── ⋆⋅☆⋅⋆ ─── ─── ⋆⋅☆⋅⋆ ─── ─── ⋆⋅☆⋅⋆ ─── ─── ⋆⋅☆⋅⋆ ─── ─── ⋆⋅☆⋅⋆ ─── ─── ⋆⋅☆⋅⋆ ───\n");
	}
	
	StringBuffer viewAllPropertyDetails() {
		
		StringBuffer detailsOfProperty= new StringBuffer();

		String line;
		for(Property prop: allAvailableProperty) {
			detailsOfProperty.append(prop.displayPropertyDetails());
		}
		
//		System.out.println("Length : "+allAvailableProperty.size());
		return detailsOfProperty;
		
	}
	
	StringBuilder searchProperties(double rentMoney) {
		
		StringBuilder searchHouse = new StringBuilder();
		
		for(Property property: allAvailableProperty) {
			if(property != null && property.rentAmount <= rentMoney) {
				searchHouse.append(property.displayPropertyDetails());
				
			}
		}
		return searchHouse;
	}
	
	StringBuilder searchProperties(float size) {
		StringBuilder searchHouse = new StringBuilder();
		
		for(Property property: allAvailableProperty) {
			if(property != null && property.size <= size) {
				searchHouse.append(property.displayPropertyDetails());
			}
		}
		return searchHouse;
	}
	
	
	StringBuilder searchProperties(String locationNow) {
		
		StringBuilder searchHouse = new StringBuilder();
		
		for(Property property: allAvailableProperty) {
			if(property != null && property.location.contains(locationNow)) {
				searchHouse.append(property.displayPropertyDetails());
			}
		}
		return searchHouse;
	}
	
	
	
	StringBuilder searchProperties(double rentMoney, float size,String locationNow) {
		
		StringBuilder searchHouse = new StringBuilder();
		
		for(Property property: allAvailableProperty) {
			if(property != null && property.location.contains(locationNow) && property.rentAmount <= rentMoney && property.size <= size) {
				searchHouse.append(property.displayPropertyDetails());
			}
		}
		return searchHouse;
	}
	

	boolean addAllProperty() {
		String line;
		try(BufferedReader reader= new BufferedReader(new FileReader(FileManagement.file2))){
			while((line = reader.readLine()) != null) {
				String[] propertyDetails = line.split(",");
				Property prop1= new Property(propertyDetails[1], Double.parseDouble(propertyDetails[3]), Float.parseFloat(propertyDetails[5]), Integer.parseInt(propertyDetails[0]), Boolean.parseBoolean(propertyDetails[4]));

				allAvailableProperty.add(prop1);
				
			
			}
			reader.close();
		}
		catch(IOException e) {
			System.out.println(e.getMessage());
		}
		
		return allAvailableProperty.size() !=0 ? true : false;
		
	}
	
	
	StringBuilder viewRentedPropertyDetails() {
		StringBuilder rentedPropertyDetail = new StringBuilder();
		
		for(Property property : stayingProperty) {
			rentedPropertyDetail.append( property.displayPropertyDetails());
		}
		return rentedPropertyDetail;
	}

	int getOwnerIdFromProperty(int propertyId) {
		for(Property pro : allAvailableProperty) {
			if(propertyId == pro.getPropertyId()) {
				return pro.idOfOwner;
			}
		}
		return 0;
	}
}






















