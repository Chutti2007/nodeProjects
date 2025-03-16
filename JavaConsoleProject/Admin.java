package JavaConsoleProject;
import java.util.ArrayList;

public class Admin extends User{
//	static int i=0;
	
	static ArrayList <User> allUsers = new ArrayList<User>();
	
	Admin(String name, String password, String phoneNumber,byte age ){
		super(name, password, phoneNumber,age);
	}
	
	static void addUsers(User obj) {
		allUsers.add(obj);
//		i++;
	}
	
	static void getUserdetails() {
		for(int i=0; i<allUsers.size(); i++) {
			System.out.println(allUsers.get(i).getUserDetails());
		}
	}
}
