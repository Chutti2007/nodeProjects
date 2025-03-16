package JavaConsoleProject;

import java.io.BufferedReader;
import java.io.FileReader;

class User {
	String name;
	byte age;
	String password;
	String phoneNumber;
//	String role;
	int idOfUser;
	
	User(String name, String password,String phoneNumber,byte age){
		this.name = name;
		this.phoneNumber = phoneNumber;
		this.password=password;
		this.age = age;
		this.idOfUser= getIDOfUser()+1;
		System.out.println(idOfUser);
		
	}
	
	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public int getIdOfUser() {
		System.out.println(idOfUser);
		return idOfUser;
	}

	public void setIdOfUser(int idOfUser) {
		this.idOfUser = idOfUser;
	}

	void setName(String changeName) {
		name = changeName;
	}
	void setAge(byte changeAge) {
		age = changeAge;
	}
	
	
	String getName( ) {
		return name;
	}
	byte getAge() {
		return age;
	}
	
	public String getUserDetails() {
		
		return ("\n─── ⋆⋅☆⋅⋆ ─── ─── ⋆⋅☆⋅⋆ ─── ─── ⋆⋅☆⋅⋆ ─── ─── ⋆⋅☆⋅⋆ ─── ─── ⋆⋅☆⋅⋆ ─── ─── ⋆⋅☆⋅⋆ ─── ─── ⋆⋅☆⋅⋆ ─── \nName : "+name+"\nAge : "+age+"\nUser Id : "+idOfUser);
		
	}

	
	 int getIDOfUser() {
		int id=0;
		String line;
		
		try(BufferedReader reader1 = new BufferedReader(new FileReader(FileManagement.file))){
			while((line =reader1.readLine()) !=null) {
			
				String[] userDetails = line.split(",");
				
				id = Integer.parseInt(userDetails[0]);
				
				if((userDetails[1]).equals(name)) {
					id--;
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
