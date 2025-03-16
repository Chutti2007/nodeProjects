package JavaConsoleProject;

import java.time.LocalDate;
import java.util.ArrayList;

public class RentalAgreenment {
	
	int ownerId;
	int tenantId;
	int propertyId;
	int advance = 2000;
	LocalDate startingDate;
	
	static ArrayList <Property> arrayOfAgreements = new ArrayList<Property>();
	

	RentalAgreenment(int ownerId, int tenantId, int propertyId ){
		this.ownerId =ownerId;
		this.tenantId = tenantId;
		this.propertyId= propertyId;
		startingDate = getCurrentDate();
		
	}
	
	
	
	 boolean rentHouse() {	
		for(int i=0; i<Tenant.allAvailableProperty.size(); i++) {
			if((Tenant.allAvailableProperty.get(i) != null) && Tenant.allAvailableProperty.get(i).propertyId == this.propertyId && Tenant.allAvailableProperty.get(i).statusOfProperty == true) {
				arrayOfAgreements.add(Tenant.allAvailableProperty.get(i));
				Tenant.stayingProperty.add(Tenant.allAvailableProperty.get(i));
				Tenant.allAvailableProperty.get(i).setStatusOfProperty(false);
				return true;
			}
		}
		return false;

	}
	 
	void rentedHouseDetails() {
		for(Property property : arrayOfAgreements) {
			System.out.println("Owner id : "+ownerId+"         Tenant Id : "+tenantId+"        Property Id : "+propertyId);
			System.out.println("Rented House :\n"+property.displayPropertyDetails());
		}
	}
	
//	
//	void giveRentAmount(double rentAmountGiven) {
//		for(int i=0; i<Admin.allUsers.size(); i++) {
//			if(Admin.allUsers.get(i) != null && Admin.allUsers.get(i).idOfUser == ownerId && Admin.allUsers.get(i).role.equals("LandLord")) {
//				LandLord lord = (LandLord) Admin.allUsers.get(i);
//				lord.rentAmount = rentAmountGiven;
//				System.out.println(lord.getRentAmount());
//				break;
//			}
//		}
//	}
	
	
	 
	public void setOwnerId(int ownerId) {
		this.ownerId = ownerId;
	} 
	
	public void setTenantId(int tenantId) {
		this.tenantId = tenantId;
	} 
	
	public void setPropertyId(int propertyId) {
		this.propertyId = propertyId;
	}
	
	public void setAdvance(int advance) {
		this.advance = advance;
	}
	
	public void setStartingDate(LocalDate startingDate) {
		this.startingDate = startingDate;
	}
	
	
	
	public int getOwnerId() {
		return ownerId;
	}

	public int getTenantId() {
		return tenantId;
	}

	public int getPropertyId() {
		return propertyId;
	}

	public int getAdvance() {
		return advance;
	}

	public LocalDate getStartingDate() {
		return startingDate;
	}
	
	public static LocalDate getCurrentDate() {
		return LocalDate.now();
	}

	
}
