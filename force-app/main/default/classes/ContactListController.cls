public with sharing class ContactListController {
    
    @AuraEnabled
    public static List<Contact> getContactList(){
        return [select Id,FirstName,LastName,Email,Phone from Contact where Email!=null];
    }
}
