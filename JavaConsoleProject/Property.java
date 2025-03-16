package JavaConsoleProject;

import java.io.BufferedReader;
import java.io.FileReader;

public class Property {
	
	int propertyId;
	String location;
	float size;
	boolean statusOfProperty;
	double rentAmount;
	int idOfOwner;
	int borrowableYear =2;
	
	
	Property(String location, double rent, float size,int ownerId, boolean status){
		this.location = location;
		rentAmount =rent;
		this.size= size;
		idOfOwner = ownerId;
		propertyId= getPropertyId()+1;
		statusOfProperty = status;
	}

	
	
	public void setLocation(String location) {
		this.location = location;
	}
	
	public void setSize(float size) {
		this.size = size;
	}
	
	public void setStatusOfProperty(boolean statusOfProperty) {
		this.statusOfProperty = statusOfProperty;
	}
	
	public void setRentAmount(double rentAmount) {
		this.rentAmount = rentAmount;
	}
	
	
	
	public String getLocation() {
		return location;
	}
	
	public float getSize() {
		return size;
	}
	
	public boolean isStatusOfProperty() {
		return statusOfProperty;
	}
	
	public double getRentAmount() {
		return rentAmount;
	}
	
	String displayPropertyDetails() {
		return ("\n────⟢⋮────⟢⋮────⟢⋮────⟢⋮────⟢⋮────⟢⋮────⟢⋮────⟢⋮────⟢⋮────⟢⋮\nProperty Id : "+propertyId+"        Owner Id : "+idOfOwner+"\t\tProperty Size : "+size+"\t\tRent Per Month : "+rentAmount+"        Location : "+location+"        Is Property Available : "+(statusOfProperty ? "Available" : "Not Available")+"\n────⟢⋮────⟢⋮────⟢⋮────⟢⋮────⟢⋮────⟢⋮────⟢⋮────⟢⋮────⟢⋮────⟢⋮\n");
	}
	
	
	int getPropertyId() {
		int id=0;
		String line;
		
		try(BufferedReader reader1 = new BufferedReader(new FileReader(FileManagement.file2))){
			while((line =reader1.readLine()) !=null) {
				String[] propertyDetails = line.split(",");
				id = Integer.parseInt(propertyDetails[2]);
				
				if( Integer.parseInt(propertyDetails[0]) == idOfOwner &&  propertyDetails[1].equals(location) ) {
					id--;
//					System.out.println("Inside I came");
					break;
				}
			}
		}
		catch(Exception e){
			System.out.println(e.getMessage());
		}
		return id;
	}
	
	
}
