package JavaConsoleProject;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;

public class LandLord extends User{
	
	String role = "LandLord";

//	double moneyFromRent;
	static double amount;
	double rentAmount;

	
	static ArrayList<Property> propertyOwned = new ArrayList<Property>();
//	static ArrayList <Property> allTheProperty = new ArrayList<Property>();
	

	LandLord(String name, String phoneNumber, String password,byte age){
		
		super(name, password,phoneNumber,age);
	
	}
	
	
	String displayLandLordDetails() {
		return super.getUserDetails()+"\nRole : "+role+"\n─── ⋆⋅☆⋅⋆ ─── ─── ⋆⋅☆⋅⋆ ─── ─── ⋆⋅☆⋅⋆ ─── ─── ⋆⋅☆⋅⋆ ─── ─── ⋆⋅☆⋅⋆ ─── ─── ⋆⋅☆⋅⋆ ─── ─── ⋆⋅☆⋅⋆ ───\n";
	}
	
	
	static void addProperty(Property obj) {
		propertyOwned.add(obj);
	}
	
	
	boolean removeProperty(int id) {

		for(int i=0; i<propertyOwned.size(); i++) {
			if(propertyOwned.get(i) != null && propertyOwned.get(i).propertyId == id) {
				propertyOwned.remove(i);
//				System.out.println("I removed it");
				return true;
			}
		}
		return false;
		

	}
	
	
	static Property getProperty(int id) {
		for(Property propertyOfOwner : propertyOwned) {
			if(propertyOfOwner != null && propertyOfOwner.propertyId == id) {
				return propertyOfOwner;
			}
		}
		return null;
	}
	
	StringBuffer viewPropertyDetails() {
	
		StringBuffer propertyDetails = new StringBuffer();
		
		for(Property pro1: propertyOwned) {
			if(pro1 != null) {
				propertyDetails.append(pro1.displayPropertyDetails());
			}
		}
		return propertyDetails;
	}
	
	
	
	public void setRentAmount(double rentAmount) {
		this.rentAmount = rentAmount;
	}
	
	public double getRentAmount() {
		return rentAmount;
	}


	void addProperties() {
		String line;
		Property prop1;
		try(BufferedReader reader= new BufferedReader(new FileReader(FileManagement.file2))){
			while((line = reader.readLine()) != null) {
				String[] propertyDetails = line.split(",");
				if( idOfUser == Integer.parseInt(propertyDetails[0])) {
				prop1=new Property(propertyDetails[1],Double.parseDouble(propertyDetails[3]), Float.parseFloat(propertyDetails[5]), Integer.parseInt(propertyDetails[0]), Boolean.parseBoolean(propertyDetails[4]));
					propertyOwned.add(prop1);
				}
			}
			reader.close();
		}
		catch(IOException e) {
			System.out.println(e.getMessage());
		}
		
	}
	
	
	
//	void viewAgreement() {
//		
//	}
}
