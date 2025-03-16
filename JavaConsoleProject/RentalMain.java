package JavaConsoleProject;
import java.util.Scanner;



public class RentalMain {
	
	 public static final String RESET = "\033[0m"; 
	 public static final String GREEN_BOLD = "\033[1;32m";
	 public static final String RED_BOLD = "\033[1;31m"; 
	 public static final String CYAN_BOLD = "\033[1;36m";
	 public static final String BG_COLOR = "\033[42m";
	 public static final String WHITE_BOLD = "\033[1;37m"; 
	 public static final String BLACK_BOLD = "\033[1;37m"; 
	 
	 
	 static String blueText = "\033[34m"; 

	
	public static void main(String arg[]) {
		
		Scanner inputGetter = new Scanner(System.in);
		
		boolean choice = true;
		User user = null;
	
		 	System.out.println(blueText + "-------------------------------------------");
	        System.out.println("|" + WHITE_BOLD+ "  Welcome to Online House Renting System!  " + RESET + blueText + "|");
	        System.out.println("-------------------------------------------"+RESET);
		

		while(choice) {
		        
			
					System.out.println("(1) - login\n(2) - Sign up\n(3) - Exit\n"+blueText +"-------------------------------------------"+RESET);
					
					byte choiceNow = inputGetter.nextByte();
					
					switch(choiceNow) {
					
					case 1:
						
						inputGetter.nextLine();
						
						System.out.println("\nEnter your name");
						String nameGiven = inputGetter.nextLine();
						System.out.println("\nEnter your password");
						String passwordGiven = inputGetter.nextLine();
						
						user=Authentication.authenticationCheck(nameGiven, passwordGiven);
						
						if(user instanceof LandLord) {
							System.out.println(GREEN_BOLD+"\nWelcome Landlord\n"+RESET);
						}
						else if(user instanceof Tenant) {
							System.out.println(GREEN_BOLD+"\nWelcome Tenant\n"+RESET);
						}
						else {
							System.out.println(CYAN_BOLD+"\nPlease try signing up\n"+RESET);
						}
						
						break;
						
						
					case 2:
					
					inputGetter.nextLine();
					
					System.out.println("\nEnter your name");
					String nameNow = inputGetter.nextLine();
					
					System.out.println("\nEnter your password");
					String passwordNow = inputGetter.nextLine();
					
					System.out.println("\nEnter your contact Number");
					String contactNumber = inputGetter.nextLine();
					
					System.out.println("\nEnter your age");
					byte ageGiven = inputGetter.nextByte();
					
					System.out.println("\nDo you want to be a \n(1) - LandLord\n(2) - Tenant");
					byte userChoice = inputGetter.nextByte();
					
					
					switch(userChoice) {
					
					case 1:
						
						user = new LandLord(nameNow, contactNumber, passwordNow, ageGiven);
						LandLord userNow = (LandLord)user;
						
						FileManagement.addUserDetailsToFile(userNow);
						
						break;
						
						
					case 2:
						
						user = new Tenant(nameNow, contactNumber, passwordNow, ageGiven);
						Tenant userNow2 = (Tenant)user;
						
						FileManagement.addUserDetailsToFile(userNow2);
						
						break;
						
					default :
						System.out.println("Please give the number 1 or 2");
						
					}
					
						break;
					
					case 3 :
						choice = false;	
						System.out.println(CYAN_BOLD+"Please come and visit again"+RESET);
						break;
						
					default :
						System.out.println("Please enter a valid input");
						
				}
				
			
			if(user instanceof LandLord) {
				
				LandLord landLord = (LandLord)user;
				
				landLord.addProperties();
			
				while(user != null) {
					
					System.out.println("What would you like to do\n\n(1) - Add Property\n(2) - Remove Property\n(3) - Update Property\n(4) - View Property\n(5) - LandLord Details\n(6) - Log Out");
					byte landLordChoice = inputGetter.nextByte();
				
					switch(landLordChoice) {
				
					case 1:
						System.out.println("How many properties you want to add to");
						byte numberOfProperty = inputGetter.nextByte();
					
						for(byte i=0; i<numberOfProperty; i++) {
							inputGetter.nextLine();
						
							System.out.println("Enter the property "+(i+1) +" location");
							String loation = inputGetter.nextLine();
						
							System.out.println("Enter the rent per month");
							double rent = inputGetter.nextDouble();
						
							System.out.println("Please enter the square feet of the house");
							float size = inputGetter.nextFloat();
						
							Property propertyOfOwner = new Property(loation, rent, size,landLord.idOfUser, true );
							LandLord.addProperty(propertyOfOwner);
							
							FileManagement.addProperties(FileManagement.getUserIdFromExsisting(landLord.name), propertyOfOwner);
							
							System.out.println("══════════════════ ══════════════════ ══════════════════ ══════════════════ ══════════════════ ══════════════════ ══════");
						
						}
						System.out.println("Property sucessfully added");
						break;
					
					
					case 2:
						System.out.println("Tell the id of the property you want to remove");
						System.out.println(landLord.viewPropertyDetails());
					
						int removingChoice= inputGetter.nextInt();
						boolean removedPrperty= landLord.removeProperty(removingChoice);
						
						if(removedPrperty) {
							System.out.println(GREEN_BOLD+"Property sucessfully removed"+RESET);
						}
						else {
							System.out.println(CYAN_BOLD+"Sorry, You gave wrong property Id"+RESET);
						}
						break;
					
					case 3:
						System.out.println("Tell the id of the property you want to update"+"\n"+landLord.viewPropertyDetails());

						int idOfProperty= inputGetter.nextInt();
				
						Property property = LandLord.getProperty(idOfProperty);
					
						if(property != null) {
						
							System.out.println("Which detail do you like to update\n(1) - Location\n(2) - Rent\n(3) - Property size");
							byte changingDetail = inputGetter.nextByte();
					
							inputGetter.nextLine();
							
							switch(changingDetail) {
//							inputGetter.nextLine();
					
							case 1:
								System.out.println("Enter the new location");
								String newLocation = inputGetter.nextLine();
								property.setLocation(newLocation);
								break;
					
							case 2:
								System.out.println("Enter the new Rent");
								double newRent = inputGetter.nextDouble();
								property.setRentAmount(newRent);
								break;
							
							case 3:
								System.out.println("Enter the new Size");
								float newSize = inputGetter.nextFloat();
								property.setSize(newSize);
								break;
							
							default:
								System.out.println("Please choose from 1 to 3");
							
							}
						}
						else	{
							System.out.println("Sorry the property doesn't exsist");
						}
						break;
					
					
					case 4:
						System.out.println(landLord.viewPropertyDetails());
						break;
						
					case 5:
						System.out.println(landLord.displayLandLordDetails());
						break;
					
						
					case 6:
						user = null;
						break;
			
					default :
						System.out.println("Please enter from 1 to 6");
					
					}
				}
				
			}
			
			else if(user instanceof Tenant) {
				
				Tenant tenant = (Tenant) user; 
				boolean propertyAdded = tenant.addAllProperty(); 
		
				while(user != null) {
					
				System.out.println("\nDo you want to \n\n(1) - Search Properties\n(2) - View All Properties Details\n(3) - Tenant Details\n(4) - Rent An House \n(5) - View rented House Details\n(6) - Log Out\n");
				byte tenantChoice = inputGetter.nextByte();
				
				switch(tenantChoice) {
				
				case 1 :
					System.out.println("Tell me do you want to search by\n(1) - Rent Amount\n(2) - House Size\n(3) - Location\n(4) - Search by giving all info\n");
					byte searchingInput = inputGetter.nextByte();
					
					switch(searchingInput) {
					
					case 1:
						System.out.println("please give an maximum amount");
						double rentAmountMinimum = inputGetter.nextDouble();
						System.out.println(tenant.searchProperties(rentAmountMinimum));
						break;
					
					case 2 :
						System.out.println("Enter the maxium size");
						float size =inputGetter.nextFloat();
						System.out.println(tenant.searchProperties(size));
						break;
						
					case 3:
						System.out.println("Enter the Desired Location");
						inputGetter.nextLine();
						String location =inputGetter.nextLine();
						System.out.println(tenant.searchProperties(location));
						break;
					
					case 4:
						System.out.println("please give an maximum amount");
						double rentAmountWanted = inputGetter.nextDouble();
						
						System.out.println("Enter the house maxium size");
						float sizeWanted =inputGetter.nextFloat();
						inputGetter.nextLine();
						
						System.out.println("Enter the Desired Location");
						String locationDesired =inputGetter.nextLine();
						
						System.out.println(tenant.searchProperties(rentAmountWanted, sizeWanted, locationDesired));
						break;
						
						
					default :
						System.out.println("Please give from 1 to 4");
					}
					
					break;
					
					
				case 2 :
					System.out.println("Property Details : \n"+tenant.viewAllPropertyDetails());
					break;
					
				case 3 :
					
					System.out.println(tenant.viewTentantDetails());	
					break;
					
					
				case 4:
					
					System.out.println("Property Details : \n"+tenant.viewAllPropertyDetails());
					
					System.out.println("Tell the id of the property you want to borrow");
					
					int propertyId = inputGetter.nextInt();
				
					int ownerId = tenant.getOwnerIdFromProperty(propertyId);
					
					if(ownerId != 0 ) {
						
						RentalAgreenment agreement1 = new RentalAgreenment(ownerId, tenant.idOfUser, propertyId);
						boolean houseRentingSuccess =agreement1.rentHouse();
						
						if(houseRentingSuccess) {
							System.out.println(GREEN_BOLD+"House rented successfully\n"+RESET);
							agreement1.rentedHouseDetails();
						}
						else {
							System.out.println(CYAN_BOLD+"House not rented\n"+RESET);
						}
					
					}
					else {
						System.out.println(CYAN_BOLD+"Sorry You gave the wrong Property\n"+RESET);
					}
					
					break;
					
				case 5 :
					System.out.println("\nRented House Details :\n");
					System.out.println(tenant.viewRentedPropertyDetails());
					
					break;
					
				case 6 :
					user = null;
					break;
					
				default :
					System.out.println("Please give a valid number");
					
				}
				
				}
				
			}

		}
		inputGetter.close();
		
	}
}
	
